import bcrypt from 'bcrypt';

/**
 * Generates a hash for a given string
 * 
 * @param string The string to be hashed.
 * @returns The hashed string.
 */
export function hashString(string: string): string {
  return bcrypt.hashSync(string, 10);
}

/**
 * Validates if a given string matches a given hash.
 * 
 * @param string The string to be compared.
 * @param hashedString The hashed string to be compared with.
 * @returns Whether the string is equal to the hashed string.
 */
export function hashedStringMatches(string: string, hashedString: string): boolean {
  return bcrypt.compareSync(string, hashedString);
}

/**
 * Retrieves a item or an array of items and returns a array of items.
 * 
 * - This function is usefull when you need to make sure you are working with an
 * data array, even if this array has only one item.
 * 
 * @param itemOrItems A single item or a array of items to convert to array.
 * @returns A array of provided items.
 */
export function toArray<Item extends unknown>(itemOrItems: Item | Item[]): Item[] {
  if (Array.isArray(itemOrItems)) return itemOrItems;
  return [itemOrItems];
}

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
  const isString = typeof value === "string";
  if (!isString) return false;
  const isNonNull = value.trim().length > 0;
  return isNonNull;
}