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

  const routes = [
    {
      path: Routes.Users,
      items: items,
      itemLoading: setIsLoading,
    },
    {
      path: Routes.Wrong,
      items: items.filter((item) => (itemHasWrongEmail(item) ? null : item)),
      itemLoading: setIsLoading,
    },
    {
      path: Routes.Reused,
      items: items.filter((item) => itemHasReusedEmail(item, items)),
      itemLoading: setIsLoading,
    },
    {
      path: Routes.Old,
      items: itemHasOldEmail(items),
      itemLoading: setIsLoading,
    },
  ];

  return (
    <div className='container'>
      <Header items={items} username={username} />
      <Filter items={items} />
      <Switch>
        {routes.map(({ path, items, itemLoading }, index) => {
          if (index === 0) {
            return (
              <Route key={index} exact path={path}>
                <List items={items} itemLoading={itemLoading} />
              </Route>
            );
          }
          return (
            <Route key={index} path={path}>
              <List items={items} itemLoading={itemLoading} />
            </Route>
          );
        })}
      </Switch>
    </div>
  );
};

export default UsersManagement;
