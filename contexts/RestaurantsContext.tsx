import { Restaurant } from 'types';
import { createContext, ReactNode, useState, useContext } from 'react';
import useSWR from 'swr';

interface RestaurantSessionContextState {
  restaurants?: Restaurant[];
  error: string;
  // setRestaurants?: (restaurants: Restaurant) => void;
  restaurantSearch?: string;
  setRestaurantSearch: (search: string) => void;
}

const RestaurantContext = createContext({} as RestaurantSessionContextState);
const RestaurantContextProvider = ({ children }: { children: ReactNode }) => {
  // const [restaurants, setRestaurants] = useState<Restaurant[]>();
  const [restaurantSearch, setRestaurantSearch] = useState<string>();
  const { data: restaurants, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/restaurants/${restaurantSearch || ''}`,
  );
  const value = {
    restaurants,
    error,
    // setRestaurants,
    restaurantSearch,
    setRestaurantSearch,
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
