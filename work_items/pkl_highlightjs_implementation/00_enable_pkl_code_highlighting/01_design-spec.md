
---

title: 'Design for Pkl Language Element Extraction Script'
project_name: highlightjs-pkl
epic_name: pkl_highlightjs_implementation
story_id: 00_pkl_highlightjs_implementation/00_enable_pkl_code_highlighting
spec_id: 00_pkl_highlightjs_implementation/00_enable_pkl_code_highlighting/01_design-spec
status: draft
date_created: 2025-08-15T00:00:00-07:00
date_approved:
touched: *
---

## 1. Objective

To design a script that extracts Pkl language keywords and built-in types from provided documentation sources to create a structured CSV file for Highlight.js implementation.

## 2. Technical Design

The script will be a Python script that reads the content of the Pkl LLM guidelines file (`.gemini/guidelines/pkl/llms.txt`) and the Pkl language reference (<https://pkl-lang.org/main/current/language-reference/index.html>). It will then parse these documents to identify keywords and built-in types. The extracted data will be written to a CSV file named `pkl_language_elements.csv`.

The script will use regular expressions to identify patterns indicative of keywords and types. Given the nature of the provided LLM guidelines (which contain code snippets and descriptions), a multi-step approach will be used:

1. **Initial Scan**: Scan the `pkl/llms.txt` file for `LANGUAGE: pkl` code blocks and extract potential keywords and types from these blocks.
2. **Web Scraping (if necessary)**: If the initial scan doesn't yield a comprehensive list, the script will attempt to fetch and parse the Pkl language reference guide (<https://pkl-lang.org/main/current/language-reference/index.html>) to extract more keywords and types. This will involve using `web_fetch` and then parsing the HTML content.
3. **Deduplication and Formatting**: All extracted elements will be deduplicated and formatted into a CSV with `element_type` and `element_name` columns.

## 3. Key Changes

### 3.1. API Contracts

- No new APIs. The script will use `read_file` and potentially `web_fetch`.

### 3.2. Data Models

- Output: `pkl_language_elements.csv` with columns: `element_type`, `element_name`.

### 3.3. Component Responsibilities

- **Extraction Script**: Responsible for reading input, parsing content, extracting data, and writing the CSV file.

## 4. Alternatives Considered

- **Manual Extraction**: Manually going through the documentation to extract keywords. This is time-consuming and error-prone, especially for a comprehensive list. Automated extraction is preferred for efficiency and accuracy.
- **Directly Modifying `src/pkl.js`**: Instead of an intermediate CSV, directly populate the `src/pkl.js` file. This would make the extraction process less modular and harder to verify. The CSV provides a clear, verifiable intermediate step.

## 5. Out of Scope

- Implementing the full Highlight.js grammar for Pkl. This design spec focuses solely on the extraction of keywords and types.
- Handling all possible Pkl syntax elements (e.g., operators, comments, strings, numbers). This is part of the broader Highlight.js implementation, not this extraction step.
- Error handling for malformed documentation or network issues during web scraping (basic error handling will be included, but robust, production-grade error handling is out of scope for this initial script).
