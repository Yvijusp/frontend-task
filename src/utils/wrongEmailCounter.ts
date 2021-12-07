import { FILTER_OPTIONS } from '~/constants';
import { IItem } from '~/services/getUserItems';
import { itemHasOldEmail, itemHasReusedEmail, itemHasWrongEmail } from '.';

export const wrongEmails = (items: Array<IItem>, option) => {
  switch (option) {
    case FILTER_OPTIONS.WRONG:
      return items.filter((item) => (itemHasWrongEmail(item) ? null : item))
        .length;
    case FILTER_OPTIONS.REUSED:
      return items.filter((item) => itemHasReusedEmail(item, items)).length;
    case FILTER_OPTIONS.OLD:
      return itemHasOldEmail(items).length;
    case FILTER_OPTIONS.ALL:
      return (
        items.filter((item) => (itemHasWrongEmail(item) ? null : item)).length +
        items.filter((item) => itemHasReusedEmail(item, items)).length +
        itemHasOldEmail(items).length
      );
    default:
      return null;
  }
};
