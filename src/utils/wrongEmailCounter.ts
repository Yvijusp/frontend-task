import { IItem } from '~/services/getUserItems';
import { itemHasOldEmail, itemHasReusedEmail, itemHasWrongEmail } from '.';

export enum OPTIONS {
  WRONG = 'wrong',
  REUSED = 'reused',
  OLD = 'old',
  ALL = 'all',
}

export const wrongEmails = (items: Array<IItem>, option) => {
  switch (option) {
    case OPTIONS.WRONG:
      return items.filter((item) => (itemHasWrongEmail(item) ? null : item))
        .length;
    case OPTIONS.REUSED:
      return items.filter((item) => itemHasReusedEmail(item, items)).length;
    case OPTIONS.OLD:
      return itemHasOldEmail(items).length;
    case OPTIONS.ALL:
      return (
        items.filter((item) => (itemHasWrongEmail(item) ? null : item)).length +
        items.filter((item) => itemHasReusedEmail(item, items)).length +
        itemHasOldEmail(items).length
      );
    default:
      return null;
  }
};
