# Pkl Highlighting Tests

This directory contains tests and validation tools for the Pkl syntax highlighting implementation.

## Structure

- `unit/pkl-basic.test.ts` - Basic unit tests for the Pkl language definition
- `markup/pkl/simple.txt` - Simple Pkl code sample for testing
- `visual-test.html` - Visual test page for manual validation

## Running Tests

```bash
# Run all tests
npm test

# Run only Pkl-specific tests
npm test -- --testPathPatterns=pkl-basic
```

## Visual Testing

Open `test/visual-test.html` in a web browser to visually validate the syntax highlighting. The page shows:

- Side-by-side comparison of highlighted vs unhighlighted code
- Examples of various Pkl language features
- Status indicator showing successful language registration

## Test Coverage

The basic test suite covers:

- Language registration with highlight.js
- Keyword highlighting (module, class, function, etc.)
- Comment highlighting (single-line and multi-line)
- String highlighting (regular and triple-quoted)
- Number highlighting (integers, floats, hex, binary, octal)
- Loading and highlighting of test Pkl files

## Adding New Tests

To add new test cases:

1. Add new `.txt` files to `test/markup/pkl/` for markup tests
2. Add corresponding `.expect.txt` files with expected highlighted output
3. Add unit tests to `test/unit/pkl-basic.test.ts` for specific features