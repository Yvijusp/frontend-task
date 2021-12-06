import { FC, useState } from 'react';
import { IItem } from '~/services/getUserItems';
import ItemIcon from './components/ItemIcon';
import updateItem from '../../../../services/updateItem';
import Modal from 'react-modal';

import './list-style.scss';

interface IList {
  items: Array<IItem>;
  itemLoading: (loading) => void;
}

interface IUpdateModal {
  item: IItem;
  itemLoading: (loading) => void;
}

const UpdateModal: FC<IUpdateModal> = ({ item, itemLoading }) => {
  const [showModal, setShowModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  return (
    <>
      <button className='update' onClick={() => setShowModal(true)}>
        Update Password
      </button>
      <Modal
        className='modal'
        isOpen={showModal}
        ariaHideApp={false}
        onRequestClose={() => setShowModal(false)}
        contentLabel='Example Modal'
      >
        <h1>Update Password</h1>
        <input
          placeholder='new password'
          className='input'
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
        />
        <div className='pt-12px text-center'>
          <button
            className='button'
            onClick={async (e) => {
              e.preventDefault();
              await updateItem({
                ...item,
                email: newEmail,
              });

              itemLoading(true);
            }}
          >
            Change
          </button>
          <button
            className='button ml-12px'
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

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
