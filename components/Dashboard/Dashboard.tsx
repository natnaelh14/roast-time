import Item from '../Item/Item';
import { getListOfCoffeeStorePhotos } from '../../libs/coffee-shops';
import { ThreeDotsLoading, DashboardLoading } from '../Loaders';
import { useRestaurantContext } from 'contexts/RestaurantsContext';
import RestaurantsEmptyState from 'components/EmptyState/RestaurantsEmptyState';
import React, { useEffect } from 'react';

interface CoffeeShopProps {
  id: number;
  name: string;
  category?: string;
  address: string;
  imageUrl?: string;
}

const Dashboard = () => {
  const { restaurants, error, restaurantSearch } = useRestaurantContext();

  useEffect(() => {
    const fetchData = async () => {
      const photos = await getListOfCoffeeStorePhotos();
      console.log({ photos });
    };
    fetchData();
  }, []);

  if (!restaurants && !error && !restaurantSearch?.length)
    return <DashboardLoading />;
  if (!restaurants && !error && restaurantSearch?.length)
    return <ThreeDotsLoading />;
  if (error) return <RestaurantsEmptyState />;

  return (
    <div className="mt-5 flex flex-row overflow-x-scroll md:flex-wrap md:justify-center md:overflow-auto">
      {restaurants &&
        restaurants.map((item: CoffeeShopProps) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              restaurantName={item.name}
              restaurantImage={item.imageUrl || ''}
              restaurantStreetName={item.address}
              category={item.category || ''}
            />
          );
        })}
    </div>
  );
};

export default Dashboard;
