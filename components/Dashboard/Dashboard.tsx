import Item from '../Item/Item';
import { getListOfCoffeeStorePhotos } from '../../libs/coffee-shops';
import { ThreeDotsLoading, DashboardLoading } from '../Loaders';
import { useRestaurantContext } from 'contexts/RestaurantsContext';
import RestaurantsEmptyState from 'components/EmptyState/RestaurantsEmptyState';
import { Restaurant } from 'types';
import React, { useEffect } from 'react';

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
        restaurants.map((item: Restaurant) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              imageData={item.imageData}
              address={item.address}
              category={item.category}
            />
          );
        })}
    </div>
  );
};

export default Dashboard;
