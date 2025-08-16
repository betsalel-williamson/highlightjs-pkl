---
title: 'Refine Pkl Grammar Generation Script'
project_name: highlightjs-pkl
epic_name: pkl_highlightjs_implementation
task_id: 13
labels: highlightjs, pkl, grammar-refinement, script-enhancement
status: superseded
date_created: 2025-08-15T00:00:00-07:00
date_verified_completed: 
touched: 
---

## Task

Enhance the `scripts/generate_pkl_highlightjs.py` script to more accurately convert the TextMate grammar for Pkl into a Highlight.js language definition. This involves improving regex extraction, handling nested patterns, and translating TextMate constructs into idiomatic Highlight.js modes.

## Acceptance Criteria

- [ ] The `scripts/generate_pkl_highlightjs.py` script correctly handles common Pkl syntax elements (e.g., keywords, operators, strings, numbers, comments, object literals, module imports).
- [ ] The generated `src/languages/pkl.js` file produces accurate syntax highlighting for various Pkl code examples, including those found in `.gemini/guidelines/pkl/llms.txt`.
- [ ] The script effectively translates TextMate `begin`/`end` rules and `captures` into Highlight.js equivalents.
- [ ] The script avoids `SyntaxWarning` messages during execution.

## Context/Links

- Related script: scripts/generate_pkl_highlightjs.py
- Pkl code examples: .gemini/guidelines/pkl/llms.txt
- Highlight.js Language Definition Guide: .gemini/guidelines/highlightjs/language-guide.rst.txt
- TextMate Grammar: pkl.tmbundle/Syntaxes/pkl.tmLanguage
- Superseded by: ./14_develop-typescript-grammar-conversion-tool.md
