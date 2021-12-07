import { FC } from 'react';
import { FILTER_OPTIONS, Routes } from '~/constants';
import { IItem } from '~/services/getUserItems';
import { wrongEmails } from '~/utils';
import FilterTab from './components/FilterTab';

import './filter-style.scss';

interface IFilter {
  items: Array<IItem>;
}

const Filter: FC<IFilter> = ({ items }) => {
  const wrongItemsCount = wrongEmails(items, FILTER_OPTIONS.WRONG);

  const reusedItemsCount = wrongEmails(items, FILTER_OPTIONS.REUSED);

  const oldItemsCount = wrongEmails(items, FILTER_OPTIONS.OLD);

  const filtersFields = [
    {
      title: 'All',
      count: items.length,
      path: Routes.Users,
    },
    {
      title: 'Wrong',
      count: wrongItemsCount,
      path: Routes.Wrong,
    },
    {
      title: 'Reused',
      count: reusedItemsCount,
      path: Routes.Reused,
    },
    {
      title: 'Old',
      count: oldItemsCount,
      path: Routes.Old,
    },
  ];

  return (
    <div className='filter'>
      {filtersFields.map(({ title, count, path }, index) => (
        <FilterTab key={index} title={title} count={count} path={path} />
      ))}
    </div>
  );
};

export default Filter;
