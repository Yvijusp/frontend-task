import { employees } from '../data';

let items = [];

export const updateItem = (item) => {
  if (!items.some(({ id }) => id === item.id)) return items.push(item);

  items = items.map((i) => {
    if (i.id === item.id) {
      return (i = item);
    }
    return i;
  });
};

export const getItems = () => {
  return employees.map((userItem) => {
    const updatedItem = items.find(({ id }) => id === userItem.id);

    return { ...(updatedItem || userItem) };
  });
};
