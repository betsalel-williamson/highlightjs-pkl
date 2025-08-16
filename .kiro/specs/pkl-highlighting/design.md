# Design Document

## 1. Objective

Create a Highlight.js language definition for Pkl that automatically highlights Pkl code with proper syntax coloring to improve readability for developers viewing Pkl configuration files.

## 2. Technical Design

The solution consists of three main components working together to provide comprehensive Pkl syntax highlighting:

### Language Definition Architecture

- **Pkl Language Grammar**: A JavaScript module following Highlight.js third-party language standards
- **Language Element Extraction**: Automated tooling to extract keywords and types from Pkl documentation / textmate syntax files
- **Integration Layer**: Standard Highlight.js integration patterns for web applications

### Core Components

1. **Language Grammar File** (`pkl.js`): Contains regex patterns and rules for identifying Pkl syntax elements
2. **Element Extraction Script**: Typescript script to parse Pkl textmate files and generate structured language data for highlight js this outputs the final required code in a `dist` folder. See examples `highlightjs-robots-txt/dist` and `highlightjs-cypher/dist`
3. **Test Suite**: Pkl code samples to validate highlighting accuracy based on examples in `highlightjs-cypher/test` and `highlightjs-robots-txt/test` these test can be run with `npm test`.

### Highlighting Strategy

The language definition will identify and highlight:

- **Keywords**: Language constructs like `module`, `class`, `function`, `import`
- **Built-in Types**: Pkl's type system elements (`String`, `Int`, `Boolean`, etc.)
- **Literals**: String, number, and boolean values
- **Comments**: Single-line (`//`) and block (`/* */`) comments
- **Operators**: Assignment, arithmetic, and logical operators
- **Identifiers**: Variable and property names

## 3. Key Changes

### 3.1. API Contracts

No new APIs required. The solution integrates with existing Highlight.js APIs:

- Standard language registration: `hljs.registerLanguage('pkl', pklLanguage)`
- Automatic detection via file extension and content patterns
- CSS class generation following Highlight.js conventions

### 3.2. Data Models

**Language Elements CSV Structure:**

```csv
element_type,element_name
keyword,module
keyword,class
builtin,String
builtin,Int
```

**Language Grammar Structure:**

Follow standards setout in `highlightjs-cypher/src/cypher.js` and `highlightjs-robots-txt/src/robots-txt.js`

```javascript
{
  name: 'pkl',
  aliases: ['pkl'],
  keywords: {
    keyword: 'module class function import...',
    built_in: 'String Int Boolean...',
    literal: 'true false null'
  },
  contains: [/* syntax rules */]
}
```

### 3.3. Component Responsibilities

**Element Extraction Script:**

- Parse Pkl documentation from `.kiro/guidelines/pkl/llms.txt`
- Extract keywords, built-ins, and language constructs using regex patterns from `./pkl.tmbundle/Syntaxes/pkl.tmLanguage` using vscode-textmate
- Convert oniguruma-to-es regex to javascript styles and then integrate with the highlight.js types 
- Generate structured CSV output for language definition creation
- Handle deduplication and categorization of language elements

**Language Grammar Module:**

- Define syntax highlighting rules using Highlight.js grammar format
- Implement proper precedence for overlapping patterns
- Provide accurate tokenization of Pkl code structures
- Support both standalone usage and web integration

**Integration Components:**

- Follow Highlight.js third-party language conventions
- Provide clear installation and usage documentation
- Support standard web bundling and CDN distribution patterns

## 4. Alternatives Considered

**Manual Language Definition Creation:**
Manually writing the language grammar without automated extraction. This approach is error-prone and difficult to maintain as Pkl evolves. Automated extraction ensures accuracy and maintainability.

**Direct Documentation Parsing:**
Parsing Pkl's official documentation website directly. While comprehensive, this approach introduces external dependencies and potential breaking changes. Using the local LLM guidelines provides stability and control.

**Embedded Grammar Rules:**
Hardcoding all syntax rules without intermediate data extraction. This makes the grammar difficult to verify and update. The CSV intermediate step provides transparency and validation opportunities.

## 5. Out of Scope

**Advanced Syntax Features:**
Complex Pkl features like advanced templating, complex type constraints, and dynamic evaluation are not included in the initial implementation. Focus is on core syntax highlighting.

**IDE Integration:**
Direct integration with IDEs or editors beyond web-based Highlight.js usage. The language definition can be adapted for other tools but that's not part of this implementation.

**Performance Optimization:**
Advanced performance tuning for very large Pkl files. The implementation focuses on correctness and standard usage patterns.

**Semantic Highlighting:**
Context-aware highlighting that requires understanding of Pkl's type system and scoping rules. This implementation provides syntactic highlighting only.
