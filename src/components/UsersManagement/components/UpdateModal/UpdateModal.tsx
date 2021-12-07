import React, { FC, FormEvent, useState } from 'react';
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateItem({
      ...item,
      email: newEmail,
    });

    itemLoading(true);
  };

  return (
    <>
      <button className='update' onClick={() => setShowModal(true)}>
        Update Email
      </button>
      <Modal
        className='modal'
        isOpen={showModal}
        ariaHideApp={false}
        onRequestClose={() => setShowModal(false)}
        contentLabel='Example Modal'
      >
        <h1>Update Email</h1>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <input
            placeholder='new password'
            className='input'
            value={newEmail}
            onChange={(event) => setNewEmail(event.target.value)}
          />
          <div className='pt-12px text-center'>
            <button className='button' type='submit'>
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
        </form>
      </Modal>
    </>
  );
};
