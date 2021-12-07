import { itemHasReusedEmail } from '.';
import { array } from './testArray';

test('How many repeating email there are in array', () => {
  expect(array.filter((item) => itemHasReusedEmail(item, array))).toEqual([
    array[0],
    array[2],
  ]);
});
