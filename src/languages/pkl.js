module.exports = function(hljs) { return {
  "name": "pkl",
  "aliases": [
    "pkl",
    "pcf"
  ],
  "contains": [
    {
      "match": "(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))(module)\\p{space}+([\\p{L}_$][\\p{L}0-9_$]*(?:\\.[\\p{L}_$][\\p{L}0-9_$]*)*)",
      "captures": {
        "1": {
          "className": "variable"
        },
        "2": {
          "className": "variable"
        }
      }
    },
    {
      "match": "(typealias)\\p{space}+([\\p{L}_$][\\p{L}0-9_$]*)\\p{space}*(=)\\p{space}*([\\p{L}_$][\\p{L}0-9_$]*\\p{space}*(?:<[^>]*>)?\\p{space}*(?:\\([^)]*\\))?\\p{space}*\\??\\p{space}*(\\|\\p{space}*[\\p{L}_$][\\p{L}0-9_$]*\\p{space}*(?:<[^>]*>)?\\p{space}*(?:\\([^)]*\\))?\\p{space}*\\??)*)",
      "captures": {
        "1": {
          "className": "keyword"
        },
        "2": {
          "className": "entity"
        },
        "3": {
          "className": "punctuation"
        },
        "4": {
          "className": "entity"
        }
      }
    },
    {
      "className": "type",
      "match": "(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))(class)\\p{space}+[\\p{L}_$][\\p{L}0-9_$]*",
      "captures": {
        "1": {
          "className": "keyword"
        }
      }
    },
    {
      "match": "(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))(for)\\p{space}*\\(([\\p{L}_$][\\p{L}0-9_$]*)(?:\\p{space}*,\\p{space}*([\\p{L}_$][\\p{L}0-9_$]*))*\\p{space}+(in)",
      "captures": {
        "1": {
          "className": "keyword"
        },
        "2": {
          "className": "variable"
        },
        "3": {
          "className": "variable"
        },
        "4": {
          "className": "storage"
        }
      }
    },
    {
      "match": "(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))(new)\\p{space}+([\\p{L}_$][\\p{L}0-9_$]*\\p{space}*(?:<[^>]*>)?\\p{space}*(?:\\([^)]*\\))?\\p{space}*\\??\\p{space}*(\\|\\p{space}*[\\p{L}_$][\\p{L}0-9_$]*\\p{space}*(?:<[^>]*>)?\\p{space}*(?:\\([^)]*\\))?\\p{space}*\\??)*)",
      "captures": {
        "1": {
          "className": "keyword"
        },
        "2": {
          "className": "entity"
        }
      }
    },
    {
      "match": "(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))(function)\\p{space}+([\\p{L}_$][\\p{L}0-9_$]*)",
      "captures": {
        "1": {
          "className": "keyword"
        },
        "2": {
          "className": "variable"
        }
      }
    },
    {
      "match": "(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))(as)\\p{space}+([\\p{L}_$][\\p{L}0-9_$]*\\p{space}*(?:<[^>]*>)?\\p{space}*(?:\\([^)]*\\))?\\p{space}*\\??\\p{space}*(\\|\\p{space}*[\\p{L}_$][\\p{L}0-9_$]*\\p{space}*(?:<[^>]*>)?\\p{space}*(?:\\([^)]*\\))?\\p{space}*\\??)*)",
      "captures": {
        "1": {
          "className": "keyword"
        },
        "2": {
          "className": "entity"
        }
      }
    },
    {
      "match": "(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))(true|false|null)(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))"
    },
    {
      "className": "comment",
      "begin": "\\/\\/[^\\n]*",
      "end": "$"
    },
    {
      "className": "comment",
      "begin": "\\/\\*",
      "end": "\\*\\/"
    },
    {
      "begin": "((?:(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))|\\p{space}*)[\\p{L}_$][\\p{L}0-9_$]*|`[^`]+`)\\p{space}*(:)\\p{space}*([\\p{L}_$][\\p{L}0-9_$]*\\p{space}*(?:<[^>]*>)?\\p{space}*(?:\\([^)]*\\))?\\p{space}*\\??\\p{space}*(\\|\\p{space}*[\\p{L}_$][\\p{L}0-9_$]*\\p{space}*(?:<[^>]*>)?\\p{space}*(?:\\([^)]*\\))?\\p{space}*\\??)*)",
      "end": "\\p{space}*=|,|\\)|(?<=^|\\n(?!$))[ \\t]*(?=$|\\n)",
      "captures": {
        "1": {
          "className": "variable"
        },
        "2": {
          "className": "punctuation"
        },
        "3": {
          "className": "entity"
        }
      }
    },
    {
      "match": "((?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))[\\p{L}_$][\\p{L}0-9_$]*|`[^`]+`)\\p{space}*(=)(?!=)",
      "captures": {
        "1": {
          "className": "variable"
        },
        "2": {
          "className": "punctuation"
        }
      }
    },
    {
      "match": "(:)\\p{space}*([\\p{L}_$][\\p{L}0-9_$]*\\p{space}*(?:<[^>]*>)?\\p{space}*(?:\\([^)]*\\))?\\p{space}*\\??\\p{space}*(\\|\\p{space}*[\\p{L}_$][\\p{L}0-9_$]*\\p{space}*(?:<[^>]*>)?\\p{space}*(?:\\([^)]*\\))?\\p{space}*\\??)*)",
      "captures": {
        "1": {
          "className": "punctuation"
        },
        "2": {
          "className": "entity"
        }
      }
    },
    {
      "match": "(?<=^|\\n(?!$))\\p{space}*([\\p{L}_$][\\p{L}0-9_$]*)\\p{space}*\\{",
      "captures": {
        "1": {
          "className": "variable"
        }
      }
    },
    {
      "match": "(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))(hidden|local|abstract|external|open|in|out|amends|extends|fixed|const)(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))"
    },
    {
      "className": "keyword",
      "match": "(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))(amends|as|extends|function|is|let|read|read\\?|import|throw|trace)(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))"
    },
    {
      "className": "keyword",
      "match": "(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))(if|else|when|for|import|new)(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))"
    },
    {
      "className": "number",
      "match": "(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))0x(?:[\\p{Nd}a-fA-F][\\p{Nd}a-fA-F_]*[\\p{Nd}a-fA-F]|[\\p{Nd}a-fA-F_])(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))"
    },
    {
      "className": "number",
      "match": "(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))0b(?:[0-1][0-1_]*[0-1]|[0-1])(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))"
    },
    {
      "className": "number",
      "match": "(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))0o(?:[0-7][0-7_]*[0-7]|[0-7])(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))"
    },
    {
      "className": "number",
      "match": "(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))(?:\\p{Nd}[0-9_]*\\p{Nd}|\\p{Nd})(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))"
    },
    {
      "className": "number",
      "match": "(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))(?:(?:\\p{Nd}[0-9_]*\\p{Nd}|\\p{Nd})?\\.(?:\\p{Nd}[0-9_]*\\p{Nd}|\\p{Nd})(?:[eE][+\\-]?(?:\\p{Nd}[0-9_]*\\p{Nd}|\\p{Nd}))?|(?:\\p{Nd}[0-9_]*\\p{Nd}|\\p{Nd})[eE][+\\-]?(?:\\p{Nd}[0-9_]*\\p{Nd}|\\p{Nd}))(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))"
    },
    {
      "className": "keyword",
      "match": "(?:\\+|-|\\*|\\/|~\\/|%|\\*\\*|>|>=|<|<=|==|!=|!|&&|\\|\\||\\|>|\\?\\?|!!|=|->|\\|)"
    },
    {
      "className": "variable",
      "match": "(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))(this|module|outer|super)(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))"
    },
    {
      "match": "(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))(unknown|never)(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))"
    },
    {
      "match": "[(){}\\[\\]]"
    },
    {
      "className": "keyword",
      "match": "(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))(class|typealias)(?:(?<=[\\p{L}\\p{M}\\p{N}\\p{Pc}])(?![\\p{L}\\p{M}\\p{N}\\p{Pc}])|(?<![\\p{L}\\p{M}\\p{N}\\p{Pc}])(?=[\\p{L}\\p{M}\\p{N}\\p{Pc}]))"
    },
    {
      "className": "punctuation",
      "match": "(?:\\.\\?|\\.|;|:)"
    },
    {
      "className": "type",
      "match": "@[\\p{L}_$][\\p{L}0-9_$]*"
    },
    {
      "className": "string",
      "begin": "(\"\"\")",
      "end": "(\"\"\")",
      "captures": {
        "1": {
          "className": "punctuation"
        }
      },
      "contains": [
        {
          "className": "constant",
          "match": "(?:\\\\(?:[trn\"\\\\]|u\\{[\\p{Nd}a-fA-F]+\\}|\\([^\\n]+?\\))|(\\\\[^\\n]))",
          "captures": {
            "1": {
              "className": "invalid"
            }
          }
        }
      ]
    },
    {
      "className": "string",
      "begin": "(\")",
      "end": "(?:(\")|([^\\n]?(?=$|\\n)))",
      "beginCaptures": {
        "1": {
          "className": "punctuation"
        }
      },
      "endCaptures": {
        "1": {
          "className": "punctuation"
        },
        "2": {
          "className": "invalid"
        }
      },
      "contains": [
        {
          "className": "constant",
          "match": "(?:\\\\(?:[trn\"\\\\]|u\\{[\\p{Nd}a-fA-F]+\\}|\\([^\\n]+?\\))|(\\\\[^\\n]))",
          "captures": {
            "1": {
              "className": "invalid"
            }
          }
        }
      ]
    },
    {
      "className": "string",
      "begin": "(#\"\"\")",
      "end": "(\"\"\"#)",
      "captures": {
        "1": {
          "className": "punctuation"
        }
      },
      "contains": [
        {
          "className": "constant",
          "match": "(?:\\\\#(?:[trn\"\\\\]|u\\{[\\p{Nd}a-fA-F]+\\}|\\([^\\n]+?\\))|(\\\\#[^\\n]))",
          "captures": {
            "1": {
              "className": "invalid"
            }
          }
        }
      ]
    },
    {
      "className": "string",
      "begin": "(#\")",
      "end": "(?:(\"#)|([^\\n]?(?=$|\\n)))",
      "beginCaptures": {
        "1": {
          "className": "punctuation"
        }
      },
      "endCaptures": {
        "1": {
          "className": "punctuation"
        },
        "2": {
          "className": "invalid"
        }
      },
      "contains": [
        {
          "className": "constant",
          "match": "(?:\\\\#(?:[trn\"\\\\]|u\\{[\\p{Nd}a-fA-F]+\\}|\\([^\\n]+?\\))|(\\\\#[^\\n]))",
          "captures": {
            "1": {
              "className": "invalid"
            }
          }
        }
      ]
    },
    {
      "className": "string",
      "begin": "(##\"\"\")",
      "end": "(\"\"\"##)",
      "captures": {
        "1": {
          "className": "punctuation"
        }
      },
      "contains": [
        {
          "className": "constant",
          "match": "(?:\\\\##(?:[trn\"\\\\]|u\\{[\\p{Nd}a-fA-F]+\\}|\\([^\\n]+?\\))|(\\\\##[^\\n]))",
          "captures": {
            "1": {
              "className": "invalid"
            }
          }
        }
      ]
    },
    {
      "className": "string",
      "begin": "(##\")",
      "end": "(?:(\"##)|([^\\n]?(?=$|\\n)))",
      "beginCaptures": {
        "1": {
          "className": "punctuation"
        }
      },
      "endCaptures": {
        "1": {
          "className": "punctuation"
        },
        "2": {
          "className": "invalid"
        }
      },
      "contains": [
        {
          "className": "constant",
          "match": "(?:\\\\##(?:[trn\"\\\\]|u\\{[\\p{Nd}a-fA-F]+\\}|\\([^\\n]+?\\))|(\\\\##[^\\n]))",
          "captures": {
            "1": {
              "className": "invalid"
            }
          }
        }
      ]
    },
    {
      "className": "string",
      "begin": "(###\"\"\")",
      "end": "(\"\"\"###)",
      "captures": {
        "1": {
          "className": "punctuation"
        }
      },
      "contains": [
        {
          "className": "constant",
          "match": "(?:\\\\###(?:[trn\"\\\\]|u\\{[\\p{Nd}a-fA-F]+\\}|\\([^\\n]+?\\))|(\\\\###[^\\n]))",
          "captures": {
            "1": {
              "className": "invalid"
            }
          }
        }
      ]
    },
    {
      "className": "string",
      "begin": "(###\")",
      "end": "(?:(\"###)|([^\\n]?(?=$|\\n)))",
      "beginCaptures": {
        "1": {
          "className": "punctuation"
        }
      },
      "endCaptures": {
        "1": {
          "className": "punctuation"
        },
        "2": {
          "className": "invalid"
        }
      },
      "contains": [
        {
          "className": "constant",
          "match": "(?:\\\\###(?:[trn\"\\\\]|u\\{[\\p{Nd}a-fA-F]+\\}|\\([^\\n]+?\\))|(\\\\###[^\\n]))",
          "captures": {
            "1": {
              "className": "invalid"
            }
          }
        }
      ]
    },
    {
      "className": "string",
      "begin": "(####\"\"\")",
      "end": "(\"\"\"####)",
      "captures": {
        "1": {
          "className": "punctuation"
        }
      },
      "contains": [
        {
          "className": "constant",
          "match": "(?:\\\\####(?:[trn\"\\\\]|u\\{[\\p{Nd}a-fA-F]+\\}|\\([^\\n]+?\\))|(\\\\####[^\\n]))",
          "captures": {
            "1": {
              "className": "invalid"
            }
          }
        }
      ]
    },
    {
      "className": "string",
      "begin": "(####\")",
      "end": "(?:(\"####)|([^\\n]?(?=$|\\n)))",
      "beginCaptures": {
        "1": {
          "className": "punctuation"
        }
      },
      "endCaptures": {
        "1": {
          "className": "punctuation"
        },
        "2": {
          "className": "invalid"
        }
      },
      "contains": [
        {
          "className": "constant",
          "match": "(?:\\\\####(?:[trn\"\\\\]|u\\{[\\p{Nd}a-fA-F]+\\}|\\([^\\n]+?\\))|(\\\\####[^\\n]))",
          "captures": {
            "1": {
              "className": "invalid"
            }
          }
        }
      ]
    },
    {
      "className": "string",
      "begin": "(#####\"\"\")",
      "end": "(\"\"\"#####)",
      "captures": {
        "1": {
          "className": "punctuation"
        }
      },
      "contains": [
        {
          "className": "constant",
          "match": "(?:\\\\#####(?:[trn\"\\\\]|u\\{[\\p{Nd}a-fA-F]+\\}|\\([^\\n]+?\\))|(\\\\#####[^\\n]))",
          "captures": {
            "1": {
              "className": "invalid"
            }
          }
        }
      ]
    },
    {
      "className": "string",
      "begin": "(#####\")",
      "end": "(?:(\"#####)|([^\\n]?(?=$|\\n)))",
      "beginCaptures": {
        "1": {
          "className": "punctuation"
        }
      },
      "endCaptures": {
        "1": {
          "className": "punctuation"
        },
        "2": {
          "className": "invalid"
        }
      },
      "contains": [
        {
          "className": "constant",
          "match": "(?:\\\\#####(?:[trn\"\\\\]|u\\{[\\p{Nd}a-fA-F]+\\}|\\([^\\n]+?\\))|(\\\\#####[^\\n]))",
          "captures": {
            "1": {
              "className": "invalid"
            }
          }
        }
      ]
    },
    {
      "className": "string",
      "begin": "(######\"\"\")",
      "end": "(\"\"\"######)",
      "captures": {
        "1": {
          "className": "punctuation"
        }
      },
      "contains": [
        {
          "className": "constant",
          "match": "(?:\\\\######(?:[trn\"\\\\]|u\\{[\\p{Nd}a-fA-F]+\\}|\\([^\\n]+?\\))|(\\\\######[^\\n]))",
          "captures": {
            "1": {
              "className": "invalid"
            }
          }
        }
      ]
    },
    {
      "className": "string",
      "begin": "(######\")",
      "end": "(?:(\"######)|([^\\n]?(?=$|\\n)))",
      "beginCaptures": {
        "1": {
          "className": "punctuation"
        }
      },
      "endCaptures": {
        "1": {
          "className": "punctuation"
        },
        "2": {
          "className": "invalid"
        }
      },
      "contains": [
        {
          "className": "constant",
          "match": "(?:\\\\######(?:[trn\"\\\\]|u\\{[\\p{Nd}a-fA-F]+\\}|\\([^\\n]+?\\))|(\\\\######[^\\n]))",
          "captures": {
            "1": {
              "className": "invalid"
            }
          }
        }
      ]
    }
  ],
  "keywords": {
    "keyword": "L M N Pc amends as class else extends for function if import is let new p read throw trace typealias when"
  }
}; };