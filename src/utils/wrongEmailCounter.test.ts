import { wrongEmails } from '.';
import { array } from './testArray';

test('How many wrong emails there are in total', () => {
  expect(wrongEmails(array, 'all')).toBe(7);
});

test('How many wrong format email there are', () => {
  expect(wrongEmails(array, 'wrong')).toBe(4);
});

test('How many reused emails there are', () => {
  expect(wrongEmails(array, 'reused')).toBe(2);
});

test('How many old emails there are', () => {
  expect(wrongEmails(array, 'old')).toBe(1);
});
