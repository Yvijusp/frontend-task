import { FC } from 'react';
import { IItem } from '~/services/getUserItems';
import { UpdateModal } from '../UpdateModal/UpdateModal';
import ItemIcon from './components/ItemIcon';

import './list-style.scss';

interface IList {
  items: Array<IItem>;
  itemLoading: (loading) => void;
}

const List: FC<IList> = ({ items, itemLoading }) => (
  <ul className='list'>
    {items.map((item) => (
      <li className='item' key={item.id}>
        <ItemIcon name={item.name} />
        <div>
          <div className='title'>{item.name}</div>
          <div className='description'>{item.email}</div>
        </div>
        <UpdateModal item={item} itemLoading={itemLoading} />
      </li>
    ))}
  </ul>
);

export default List;
