---
title: 'Develop TypeScript Grammar Conversion Tool'
project_name: highlightjs-pkl
epic_name: pkl_highlightjs_implementation
task_id: 14
labels: highlightjs, pkl, grammar-conversion, typescript, tool-development
status: in-progress
date_created: 2025-08-15T00:00:00-07:00
date_verified_completed: 
touched: *
---

## Task

Develop a TypeScript-based tool to convert the Pkl TextMate grammar (`pkl.tmbundle/Syntaxes/pkl.tmLanguage`) into a Highlight.js language definition. This tool should leverage existing TypeScript libraries for TextMate grammar parsing (e.g., `vscode-textmate`) to ensure accurate and robust conversion.

## Acceptance Criteria

- [ ] A new TypeScript project is set up for the conversion tool.
- [ ] The tool successfully parses `pkl.tmbundle/Syntaxes/pkl.tmLanguage`.
- [ ] The tool accurately translates TextMate grammar rules (keywords, comments, strings, patterns, captures, etc.) into Highlight.js compatible modes and properties.
- [ ] The tool generates a `src/languages/pkl.js` file that produces correct syntax highlighting for Pkl code examples.
- [ ] The new tool is integrated into the project's build process.

## Context/Links

- TextMate Grammar: pkl.tmbundle/Syntaxes/pkl.tmLanguage
- Highlight.js Language Definition Guide: .gemini/guidelines/highlightjs/language-guide.rst.txt
- `vscode-textmate` GitHub: <https://github.com/microsoft/vscode-textmate>
- Related task (superseded): ./13_refine-pkl-grammar-generation-script.md
- Related task (superseded): ./01_create-pkl-language-grammar-definition-file.md
