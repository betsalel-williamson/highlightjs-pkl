module.exports = function(hljs) {
  return {
    name: 'Pkl',
    aliases: ['pkl', 'pcf'],
    keywords: {
      keyword: 'module class function if else when for import new as extends amends typealias abstract external open hidden local fixed const in out read throw trace let is',
      built_in: 'String Int Boolean Float List Map Set Pair Duration DataSize Regex Any Dynamic Listing Mapping',
      literal: 'true false null this outer super'
    },
    contains: [
      // Single line comments
      hljs.COMMENT('//', '$'),
      
      // Multi-line comments
      hljs.COMMENT('/\\*', '\\*/'),
      
      // Triple-quoted strings
      {
        className: 'string',
        begin: '"""',
        end: '"""',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      
      // Regular strings
      {
        className: 'string',
        begin: '"',
        end: '"',
        contains: [hljs.BACKSLASH_ESCAPE]
      },
      
      // Raw strings
      {
        className: 'string',
        begin: '#"',
        end: '"#'
      },
      
      // Numbers
      {
        className: 'number',
        variants: [
          { begin: '\\b0x[0-9a-fA-F_]+\\b' }, // hex
          { begin: '\\b0b[01_]+\\b' }, // binary
          { begin: '\\b0o[0-7_]+\\b' }, // octal
          { begin: '\\b\\d[\\d_]*\\.\\d[\\d_]*([eE][+-]?\\d[\\d_]*)?\\b' }, // float
          { begin: '\\b\\d[\\d_]*[eE][+-]?\\d[\\d_]*\\b' }, // scientific
          { begin: '\\b\\d[\\d_]*\\b' } // integer
        ]
      },
      
      // Type annotations
      {
        className: 'type',
        begin: '\\b[A-Z][a-zA-Z0-9_]*\\b'
      },
      
      // Annotations
      {
        className: 'meta',
        begin: '@[a-zA-Z_][a-zA-Z0-9_]*'
      },
      
      // Operators
      {
        className: 'operator',
        begin: '\\+|\\-|\\*|\\/|~\\/|%|\\*\\*|>|>=|<|<=|==|!=|!|&&|\\|\\||\\|>|\\?\\?|!!|=|->|\\|'
      }
    ]
  };
};