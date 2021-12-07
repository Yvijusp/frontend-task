import { SyntheticEvent, useEffect, useState } from 'react';
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
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const validate = (username, password) => {
    let usernameError = '';
    let passwordError = '';

    if (!username) {
      usernameError = 'Username is required';
    }

    if (!password) {
      passwordError = 'Password is required';
    } else if (password.length < 5) {
      passwordError = 'Password has to be longer than 5 characters';
    }

    if (usernameError || passwordError) {
      setUsernameError(usernameError);
      setPasswordError(passwordError);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!validate(username, password)) return;

    try {
      await login(username, password);
      setIsLoading(true);
      push(Routes.Users);
      setIsLoading(false);
    } catch (error) {
      setUsernameError('');
      setPasswordError('');
      setErrorMessage('Username or Password was incorrect');
    }
  };

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

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
        {usernameError && <p>{usernameError}</p>}
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder='Password'
          type='password'
          className='input mt-24px'
        />
        {passwordError && <p>{passwordError}</p>}

        <ErrorBlock error={errorMessage} />
        <button type='submit' className='button mt-24px'>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
