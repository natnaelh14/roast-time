import { Restaurant } from 'types';
import {
  createContext,
  ReactNode,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import useSWR from 'swr';

interface RestaurantSessionContextState {
  restaurantsData?: { restaurants: Restaurant[]; totalCount: number };
  error: string;
  restaurantSearch: string;
  setRestaurantSearch: Dispatch<SetStateAction<string>>;
  pageCount: number;
  setPageCount: Dispatch<SetStateAction<number>>;
}

const RestaurantContext = createContext({} as RestaurantSessionContextState);
const RestaurantContextProvider = ({ children }: { children: ReactNode }) => {
  const [restaurantSearch, setRestaurantSearch] = useState<string>('');
  const [pageCount, setPageCount] = useState<number>(1);
  const { data: restaurantsData, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/restaurants/${pageCount}/${restaurantSearch}`,
  );
  const value = {
    restaurantsData,
    error,
    restaurantSearch,
    setRestaurantSearch,
    pageCount,
    setPageCount,
  };
  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};

const useRestaurantContext = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('Unable to set user session');
  }
  return context;
};

export { RestaurantContextProvider, useRestaurantContext };
