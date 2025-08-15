import plistlib
import json
import re

def convert_textmate_to_highlightjs(textmate_grammar_path):
    with open(textmate_grammar_path, 'rb') as fp:
        plist_data = plistlib.load(fp)

    # Extract keywords and types (simplified for initial implementation)
    keywords = []
    types = []

    # TextMate grammars often define patterns for keywords and types
    # We'll look for common patterns, but this might need refinement
    # based on the actual content of pkl.tmLanguage

    # A common structure for keywords is a 'keywords' key within a 'repository' or top-level
    # and then a 'match' pattern with a 'name' that includes 'keyword' or 'storage.type'

    # This is a very basic attempt to extract. A full implementation would need
    # to recursively traverse the grammar and handle various TextMate constructs.

    # Placeholder for extracted elements
    extracted_elements = {
        "keywords": [],
        "types": []
    }

    # Function to recursively search for patterns
    def search_patterns(patterns):
        if isinstance(patterns, list):
            for pattern in patterns:
                search_patterns(pattern)
        elif isinstance(patterns, dict):
            if 'name' in patterns:
                if 'keyword' in patterns['name'] and 'match' in patterns:
                    # Attempt to extract keywords from the match pattern
                    # This is a very naive approach and might need complex regex parsing
                    match_str = patterns['match']
                    # Simple regex to find words that look like keywords
                    found_keywords = re.findall(r'\b[a-zA-Z_]+\b', match_str)
                    extracted_elements["keywords"].extend(found_keywords)
                elif 'storage.type' in patterns['name'] and 'match' in patterns:
                    match_str = patterns['match']
                    found_types = re.findall(r'\b[a-zA-Z_]+\b', match_str)
                    extracted_elements["types"].extend(found_types)
            if 'patterns' in patterns:
                search_patterns(patterns['patterns'])
            if 'repository' in patterns:
                for key, value in patterns['repository'].items():
                    search_patterns(value)

    search_patterns(plist_data)

    # Deduplicate and sort
    extracted_elements["keywords"] = sorted(list(set(extracted_elements["keywords"])))
    extracted_elements["types"] = sorted(list(set(extracted_elements["types"])))

    # Construct a basic Highlight.js language definition
    # This is a minimal example and will need significant expansion
    # to cover the full TextMate grammar.
    highlightjs_grammar = {
        "name": "Pkl",
        "aliases": ["pkl"],
        "keywords": {
            "keyword": " ".join(extracted_elements["keywords"]),
            "type": " ".join(extracted_elements["types"])
        },
        "contains": [
            # Placeholder for other language constructs (comments, strings, numbers, etc.)
            # This would involve translating TextMate 'begin/end' rules, 'captures', etc.
            # For now, we'll just add basic comments and strings.
            {
                "className": "comment",
                "begin": "//",
                "end": "$",
                "relevance": 0
            },
            {
                "className": "comment",
                "begin": r"/\*",
                "end": r"\*/",
                "contains": ["self"]
            },
            {
                "className": "string",
                "begin": '"',
                "end": '"',
                "illegal": "\n"
            },
            {
                "className": "string",
                "begin": "'",
                "end": "'",
                "illegal": "\n"
            },
            {
                "className": "number",
                "variants": [
                    {"begin": "\\b\\d+(\\.\\d+)?([eE][-+]?\\d+)?\\b"},
                    {"begin": "\\b0x[0-9a-fA-F]+\\b"}
                ]
            }
        ]
    }

    return f"module.exports = function(hljs) {{ return {json.dumps(highlightjs_grammar, indent=2)}; }}"

if __name__ == "__main__":
    textmate_file = "/Users/saul/Repos/highlightjs-pkl/pkl.tmbundle/Syntaxes/pkl.tmLanguage"
    output_file = "/Users/saul/Repos/highlightjs-pkl/src/pkl.js"

    try:
        highlightjs_code = convert_textmate_to_highlightjs(textmate_file)
        with open(output_file, "w") as f:
            f.write(highlightjs_code)
        print(f"Successfully generated Highlight.js definition to {output_file}")
    except Exception as e:
        print(f"Error generating Highlight.js definition: {e}")