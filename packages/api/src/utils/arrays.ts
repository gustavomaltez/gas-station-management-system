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