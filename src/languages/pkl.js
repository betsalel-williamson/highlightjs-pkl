module.exports = function(hljs) { return {
  "name": "Pkl",
  "aliases": [
    "pkl"
  ],
  "keywords": {
    "keyword": "LOGICAL MATH MISCELLANEOUS add amends and arrow as assertion assignment b class coalesce divide else equals extends for function greater if import integer is lambda less let minus modulo multiply new non not null nullish or pipe power read than throw trace type typealias unary union when x",
    "type": ""
  },
  "contains": [
    {
      "className": "comment",
      "begin": "//",
      "end": "$",
      "relevance": 0
    },
    {
      "className": "comment",
      "begin": "/\\*",
      "end": "\\*/",
      "contains": [
        "self"
      ]
    },
    {
      "className": "string",
      "begin": "\"",
      "end": "\"",
      "illegal": "\n"
    },
    {
      "className": "string",
      "begin": "'",
      "end": "'",
      "illegal": "\n"
    },
    {
      "className": "number",
      "variants": [
        {
          "begin": "\\b\\d+(\\.\\d+)?([eE][-+]?\\d+)?\\b"
        },
        {
          "begin": "\\b0x[0-9a-fA-F]+\\b"
        }
      ]
    }
  ]
}; };