import { itemHasWrongEmail } from '.';
import { array } from './testArray';

test('Check if array item has a wrong email format', () => {
  expect(
    array.filter((item) => (itemHasWrongEmail(item) ? null : item))
  ).toEqual([array[0], array[2], array[8], array[9]]);

  expect(
    array.filter((item) => (itemHasWrongEmail(item) ? null : item))
  ).not.toEqual(array);
});
