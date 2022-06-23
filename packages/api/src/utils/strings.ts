/**
 * Validates if a value is a valid string or not
 * 
 * - Note: The values considered as valid strings are only non empty strings
 * 
 * @example
 * isValidString(null); // False
 * isValidString(""); // False
 * isValidString("  "); // False
 * isValidString("example"); // True
 * 
 * @param value The value to check if is a valid string
 * @returns Whether the provided value is a valid string or not
 */
export function isValidString(value: unknown) {
  const isString = typeof value === 'string';
  if (!isString) return false;
  const isNonNull = value.trim().length > 0;
  return isNonNull;
}

/**
 * Given an array of strings, concatenates all values into a single string.
 * 
 * @example
 * concatenateStrings(['foo', 'bar', 'baz']) // 'foo, bar and baz'
 * concatenateStrings(['foo', bar]) // 'foo and bar'
 * concatenateStrings(['foo']) // 'foo'
 * concatenateStrings([]) // ''
 * 
 * @param strings The list of strings to be concatenated.
 * @returns A single string with all the values concatenated.
 */
export function concatenateAndFormatStrings(strings: string[]) {
  if (strings.length === 0) return '';
  if (strings.length === 1) return strings[0];
  const lastString = strings.pop();
  const formattedStrings = strings.join(', ');
  return `${formattedStrings} and ${lastString}`;
}