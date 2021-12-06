import { SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from '~/constants';
import login from '~/services/login';
import ErrorBlock from '../ErrorBlock';
import LoadingScreen from '../LoadingScreen';

import './login-style.scss';

const Login = () => {
  const { push } = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!username || !password)
      return setErrorMessage('Please enter your username and password');

    try {
      setIsLoading(true);
      await login(username, password);
      push(Routes.Users);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage('Username or Password was incorrect');
    }
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className='login-page'>
      <form className='login-form' onSubmit={handleSubmit}>
        <h1 className='text-center'>Mygom.tech</h1>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder='Username'
          type='text'
          className='input mt-52px'
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder='Password'
          type='password'
          className='input mt-24px'
        />
        <ErrorBlock error={errorMessage} />
        <button type='submit' className='button mt-24px'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
