---
inclusion: manual
---

# Design for Pkl Highlighting Implementation

This design document details the technical approach for implementing Pkl language highlighting within Highlight.js, specifically focusing on the conversion of TextMate grammar to Highlight.js format and the subsequent verification. This design adheres to the architectural principles outlined in the [Architecture for Pkl Highlighting](../../architecture.md) document.

## Design Document Structure

All design documents must include:

### 1. Objective

The objective of this design is to ensure that the `scripts/convert-grammar.ts` script accurately and reliably transforms the Pkl TextMate grammar (`pkl.tmbundle/Syntaxes/pkl.tmLanguage`) into a Highlight.js compatible language definition, matching the desired visual output demonstrated in `test/visual-test.html` and `src/languages/pkl-gold.js`.

### 2. Technical Design

The core of this design revolves around the `scripts/convert-grammar.ts` script. This script will parse the XML-based TextMate grammar, extract relevant patterns, scope names, and capture groups, and then map them to Highlight.js `Mode` and `Language` objects. The `convertRegex` utility will be used to adapt TextMate regular expressions to Highlight.js's regex engine.

**Key Components:**
-   **`scripts/convert-grammar.ts`**: The TypeScript script responsible for the conversion logic.
-   **`pkl.tmbundle/Syntaxes/pkl.tmLanguage`**: The input TextMate grammar file.
-   **`src/languages/pkl-gold.js`**: The reference Highlight.js output, representing the desired highlighting behavior.
-   **`test/visual-test.html`**: A visual test harness to compare the generated output with the expected highlighting.

**Conversion Logic Details:**
-   **Scope Name Mapping:** TextMate scope names (e.g., `comment.line.pkl`, `keyword.control.pkl`) will be mapped to Highlight.js `className` properties (e.g., `comment`, `keyword`). A specific mapping for `constant.character.escape` to `constant` will be ensured.
-   **Pattern Translation:** TextMate `match`, `begin`, and `end` regular expressions will be translated using `convertRegex` to be compatible with Highlight.js.
-   **Capture Group Handling:** TextMate `captures`, `beginCaptures`, and `endCaptures` will be processed to apply specific class names to sub-patterns within a match.
-   **Keyword Extraction:** The script will dynamically extract keywords and types from the TextMate grammar patterns to populate the `keywords` property in the Highlight.js definition.

This design directly references the [Architecture for Pkl Highlighting](../../architecture.md) for the overall system context and architectural decisions.

### 3. Key Changes

#### 3.1. API Contracts

No new API contracts are introduced. The `convertTextMateToHighlightJs` function within `scripts/convert-grammar.ts` will continue to accept an `IRawGrammar` object and return a `Language` object.

#### 3.2. Data Models

No new persistent data models are introduced. The conversion process operates on in-memory representations of the TextMate and Highlight.js grammars.

#### 3.3. Component Responsibilities

-   **`scripts/convert-grammar.ts`**: Enhanced responsibility to ensure accurate mapping of `constant.character.escape` to the `constant` class name, and robust keyword extraction.
-   **`test/visual-test.html`**: Continues to serve as the primary visual verification tool for the generated grammar.

### 4. Alternatives Considered

-   **Manual Conversion:** Initially, manual conversion was considered, but rejected due to high maintenance overhead, potential for inconsistencies, and difficulty in keeping up with grammar changes.
-   **Existing Converters:** Explored existing TextMate to Highlight.js converters, but found them either outdated, not flexible enough for Pkl's specific grammar nuances, or lacking the desired level of control over class name mapping.

### 5. Out of Scope

-   Full semantic analysis of Pkl code within the Highlight.js definition.
-   Advanced error recovery or syntax correction during highlighting.
-   Support for TextMate features not directly translatable to Highlight.js modes.

## Design Principles

-   **Single Responsibility**: `convert-grammar.ts` focuses solely on grammar conversion.
-   **Loose Coupling**: The conversion script is loosely coupled with the TextMate grammar (input) and Highlight.js output format.
-   **High Cohesion**: Related conversion logic is grouped within `convert-grammar.ts`.
-   **Fail-Safe Design**: The script includes error handling for file operations and parsing. Visual tests act as a safety net.
-   **Observable by Default**: Console logging within `convert-grammar.ts` provides visibility into the conversion process.

## Document Creation and Storage

New design documents should be created by copying this `standards-design.md` file as a template. They are derived from and must adhere to the guidelines set forth in the project's architecture documents.

**Storage Location:**
Design documents for specific features or work items should be stored within the `.kiro/specs/{feature_name}/` directory, named `design.md`. For example, a design document for the `pkl-highlighting` feature would be located at `.kiro/specs/pkl-highlighting/design.md`. This structure ensures that design documents are co-located with their related requirements and tasks, providing a clear, scalable, and traceable organization for project specifications.