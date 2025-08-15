---
title: 'Generate Highlight.js from TextMate Grammar'
project_name: highlightjs-pkl
epic_name: pkl_highlightjs_implementation
task_id: 00_pkl_highlightjs_implementation/00_generate_highlightjs_from_textmate_grammar
labels: backend, scripting, code-generation
status: todo
date_created: 2025-08-15T00:00:00-07:00
date_verified_completed:
touched: *
---

## Task

Implement a Python script that reads the Pkl TextMate syntax file (`pkl.tmbundle/Syntaxes/pkl.tmLanguage`), parses its XML (Property List) grammar rules using `plistlib`, and translates them into a Highlight.js language definition. The generated definition should be written to `src/pkl.js`.

## Acceptance Criteria

- [ ] A Python script named `scripts/generate_pkl_highlightjs.py` is created.
- [ ] The script successfully reads and parses the TextMate grammar XML (Property List) file using `plistlib`.
- [ ] The script correctly translates TextMate grammar patterns (e.g., keywords, types, comments, strings) into Highlight.js compatible regular expressions and modes.
- [ ] The script generates `src/pkl.js` with the complete Highlight.js language definition for Pkl.
- [ ] The generated `src/pkl.js` file is a valid Highlight.js language module.
- [ ] The script handles basic errors during file reading or grammar translation.

## Context/Links

- Related user story: `work_items/pkl_highlightjs_implementation/00_enable_pkl_code_highlighting/00_user-story.md`
- Related design spec: `work_items/pkl_highlightjs_implementation/00_enable_pkl_code_highlighting/01_design-spec.md`
- Pkl TextMate syntax repository: `pkl.tmbundle/Syntaxes/pkl.tmLanguage`