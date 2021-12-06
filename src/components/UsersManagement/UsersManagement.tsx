import List from './components/List/List';
import useItemsProvider from './useItemsProvider';
import ErrorBlock from '../ErrorBlock';
import Filter from './components/Filter/Filter';
import LoadingScreen from '../LoadingScreen';
import Header from './components/Header/Header';
import { Route, Switch } from 'react-router-dom';
import { Routes } from '~/constants';
import { useUserContext } from '../UserContext';
import {
  itemHasOldEmail,
  itemHasReusedEmail,
  itemHasWrongEmail,
} from '~/utils';

const UsersManagement = () => {
  const {
    errorMessage: userProviderErrorMessage,
    isLoading: userDataIsLoading,
    username,
  } = useUserContext();

  const { items, isLoading, errorMessage, setIsLoading } = useItemsProvider();

  if (isLoading || userDataIsLoading) {
    return <LoadingScreen />;
  }

  if (userProviderErrorMessage || errorMessage) {
    return <ErrorBlock error={userProviderErrorMessage || errorMessage} />;
  }

  return (
    <div className='container'>
      <Header items={items} username={username} />
      <Filter items={items} />
      <Switch>
        <Route exact path={Routes.Users}>
          <List items={items} itemLoading={setIsLoading} />
        </Route>
        <Route path={Routes.Wrong}>
          <List
            items={items.filter((item) =>
              itemHasWrongEmail(item) ? null : item
            )}
            itemLoading={setIsLoading}
          />
        </Route>
        <Route path={Routes.Reused}>
          <List
            items={items.filter((item) => itemHasReusedEmail(item, items))}
            itemLoading={setIsLoading}
          />
        </Route>
        <Route path={Routes.Old}>
          <List items={itemHasOldEmail(items)} itemLoading={setIsLoading} />
        </Route>
      </Switch>
    </div>
  );
};

export default UsersManagement;
