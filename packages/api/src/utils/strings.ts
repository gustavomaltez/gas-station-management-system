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