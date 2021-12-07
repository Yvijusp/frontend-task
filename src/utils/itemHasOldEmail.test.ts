import { itemHasOldEmail } from '.';
import { array } from './testArray';

test('Check if item array has an item that is older than 30 days', () => {
  expect(itemHasOldEmail(array)).toEqual([array[1]]);
  expect(itemHasOldEmail(array)).not.toBe(array);
});
