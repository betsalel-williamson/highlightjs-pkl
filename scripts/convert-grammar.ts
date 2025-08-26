import * as fs from 'fs';
import * as path from 'path';
import { Language, Mode } from 'highlight.js';
import { parseRawGrammar, IRawGrammar } from 'vscode-textmate';
import { convertRegex } from './convert-regex'; // Import convertRegex

// Extend the Highlight.js Mode interface to include TextMate-specific capture properties
interface HighlightJsModeExtended extends Mode {
  captures?: { [key: string]: { className: string } };
  beginCaptures?: { [key: string]: { className: string } };
  endCaptures?: { [key: string]: { className: string } };
}

export function convertTextMateToHighlightJs(textMateGrammar: IRawGrammar): Language {
  let languageName = 'Unknown';
  if (textMateGrammar.scopeName) {
    const parts = textMateGrammar.scopeName.split('.');
    languageName = parts[parts.length - 1];
  } else if (textMateGrammar.name) {
    languageName = textMateGrammar.name;
  }

  const hljsGrammar: Language = {
    name: languageName,
    aliases: textMateGrammar.fileTypes || [],
    contains: [],
  };

  const allKeywords: Set<string> = new Set();
  const allTypes: Set<string> = new Set();

  const extractKeywordsAndTypes = (matchString: string, name: string) => {
    // Apply convertRegex to normalize the matchString before extracting keywords
    const normalizedMatchString = convertRegex(matchString);
    // console.log(`Extracting from normalized: ${normalizedMatchString}, name: ${name}`);

    if (name.includes('keyword')) {
      const found = normalizedMatchString.match(/\b[a-zA-Z_]+\b/g);
      // console.log(`Found keywords: ${found}`);
      if (found) found.forEach(k => allKeywords.add(k));
    }
    if (name.includes('storage.type')) {
      const found = normalizedMatchString.match(/\b[a-zA-Z_]+\b/g);
      // console.log(`Found types: ${found}`);
      if (found) found.forEach(t => allTypes.add(t));
    }
  };

  const processRule = (rule: any): HighlightJsModeExtended | 'self' | null => {
    if (!rule) return null;

    const hljsMode: HighlightJsModeExtended = {};

    if (rule.name && typeof rule.name === 'string') {
      switch (true) {
        case rule.name.includes('comment.line'):
          hljsMode.className = 'comment';
          // For line comments, TextMate uses 'match', Highlight.js uses 'begin' and 'end: '$'
          if (rule.match) {
            hljsMode.begin = convertRegex(rule.match);
          }
          hljsMode.end = '$';
          break;
        case rule.name.includes('comment.block'):
          hljsMode.className = 'comment';
          break;
        case rule.name.includes('string.quoted'):
          hljsMode.className = 'string';
          break;
        case rule.name.includes('keyword'):
          hljsMode.className = 'keyword';
          break;
        case rule.name.includes('storage.type'):
          hljsMode.className = 'type';
          break;
        case rule.name.includes('constant.numeric'):
          hljsMode.className = 'number';
          break;
        case rule.name.includes('constant.character.escape'):
          hljsMode.className = 'constant';
          break;
        case rule.name.includes('variable.language'):
        case rule.name.includes('variable.parameter'): // Added this case
          hljsMode.className = 'variable';
          break;
        case rule.name.includes('entity.name.type'):
          hljsMode.className = 'type';
          break;
        case rule.name.includes('entity.name.function'):
        case rule.name.includes('function.call'):
          hljsMode.className = 'function';
          break;
        case rule.name.includes('support.function'):
          hljsMode.className = 'built_in';
          break;
        case rule.name.includes('punctuation'):
          hljsMode.className = 'punctuation';
          break;
        case rule.name.includes('invalid'):
          hljsMode.className = 'meta';
          break;
        default:
          // No specific mapping, might be a generic container or unhandled scope
          break;
      }
    }

    if (rule.match) {
      // Only assign to hljsMode.match if it's not a line comment (which uses begin/end)
      if (!hljsMode.begin) { // Check if begin is already set by a line comment rule
        hljsMode.match = convertRegex(rule.match); // Use match for simple patterns
      }
      extractKeywordsAndTypes(rule.match, rule.name || '');
    }

    if (rule.begin) {
      hljsMode.begin = convertRegex(rule.begin);
    }
    if (rule.end) {
      hljsMode.end = convertRegex(rule.end);
    }

    // Handle captures
    if (rule.captures) {
      hljsMode.captures = {};
      for (const key in rule.captures) {
        if (rule.captures.hasOwnProperty(key)) {
          const capture = rule.captures[key];
          hljsMode.captures[key] = { className: capture.name.split('.')[0] }; // Take first part of scope name
        }
      }
    }

    // Handle beginCaptures
    if (rule.beginCaptures) {
      hljsMode.beginCaptures = {};
      for (const key in rule.beginCaptures) {
        if (rule.beginCaptures.hasOwnProperty(key)) {
          const capture = rule.beginCaptures[key];
          hljsMode.beginCaptures[key] = { className: capture.name.split('.')[0] };
        }
      }
    }

    // Handle endCaptures
    if (rule.endCaptures) {
      hljsMode.endCaptures = {};
      for (const key in rule.endCaptures) {
        if (rule.endCaptures.hasOwnProperty(key)) {
          const capture = rule.endCaptures[key];
          hljsMode.endCaptures[key] = { className: capture.name.split('.')[0] };
        }
      }
    }

    if (rule.patterns) {
      (hljsMode.contains as (Mode | string)[]) = rule.patterns.map((p: any) => processRule(p)).filter((p: any) => p !== null) as (Mode | string)[];
    }

    if (rule.include) {
      if (rule.include === '$self') {
        return 'self';
      } else if (rule.include.startsWith('#')) {
        const repoRuleName = rule.include.substring(1);
        const repoRule = textMateGrammar.repository?.[repoRuleName];
        if (repoRule) {
          return processRule(repoRule);
        } else {
          console.warn(`Repository rule ${repoRuleName} not found.`);
          return null;
        }
      }
    }

    if (rule.disabled) hljsMode.skip = true;

    if (!hljsMode.begin && !hljsMode.end && !hljsMode.match && !hljsMode.contains) {
      return null; 
    }

    return hljsMode;
  };

  // Process top-level patterns
  (hljsGrammar.contains as (Mode | string)[]) = textMateGrammar.patterns.map((p: any) => processRule(p)).filter((p: any) => p !== null) as (Mode | string)[];

  // Process repository patterns and collect keywords/types from them
  if (textMateGrammar.repository) {
    for (const key in textMateGrammar.repository) {
      if (textMateGrammar.repository.hasOwnProperty(key)) {
        const repoRule = textMateGrammar.repository[key];
        // Recursively process repository rules to extract keywords/types
        // We need to process all rules in the repository to extract keywords/types
        // even if they are not directly included in `contains`.
        if (repoRule.match) {
          extractKeywordsAndTypes(repoRule.match, repoRule.name || '');
        }
        if (repoRule.patterns) {
          repoRule.patterns.forEach((p: any) => {
            if (p.match) {
              extractKeywordsAndTypes(p.match, p.name || '');
            }
          });
        }
      }
    }
  }

  // Populate keywords after all patterns have been processed
  if (allKeywords.size > 0 || allTypes.size > 0) {
    hljsGrammar.keywords = {}; // Initialize if not already present
    if (allKeywords.size > 0) {
      (hljsGrammar.keywords as any).keyword = Array.from(allKeywords).sort().join(' ');
    }
    if (allTypes.size > 0) {
      (hljsGrammar.keywords as any).type = Array.from(allTypes).sort().join(' ');
    }
  } else {
    delete hljsGrammar.keywords; // Remove keywords property if empty
  }

  return hljsGrammar;
}

async function main() {
  const textmateGrammarPath = process.argv[2];
  const outputFilePath = process.argv[3];

  if (!textmateGrammarPath || !outputFilePath) {
    console.error('Usage: ts-node convert-grammar.ts <textmate_grammar_path> <output_file_path>');
    process.exit(1);
  }

  try {
    const grammarContent = fs.readFileSync(textmateGrammarPath, 'utf8');
    const textMateGrammar = parseRawGrammar(grammarContent);

    const hljsGrammar = convertTextMateToHighlightJs(textMateGrammar);

    const outputJsContent = `module.exports = function(hljs) { return ${JSON.stringify(hljsGrammar, null, 2)}; };`;

    fs.writeFileSync(outputFilePath, outputJsContent);
    console.log(`Successfully generated Highlight.js definition to ${outputFilePath}`);
  } catch (error) {
    console.error(`Error generating Highlight.js definition: ${error}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}