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
const fs = __importStar(require("fs"));
const vscode_textmate_1 = require("vscode-textmate");
// Helper to convert TextMate regex to Highlight.js compatible regex
function convertRegex(tmRegex) {
    let cleanedRegex = tmRegex;
    // Handle (?x:) extended mode
    if (cleanedRegex.startsWith('(?x:')) {
        // Extract content inside (?x:...)
        const innerContent = cleanedRegex.substring(4, cleanedRegex.length - 1);
        // Remove comments and collapse multiple whitespace into single space
        cleanedRegex = innerContent.replace(/#.*$/gm, '').replace(/\s+/g, ' ').trim();
    }
    // Replace TextMate specific escapes for # (e.g., \# -> #)
    cleanedRegex = cleanedRegex.replace(/\\#/g, '#');
    // Replace TextMate specific escapes for < and > (e.g., &lt; -> <)
    cleanedRegex = cleanedRegex.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    // Handle TextMate's \A and \Z for start/end of string (Highlight.js uses ^ and $)
    cleanedRegex = cleanedRegex.replace(/\\A/g, '^').replace(/\\Z/g, '$');
    // Handle TextMate's \G for start of match (Highlight.js doesn't have a direct equivalent, remove for now)
    cleanedRegex = cleanedRegex.replace(/\\G/g, '');
    // Handle TextMate's interpolation `\(...\)` (e.g., `\(foo\)` -> `(foo)`) - this is usually for back-references or sub-patterns
    // The `replace` method with a string replacement treats `$` as special. Use a function to avoid this.
    cleanedRegex = cleanedRegex.replace(/\\\((.*?)\\\\/g, (match, p1) => `(${p1})`);
    return cleanedRegex;
}
function convertTextMateToHighlightJs(textMateGrammar) {
    const hljsGrammar = {
        name: textMateGrammar.name || 'Unknown',
        aliases: textMateGrammar.fileTypes || [],
        keywords: {},
        contains: [],
    };
    const processRule = (rule) => {
        if (!rule)
            return null;
        const hljsMode = {};
        if (rule.name && typeof rule.name === 'string') {
            switch (true) {
                case rule.name.includes('comment.line'):
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
                    hljsMode.className = 'built_in';
                    break;
                case rule.name.includes('variable.language'):
                    hljsMode.className = 'variable';
                    break;
                case rule.name.includes('entity.name.type'):
                    hljsMode.className = 'type';
                    break;
                case rule.name.includes('entity.name.function'):
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
            hljsMode.begin = convertRegex(rule.match);
        }
        if (rule.begin) {
            hljsMode.begin = convertRegex(rule.begin);
        }
        if (rule.end) {
            hljsMode.end = convertRegex(rule.end);
        }
        if (rule.captures) {
            // Placeholder for captures conversion
        }
        if (rule.patterns) {
            hljsMode.contains = rule.patterns.map((p) => processRule(p)).filter((p) => p !== null);
        }
        if (rule.include) {
            if (rule.include === '$self') {
                return 'self';
            }
            else if (rule.include.startsWith('#')) {
                return rule.include;
            }
        }
        if (rule.disabled)
            hljsMode.skip = true;
        if (rule.name && typeof rule.name === 'string') {
            if (rule.name.includes('keyword') && rule.match) {
                const found = rule.match.match(/\\b[a-zA-Z_]+\\b/g);
                if (found) {
                    if (!hljsGrammar.keywords)
                        hljsGrammar.keywords = {};
                    hljsGrammar.keywords.keyword = Array.from(new Set([...(hljsGrammar.keywords.keyword || '').split(' '), ...found])).sort().join(' ');
                }
            }
            if (rule.name.includes('storage.type') && rule.match) {
                const found = rule.match.match(/\\b[a-zA-Z_]+\\b/g);
                if (found) {
                    if (!hljsGrammar.keywords)
                        hljsGrammar.keywords = {};
                    hljsGrammar.keywords.type = Array.from(new Set([...(hljsGrammar.keywords.type || '').split(' '), ...found])).sort().join(' ');
                }
            }
        }
        if (!hljsMode.begin && !hljsMode.end && !hljsMode.match && !hljsMode.contains) {
            return null;
        }
        return hljsMode;
    };
    hljsGrammar.contains = textMateGrammar.patterns.map((p) => processRule(p)).filter((p) => p !== null);
    if (textMateGrammar.repository) {
        for (const key in textMateGrammar.repository) {
            if (textMateGrammar.repository.hasOwnProperty(key)) {
                const repoRule = textMateGrammar.repository[key];
                const convertedRepoRule = processRule(repoRule);
                if (convertedRepoRule) {
                    // This part needs a proper resolver for TextMate includes.
                }
            }
        }
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
main();
