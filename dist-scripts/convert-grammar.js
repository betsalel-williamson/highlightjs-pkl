"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTextMateToHighlightJs = convertTextMateToHighlightJs;
const fs = __importStar(require("fs"));
const vscode_textmate_1 = require("vscode-textmate");
const convert_regex_1 = require("./convert-regex"); // Import convertRegex
function convertTextMateToHighlightJs(textMateGrammar) {
    let languageName = 'Unknown';
    if (textMateGrammar.scopeName) {
        const parts = textMateGrammar.scopeName.split('.');
        languageName = parts[parts.length - 1];
    }
    else if (textMateGrammar.name) {
        languageName = textMateGrammar.name;
    }
    const hljsGrammar = {
        name: languageName,
        aliases: textMateGrammar.fileTypes || [],
        contains: [],
    };
    const allKeywords = new Set();
    const allTypes = new Set();
    const extractKeywordsAndTypes = (matchString, name) => {
        // Apply convertRegex to normalize the matchString before extracting keywords
        const normalizedMatchString = (0, convert_regex_1.convertRegex)(matchString);
        // console.log(`Extracting from normalized: ${normalizedMatchString}, name: ${name}`);
        if (name.includes('keyword')) {
            const found = normalizedMatchString.match(/\b[a-zA-Z_]+\b/g);
            // console.log(`Found keywords: ${found}`);
            if (found)
                found.forEach(k => allKeywords.add(k));
        }
        if (name.includes('storage.type')) {
            const found = normalizedMatchString.match(/\b[a-zA-Z_]+\b/g);
            // console.log(`Found types: ${found}`);
            if (found)
                found.forEach(t => allTypes.add(t));
        }
    };
    const processRule = (rule) => {
        var _a;
        if (!rule)
            return null;
        const hljsMode = {};
        if (rule.name && typeof rule.name === 'string') {
            switch (true) {
                case rule.name.includes('comment.line'):
                    hljsMode.className = 'comment';
                    // For line comments, TextMate uses 'match', Highlight.js uses 'begin' and 'end: '$'
                    if (rule.match) {
                        hljsMode.begin = (0, convert_regex_1.convertRegex)(rule.match);
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
                hljsMode.match = (0, convert_regex_1.convertRegex)(rule.match); // Use match for simple patterns
            }
            extractKeywordsAndTypes(rule.match, rule.name || '');
        }
        if (rule.begin) {
            hljsMode.begin = (0, convert_regex_1.convertRegex)(rule.begin);
        }
        if (rule.end) {
            hljsMode.end = (0, convert_regex_1.convertRegex)(rule.end);
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
            hljsMode.contains = rule.patterns.map((p) => processRule(p)).filter((p) => p !== null);
        }
        if (rule.include) {
            if (rule.include === '$self') {
                return 'self';
            }
            else if (rule.include.startsWith('#')) {
                const repoRuleName = rule.include.substring(1);
                const repoRule = (_a = textMateGrammar.repository) === null || _a === void 0 ? void 0 : _a[repoRuleName];
                if (repoRule) {
                    return processRule(repoRule);
                }
                else {
                    console.warn(`Repository rule ${repoRuleName} not found.`);
                    return null;
                }
            }
        }
        if (rule.disabled)
            hljsMode.skip = true;
        if (!hljsMode.begin && !hljsMode.end && !hljsMode.match && !hljsMode.contains) {
            return null;
        }
        return hljsMode;
    };
    // Process top-level patterns
    hljsGrammar.contains = textMateGrammar.patterns.map((p) => processRule(p)).filter((p) => p !== null);
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
                    repoRule.patterns.forEach((p) => {
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
            hljsGrammar.keywords.keyword = Array.from(allKeywords).sort().join(' ');
        }
        if (allTypes.size > 0) {
            hljsGrammar.keywords.type = Array.from(allTypes).sort().join(' ');
        }
    }
    else {
        delete hljsGrammar.keywords; // Remove keywords property if empty
    }
    return hljsGrammar;
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const textmateGrammarPath = process.argv[2];
        const outputFilePath = process.argv[3];
        if (!textmateGrammarPath || !outputFilePath) {
            console.error('Usage: ts-node convert-grammar.ts <textmate_grammar_path> <output_file_path>');
            process.exit(1);
        }
        try {
            const grammarContent = fs.readFileSync(textmateGrammarPath, 'utf8');
            const textMateGrammar = (0, vscode_textmate_1.parseRawGrammar)(grammarContent);
            const hljsGrammar = convertTextMateToHighlightJs(textMateGrammar);
            const outputJsContent = `module.exports = function(hljs) { return ${JSON.stringify(hljsGrammar, null, 2)}; };`;
            fs.writeFileSync(outputFilePath, outputJsContent);
            console.log(`Successfully generated Highlight.js definition to ${outputFilePath}`);
        }
        catch (error) {
            console.error(`Error generating Highlight.js definition: ${error}`);
            process.exit(1);
        }
    });
}
if (require.main === module) {
    main();
}
