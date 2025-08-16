module.exports = function(hljs) { return {
  "name": "Pkl",
  "aliases": [
    "pkl",
    "pcf"
  ],
  "keywords": {},
  "contains": [
    {
      "begin": "\\b (module) \\s+ ( [\\p{L}_$][\\p{L}0-9_$]*(?:\\.[\\p{L}_$][\\p{L}0-9_$]*)* )"
    },
    {
      "begin": "(typealias) \\s+ ([\\p{L}_$][\\p{L}0-9_$]*) \\s*(=)\\s* ((?x: (?x: [\\p{L}_$][\\p{L}0-9_$]* \\s* (?:<[^>]*>)? \\s* (?:\\([^)]*\\))? \\s* \\?? ) \\s* (\\|\\s*(?x: [\\p{L}_$][\\p{L}0-9_$]* \\s* (?:<[^>]*>)? \\s* (?:\\([^)]*\\))? \\s* \\?? ))* ))"
    },
    {
      "className": "type",
      "begin": "\\b(class)\\s+[\\p{L}_$][\\p{L}0-9_$]*"
    },
    {
      "begin": "\\b(for) \\s*\\( ([\\p{L}_$][\\p{L}0-9_$]*)(?:\\s*,\\s*([\\p{L}_$][\\p{L}0-9_$]*))* \\s+ (in)"
    },
    {
      "begin": "\\b(new)\\s+((?x:\n  (?x:\n  [\\p{L}_$][\\p{L}0-9_$]* # ident\n  \\s*\n  (?:<[^>]*>)? # optional type parameters\n  \\s*\n  (?:\\([^)]*\\))? # optional constraint (this is an approximation)\n  \\s*\n  \\?? # optional nulability indicator\n)\n  \\s*\n  (\\|\\s*(?x:\n  [\\p{L}_$][\\p{L}0-9_$]* # ident\n  \\s*\n  (?:<[^>]*>)? # optional type parameters\n  \\s*\n  (?:\\([^)]*\\))? # optional constraint (this is an approximation)\n  \\s*\n  \\?? # optional nulability indicator\n))*\n))"
    },
    {
      "begin": "\\b(function)\\s+([\\p{L}_$][\\p{L}0-9_$]*)"
    },
    {
      "begin": "\\b(as)\\s+((?x:\n  (?x:\n  [\\p{L}_$][\\p{L}0-9_$]* # ident\n  \\s*\n  (?:<[^>]*>)? # optional type parameters\n  \\s*\n  (?:\\([^)]*\\))? # optional constraint (this is an approximation)\n  \\s*\n  \\?? # optional nulability indicator\n)\n  \\s*\n  (\\|\\s*(?x:\n  [\\p{L}_$][\\p{L}0-9_$]* # ident\n  \\s*\n  (?:<[^>]*>)? # optional type parameters\n  \\s*\n  (?:\\([^)]*\\))? # optional constraint (this is an approximation)\n  \\s*\n  \\?? # optional nulability indicator\n))*\n))"
    },
    {
      "begin": "\\b(true|false|null)\\b"
    },
    {
      "className": "comment",
      "begin": "//.*"
    },
    {
      "className": "comment",
      "begin": "/\\*",
      "end": "\\*/"
    },
    {
      "begin": "( (?:\\b|\\s*)[\\p{L}_$][\\p{L}0-9_$]* | `[^`]+` ) \\s* (:) \\s* ((?x: (?x: [\\p{L}_$][\\p{L}0-9_$]* \\s* (?:<[^>]*>)? \\s* (?:\\([^)]*\\))? \\s* \\?? ) \\s* (\\|\\s*(?x: [\\p{L}_$][\\p{L}0-9_$]* \\s* (?:<[^>]*>)? \\s* (?:\\([^)]*\\))? \\s* \\?? ))* ))",
      "end": "\\s*=|,|\\)|^[ \\t]*$"
    },
    {
      "begin": "( \\b[\\p{L}_$][\\p{L}0-9_$]* | `[^`]+` ) \\s* (=)(?!=)"
    },
    {
      "begin": "(:)\\s*((?x:\n  (?x:\n  [\\p{L}_$][\\p{L}0-9_$]* # ident\n  \\s*\n  (?:<[^>]*>)? # optional type parameters\n  \\s*\n  (?:\\([^)]*\\))? # optional constraint (this is an approximation)\n  \\s*\n  \\?? # optional nulability indicator\n)\n  \\s*\n  (\\|\\s*(?x:\n  [\\p{L}_$][\\p{L}0-9_$]* # ident\n  \\s*\n  (?:<[^>]*>)? # optional type parameters\n  \\s*\n  (?:\\([^)]*\\))? # optional constraint (this is an approximation)\n  \\s*\n  \\?? # optional nulability indicator\n))*\n))"
    },
    {
      "begin": "^\\s*([\\p{L}_$][\\p{L}0-9_$]*)\\s*\\{"
    },
    {
      "begin": "\\b(hidden|local|abstract|external|open|in|out|amends|extends|fixed|const)\\b"
    },
    {
      "className": "keyword",
      "begin": "\\b(amends|as|extends|function|is|let|read|read\\?|import|throw|trace)\\b"
    },
    {
      "className": "keyword",
      "begin": "\\b(if|else|when|for|import|new)\\b"
    },
    {
      "className": "number",
      "begin": "\\b 0x(?:[\\da-fA-F][\\da-fA-F_]*[\\da-fA-F]|[\\da-fA-F_]) \\b"
    },
    {
      "className": "number",
      "begin": "\\b 0b(?:[0-1][0-1_]*[0-1]|[0-1]) \\b"
    },
    {
      "className": "number",
      "begin": "\\b 0o(?:[0-7][0-7_]*[0-7]|[0-7]) \\b"
    },
    {
      "className": "number",
      "begin": "\\b (?:\\d[0-9_]*\\d|\\d) \\b"
    },
    {
      "className": "number",
      "begin": "\\b (?: (?:\\d[0-9_]*\\d|\\d)? \\. (?:\\d[0-9_]*\\d|\\d) (?:[eE][+-]?(?:\\d[0-9_]*\\d|\\d))? | (?:\\d[0-9_]*\\d|\\d) [eE][+-]?(?:\\d[0-9_]*\\d|\\d) ) \\b"
    },
    {
      "className": "keyword",
      "begin": "\\+ | - | \\* | / | ~/ | % | \\*\\* | > | >= | < | <= | == | != | ! | && | \\|\\| | \\|> | \\?\\? | !! | = | -> | \\|"
    },
    {
      "className": "variable",
      "begin": "\\b(this|module|outer|super)\\b"
    },
    {
      "begin": "\\b(unknown|never)\\b"
    },
    {
      "begin": "[(){}\\[\\]]"
    },
    {
      "className": "keyword",
      "begin": "\\b(class|typealias)\\b"
    },
    {
      "className": "punctuation",
      "begin": "\\.\\? | \\. | ; | :"
    },
    {
      "className": "type",
      "begin": "@[\\p{L}_$][\\p{L}0-9_$]*"
    },
    {
      "className": "string",
      "begin": "(\"\"\")",
      "end": "(\"\"\")",
      "contains": [
        {
          "className": "built_in",
          "begin": "\\\\ (?: [trn\"\\\\] | u \\{ [\\da-fA-F]+ } | ( .+? \\) ) | ( ) . )"
        }
      ]
    },
    {
      "className": "string",
      "begin": "(\")",
      "end": "(\") | (.?$)",
      "contains": [
        {
          "className": "built_in",
          "begin": "\\\\ (?: [trn\"\\\\] | u \\{ [\\da-fA-F]+ } | ( .+? \\) ) | ( ) . )"
        }
      ]
    },
    {
      "className": "string",
      "begin": "(#\"\"\")",
      "end": "(\"\"\"#)",
      "contains": [
        {
          "className": "built_in",
          "begin": "\\\\\\ (?: [trn\"\\\\] | u \\{ [\\da-fA-F]+ } | ( .+? \\) ) | ( )\\ . )"
        }
      ]
    },
    {
      "className": "string",
      "begin": "(#\")",
      "end": "(\"\\ | (.?$)",
      "contains": [
        {
          "className": "built_in",
          "begin": "\\\\\\ (?: [trn\"\\\\] | u \\{ [\\da-fA-F]+ } | ( .+? \\) ) | ( )\\ . )"
        }
      ]
    },
    {
      "className": "string",
      "begin": "(##\"\"\")",
      "end": "(\"\"\"##)",
      "contains": [
        {
          "className": "built_in",
          "begin": "\\\\\\ (?: [trn\"\\\\] | u \\{ [\\da-fA-F]+ } | ( .+? \\) ) | ( )\\ . )"
        }
      ]
    },
    {
      "className": "string",
      "begin": "(##\")",
      "end": "(\"\\ | (.?$)",
      "contains": [
        {
          "className": "built_in",
          "begin": "\\\\\\ (?: [trn\"\\\\] | u \\{ [\\da-fA-F]+ } | ( .+? \\) ) | ( )\\ . )"
        }
      ]
    },
    {
      "className": "string",
      "begin": "(###\"\"\")",
      "end": "(\"\"\"###)",
      "contains": [
        {
          "className": "built_in",
          "begin": "\\\\\\ (?: [trn\"\\\\] | u \\{ [\\da-fA-F]+ } | ( .+? \\) ) | ( )\\ . )"
        }
      ]
    },
    {
      "className": "string",
      "begin": "(###\")",
      "end": "(\"\\ | (.?$)",
      "contains": [
        {
          "className": "built_in",
          "begin": "\\\\\\ (?: [trn\"\\\\] | u \\{ [\\da-fA-F]+ } | ( .+? \\) ) | ( )\\ . )"
        }
      ]
    },
    {
      "className": "string",
      "begin": "(####\"\"\")",
      "end": "(\"\"\"####)",
      "contains": [
        {
          "className": "built_in",
          "begin": "\\\\\\ (?: [trn\"\\\\] | u \\{ [\\da-fA-F]+ } | ( .+? \\) ) | ( )\\ . )"
        }
      ]
    },
    {
      "className": "string",
      "begin": "(####\")",
      "end": "(\"\\ | (.?$)",
      "contains": [
        {
          "className": "built_in",
          "begin": "\\\\\\ (?: [trn\"\\\\] | u \\{ [\\da-fA-F]+ } | ( .+? \\) ) | ( )\\ . )"
        }
      ]
    },
    {
      "className": "string",
      "begin": "(#####\"\"\")",
      "end": "(\"\"\"#####)",
      "contains": [
        {
          "className": "built_in",
          "begin": "\\\\\\ (?: [trn\"\\\\] | u \\{ [\\da-fA-F]+ } | ( .+? \\) ) | ( )\\ . )"
        }
      ]
    },
    {
      "className": "string",
      "begin": "(#####\")",
      "end": "(\"\\ | (.?$)",
      "contains": [
        {
          "className": "built_in",
          "begin": "\\\\\\ (?: [trn\"\\\\] | u \\{ [\\da-fA-F]+ } | ( .+? \\) ) | ( )\\ . )"
        }
      ]
    },
    {
      "className": "string",
      "begin": "(######\"\"\")",
      "end": "(\"\"\"######)",
      "contains": [
        {
          "className": "built_in",
          "begin": "\\\\\\ (?: [trn\"\\\\] | u \\{ [\\da-fA-F]+ } | ( .+? \\) ) | ( )\\ . )"
        }
      ]
    },
    {
      "className": "string",
      "begin": "(######\")",
      "end": "(\"\\ | (.?$)",
      "contains": [
        {
          "className": "built_in",
          "begin": "\\\\\\ (?: [trn\"\\\\] | u \\{ [\\da-fA-F]+ } | ( .+? \\) ) | ( )\\ . )"
        }
      ]
    }
  ]
}; };