import { FC, useState } from 'react';
import Modal from 'react-modal';
import { IItem } from '~/services/getUserItems';
import updateItem from '../../../../services/updateItem';

interface IUpdateModal {
  item: IItem;
  itemLoading: (loading) => void;
}

export const UpdateModal: FC<IUpdateModal> = ({ item, itemLoading }) => {
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
