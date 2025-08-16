import { toRegExp } from 'oniguruma-to-es';

export function convertRegex(tmRegex: string): string {
  // Use oniguruma-to-es to convert the regex.
  // This library handles TextMate-specific features like (?x:), \A, \Z, \G, \#, etc.
  // We specify a target ECMAScript version for compatibility.
  const convertedRegExp = toRegExp(tmRegex, { target: 'ES2018' }); // ES2018 for lookbehind support

  // Return the source string of the converted RegExp object.
  return convertedRegExp.source;
}
