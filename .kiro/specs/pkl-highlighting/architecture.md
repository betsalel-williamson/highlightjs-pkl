---
inclusion: manual
---

# Architecture for Pkl Highlighting

This document outlines the architecture for integrating Pkl language highlighting into Highlight.js. It provides a holistic view of the system components involved in the conversion and rendering of Pkl syntax, emphasizing the business value of accurate and maintainable language support.

## Architecture Document Structure

All architecture documents must include:

### 1. Introduction

This architecture document details the approach for enabling Pkl language highlighting within the Highlight.js framework. The primary purpose is to establish a robust and automated process for converting TextMate grammar definitions into Highlight.js compatible formats, thereby contributing to the project's goal of comprehensive language support and reduced manual maintenance.

### 2. Business and System Context

This system fits into the broader ecosystem of Highlight.js language support. It directly supports developers and users who require syntax highlighting for Pkl code in various applications. The value streams include improved code readability, enhanced developer experience, and simplified integration of Pkl into documentation and web platforms. The system interacts with the existing Highlight.js core library and build processes.

### 3. Architectural Drivers

-   **Maintainability:** The primary driver is to ensure that updates to the Pkl TextMate grammar can be easily propagated to the Highlight.js definition with minimal manual intervention.
-   **Accuracy:** The conversion process must accurately translate TextMate grammar rules to Highlight.js modes to ensure correct syntax highlighting.
-   **Efficiency:** The conversion script should be efficient in terms of execution time and resource usage.
-   **Scalability:** The architecture should support the addition of new language features or changes to the Pkl grammar without requiring a complete overhaul of the conversion process.

### 4. Architectural Decisions

-   **Automated Grammar Conversion:** Decided to implement an automated script (`scripts/convert-grammar.ts`) to transform TextMate `.tmLanguage` files into Highlight.js `.js` definitions. This decision addresses maintainability and accuracy by reducing manual errors and ensuring consistency.
-   **TextMate as Source of Truth:** The TextMate grammar (`pkl.tmbundle/Syntaxes/pkl.tmLanguage`) is designated as the single source of truth for Pkl syntax definition. This simplifies updates and centralizes grammar management.
-   **Visual Verification:** Implemented a visual test (`test/visual-test.html`) to verify the correctness of the generated Highlight.js grammar. This decision addresses accuracy and provides a quick feedback loop during development.

### 5. Logical View

The system's logical organization involves:
-   **TextMate Grammar Module:** Contains the raw Pkl TextMate grammar definition.
-   **Conversion Script Module:** (`scripts/convert-grammar.ts`) Responsible for parsing the TextMate grammar and generating the Highlight.js equivalent.
-   **Highlight.js Language Definition Module:** The output `.js` file (e.g., `src/languages/pkl.js`) containing the Highlight.js compatible Pkl language definition.
-   **Highlight.js Core:** The main Highlight.js library that consumes the generated language definition.
-   **Visual Test Module:** (`test/visual-test.html`) A web page that loads Highlight.js and the Pkl language definition to visually inspect the highlighting.

### 6. Process View

The primary process flow is the grammar conversion workflow:
1.  Developer updates the git submodule managed by the pkl team at `pkl.tmbundle/Syntaxes/pkl.tmLanguage`.
2.  Developer runs `npm run build:grammar` (which executes `scripts/convert-grammar.ts`).
3.  `scripts/convert-grammar.ts` reads the TextMate grammar.
4.  The script processes the grammar, converting TextMate rules and scopes into Highlight.js modes and class names.
5.  A new Highlight.js language definition file is generated (e.g., `src/languages/pkl.js`).
6.  Developer opens `test/visual-test.html` to visually verify the highlighting.

### 7. Deployment View

The generated Highlight.js Pkl language definition (`src/languages/pkl.js`) will be deployed as part of the Highlight.js library. Users will include this file along with the Highlight.js core to enable Pkl highlighting in their applications.

### 8. Data View

-   **Input Data:** TextMate grammar (XML/plist format).
-   **Intermediate Data:** Internal data structures within `convert-grammar.ts` representing parsed grammar rules.
-   **Output Data:** Highlight.js language definition (JavaScript object).

### 9. Security Considerations

No specific security considerations beyond standard code quality and dependency management for the conversion script itself. The generated Highlight.js code is declarative and does not execute arbitrary user input.

### 10. Operational Considerations

-   The `build:grammar` script is integrated into the project's `package.json` for easy execution.
-   Visual tests provide a quick way to verify changes. Automated unit tests for `convert-grammar.ts` ensure the conversion logic's integrity.

## Document Organization Principles

-   **Abstracted Layers**: Break documentation into focused, manageable files
-   **Entry Points**: High-level overview.md as system entry point
-   **Specific Concerns**: Dedicated files for architectural views (data-flow.md, security-considerations.md)
-   **Cross-referencing**: Robust navigation between high-level and detailed views

## Relationship to Design Documents

This architecture document defines the overarching structure and principles for Pkl highlighting. Feature-level design documents (e.g., for specific Pkl language features or complex highlighting scenarios) must adhere to the architectural decisions and guidelines established here. This architecture document should be referenced by design documents to ensure consistency and alignment across all levels of documentation.

## Document Creation and Storage

New architecture documents should be created by copying this `standards-architecture.md` file as a template.

**Storage Location:**
Project-level architecture documents should be stored directly within the `.kiro/architecture/` directory. For architecture specific to a major feature or subsystem, documents can be placed within `.kiro/specs/{feature_name}/architecture.md`. This structure ensures that architecture documents are organized logically, are easily discoverable, and provide a clear hierarchy for project documentation.