import { IItem } from '~/services/getUserItems';

export const itemHasOldEmail = (itemList: Array<IItem>) => {
  const oldItem = itemList.filter((item) => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    const dateString = date.toISOString();

    if (item.createdAt <= dateString) {
      return { ...item };
    }
  });

  return oldItem;
};
