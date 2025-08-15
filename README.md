THIS REPO IS A WORK IN PROGRESS

<!-- ![logo](logo.svg) -->

# Pkl - a language grammar for [highlight.js](https://highlightjs.org/)

<!-- ![version](https://badgen.net/npm/v/highlightjs-pkl) ![license](https://badgen.net/badge/license/MIT/blue)
![install size](https://badgen.net/packagephobia/install/highlightjs-pkl) ![minified size](https://badgen.net/bundlephobia/min/highlightjs-pkl) -->

Pkl is a configuration language that enables you to define your configuration as code.

## Usage

Simply include the Highlight.js library in your webpage or Node app, then load this module.

### Static website or simple usage

Simply load the module after loading Highlight.js. You'll use the minified version found in the `dist` directory. This module is just a CDN build of the language, so it will register itself as the Javascript is loaded.

```html
<script type="text/javascript" src="/path/to/highlight.min.js"></script>
<script type="text/javascript" charset="UTF-8"
  src="/path/to/highlightjs-pkl/dist/pkl.min.js"></script>
<script type="text/javascript">
  hljs.highlightAll();
</script>
```

<!-- ### Using directly from the UNPKG CDN

```html
<script type="text/javascript"
  src="https://unpkg.com/highlightjs-pkl/dist/pkl.min.js"></script>
```

- More info: <https://unpkg.com> -->

<!-- ### With Node or another build system

If you're using Node / Webpack / Rollup / Browserify, etc, simply require the language module, then register it with Highlight.js.

```javascript
var hljs = require('highlight.js');
var hljsPkl = require('highlightjs-pkl');

hljs.registerLanguage("pkl", hljsPkl);
hljs.highlightAll();
``` -->

## License

Highlight.js is released under the MIT License. See [LICENSE](LICENSE) file
for details.

### Author

Betsalel Williamson

### Maintainer

Betsalel Williamson

## Links

- The official site for the Highlight.js library is <https://highlightjs.org/>.
- The Highlight.js GitHub project: <https://github.com/highlightjs/highlight.js>
- Learn more about Pkl: <https://pkl-lang.org/>
