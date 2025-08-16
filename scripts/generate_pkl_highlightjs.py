import plistlib
import json
import re
import argparse
import xml.etree.ElementTree as ET

def clean_regex(regex_str):
    # Remove (?x:) and comments from regex
    cleaned = re.sub(r'\(\?x:\s*|\s*#.*|\)', '', regex_str)
    # Replace &lt; and &gt; with < and >
    cleaned = cleaned.replace('&lt;', '<').replace('&gt;', '>')
    # Handle TextMate's `\` escaping for regex characters within the string
    cleaned = cleaned.replace('\\', '\\')
    # Convert TextMate interpolation `\(...\)` to Highlight.js `\((...)\)`
    cleaned = re.sub(r'\\\((.*?)\\\\)', r'\\(\\1\\)', cleaned)
    return cleaned

def convert_textmate_to_highlightjs(textmate_grammar_path):
    with open(textmate_grammar_path, 'rb') as fp:
        plist_data = plistlib.load(fp)

    extracted_elements = {
        "keywords": [],
        "types": [],
        "comments": [],
        "strings": []
    }

    def search_patterns(patterns):
        if isinstance(patterns, list):
            for pattern in patterns:
                search_patterns(pattern)
        elif isinstance(patterns, dict):
            name = patterns.get('name', '')
            match = patterns.get('match', '')
            begin = patterns.get('begin', '')
            end = patterns.get('end', '')

            if 'keyword' in name and match:
                found_keywords = re.findall(r'\b[a-zA-Z_]+\b', match)
                extracted_elements["keywords"].extend(found_keywords)
            elif 'storage.type' in name and match:
                found_types = re.findall(r'\b[a-zA-Z_]+\b', match)
                extracted_elements["types"].extend(found_types)
            elif 'comment.line' in name and match:
                extracted_elements["comments"].append({'type': 'line', 'begin': match})
            elif 'comment.block' in name and begin and end:
                extracted_elements["comments"].append({'type': 'block', 'begin': begin, 'end': end})
            elif 'string.quoted' in name and begin and end:
                string_mode = {
                    'className': 'string',
                    'begin': begin,
                    'end': end,
                    'illegal': '\n' if 'illegal.newline' in patterns.get('endCaptures', {}).get('2', '') else None,
                    'contains': []
                }
                if 'patterns' in patterns:
                    for sub_pattern in patterns['patterns']:
                        if 'constant.character.escape' in sub_pattern.get('name', '') and 'match' in sub_pattern:
                            string_mode['contains'].append({
                                'begin': clean_regex(sub_pattern['match']),
                                'end': '',
                                'skip': True
                            })
                extracted_elements["strings"].append(string_mode)

            if 'patterns' in patterns:
                search_patterns(patterns['patterns'])
            if 'repository' in patterns:
                for key, value in patterns['repository'].items():
                    search_patterns(value)

    search_patterns(plist_data)

    extracted_elements["keywords"] = sorted(list(set(extracted_elements["keywords"])))
    extracted_elements["types"] = sorted(list(set(extracted_elements["types"])))

    contains_modes = []

    for comment in extracted_elements["comments"]:
        if comment['type'] == 'line':
            contains_modes.append({
                "className": "comment",
                "begin": clean_regex(comment['begin']),
                "end": "$",
                "relevance": 0
            })
        elif comment['type'] == 'block':
            contains_modes.append({
                "className": "comment",
                "begin": clean_regex(comment['begin']),
                "end": clean_regex(comment['end']),
                "contains": ["self"]
            })

    for string_mode in extracted_elements["strings"]:
        contains_modes.append({
            "className": string_mode['className'],
            "begin": clean_regex(string_mode['begin']),
            "end": clean_regex(string_mode['end']),
            "illegal": string_mode['illegal'],
            "contains": string_mode['contains']
        })

    highlightjs_grammar = {
        "name": "Pkl",
        "aliases": ["pkl"],
        "keywords": {
            "keyword": " ".join(extracted_elements["keywords"]),
            "type": " ".join(extracted_elements["types"])
        },
        "contains": contains_modes
    }

    return f"module.exports = function(hljs) {{ return {json.dumps(highlightjs_grammar, indent=2)}; }}"

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Generate Highlight.js definition from TextMate grammar.')
    parser.add_argument('--textmate_file', required=True, help='Path to the TextMate grammar file (e.g., pkl.tmLanguage).')
    parser.add_argument('--output_file', required=True, help='Path to the output Highlight.js file (e.g., pkl.js).')
    args = parser.parse_args()

    try:
        highlightjs_code = convert_textmate_to_highlightjs(args.textmate_file)
        with open(args.output_file, "w") as f:
            f.write(highlightjs_code)
        print(f"Successfully generated Highlight.js definition to {args.output_file}")
    except Exception as e:
        print(f"Error generating Highlight.js definition: {e}")