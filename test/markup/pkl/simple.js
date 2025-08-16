const hljs = require('highlight.js');
const pkl = require('../../../src/languages/pkl.js');
const assert = require('assert');

hljs.registerLanguage('pkl', pkl);

describe('Pkl highlighting', function() {
  it('should highlight a simple assignment', function() {
    const code = 'name = "Pigeon"';
    const expected = '<span class="hljs-variable">name</span> = <span class="hljs-string">\"Pigeon\"</span>';
    const result = hljs.highlight(code, {language: 'pkl'}).value;
    assert.strictEqual(result, expected);
  });
});

