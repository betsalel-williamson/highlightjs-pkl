---
title: 'Create Pkl Language Grammar Definition File'
project_name: highlightjs-pkl
epic_name: pkl_highlightjs_implementation
task_id: 01
labels: highlightjs, pkl, language-contribution
status: backlog
date_created: 2025-08-15T00:00:00-07:00
date_verified_completed: 
touched: 
---

## Task

Create a JavaScript file (e.g., `pkl.js`) that defines a function accepting a `hljs` reference and returning a language object for Pkl. This file should be placed in a new grammar repository under `my_new_grammar/src/languages/`.

## Acceptance Criteria

- [ ] A new file `my_new_grammar/src/languages/pkl.js` (or similar path) is created.
- [ ] The file contains an `export default function(hljs) { ... }` structure.
- [ ] The returned object includes `name: "Pkl"` and basic `keywords` and `contains` properties.

## Context/Links

- Related guideline: .gemini/guidelines/highlightjs/language-contribution.rst.txt
