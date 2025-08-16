"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertRegex = convertRegex;
const oniguruma_to_es_1 = require("oniguruma-to-es");
function convertRegex(tmRegex) {
    // Use oniguruma-to-es to convert the regex.
    // This library handles TextMate-specific features like (?x:), \A, \Z, \G, \#, etc.
    // We specify a target ECMAScript version for compatibility.
    const convertedRegExp = (0, oniguruma_to_es_1.toRegExp)(tmRegex, { target: 'ES2018' }); // ES2018 for lookbehind support
    // Return the source string of the converted RegExp object.
    return convertedRegExp.source;
}
