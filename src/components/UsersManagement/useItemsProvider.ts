import { useEffect, useState } from 'react';
import getUserItems, { IItem } from '../../services/getUserItems';

const userItemsProvider = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<String>();
  const [items, setItems] = useState<Array<IItem>>([]);

  useEffect(() => {
    (async () => {
      try {
        if (!isLoading) return;
        const userItems = await getUserItems();

        setItems(userItems);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage(error.message);
      }
    })();
  }, [isLoading]);

  return {
    isLoading,
    errorMessage,
    items,
    setIsLoading,
  };
};

export default userItemsProvider;
