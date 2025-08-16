import * as fs from 'fs';
import * as path from 'path';

// Import highlight.js and pkl language definition
const hljs = require('highlight.js');
const pklLanguage = require('../../src/languages/pkl-simple.js');

describe('Pkl Language Definition', () => {
  beforeAll(() => {
    // Register the Pkl language with highlight.js
    hljs.registerLanguage('pkl', pklLanguage);
  });

  test('should register pkl language successfully', () => {
    const registeredLanguages = hljs.listLanguages();
    expect(registeredLanguages).toContain('pkl');
  });

  test('should highlight basic pkl code', () => {
    const code = `module example
name = "test"
version = 1.0`;
    
    const result = hljs.highlight(code, { language: 'pkl' });
    
    // Verify that highlighting was applied
    expect(result.value).toContain('<span');
    expect(result.language).toBe('pkl');
  });

  test('should highlight pkl keywords', () => {
    const code = 'module example\nclass Person\nfunction greet()';
    
    const result = hljs.highlight(code, { language: 'pkl' });
    
    // Check that keywords are wrapped in spans with keyword class
    expect(result.value).toContain('<span class="hljs-keyword">module</span>');
    expect(result.value).toContain('<span class="hljs-keyword">class</span>');
    expect(result.value).toContain('<span class="hljs-keyword">function</span>');
  });

  test('should highlight pkl comments', () => {
    const code = `// This is a comment
/* Block comment */
name = "test"`;
    
    const result = hljs.highlight(code, { language: 'pkl' });
    
    // Verify comments are highlighted with comment class
    expect(result.value).toContain('<span class="hljs-comment">');
  });

  test('should highlight pkl strings', () => {
    const code = `name = "Hello World"
description = """
Multi-line string
"""`;
    
    const result = hljs.highlight(code, { language: 'pkl' });
    
    // Verify strings are highlighted with string class
    expect(result.value).toContain('<span class="hljs-string">');
  });

  test('should highlight pkl numbers', () => {
    const code = `version = 1.0
count = 42
hex = 0xFF`;
    
    const result = hljs.highlight(code, { language: 'pkl' });
    
    // Verify numbers are highlighted with number class
    expect(result.value).toContain('<span class="hljs-number">');
  });

  test('should load simple pkl test file', () => {
    const testFilePath = path.join(__dirname, '../markup/pkl/simple.txt');
    expect(fs.existsSync(testFilePath)).toBe(true);
    
    const content = fs.readFileSync(testFilePath, 'utf-8');
    expect(content).toContain('module example');
    expect(content).toContain('class Person');
    
    // Verify it can be highlighted without errors
    const result = hljs.highlight(content, { language: 'pkl' });
    expect(result.value).toBeTruthy();
    expect(result.language).toBe('pkl');
  });
});