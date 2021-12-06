import { FC, useState } from 'react';
import { useHistory } from 'react-router';
import { Routes } from '~/constants';
import { IItem } from '~/services/getUserItems';
import { OPTIONS, wrongEmails } from '~/utils';
import logout from '~/services/logout';

import './header-style.scss';

interface IHeader {
  items: Array<IItem>;
  username: string;
}

const Header: FC<IHeader> = ({ items, username }) => {
  const [error, setError] = useState('');
  const { push } = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
      push(Routes.Login);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className='header'>
      <div className='user-section'>
        <button onClick={handleLogout}>{`Logout ${username}`}</button>
      </div>
      <h1>{`${wrongEmails(items, OPTIONS.ALL)} Emails are wrong`}</h1>
      <span>
        Email validator to protect your company from bad registrations
      </span>
    </div>
  );
};

export default Header;
