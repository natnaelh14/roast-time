import Item from '../Item/Item';
import { getListOfCoffeeStorePhotos } from '../../libs/coffee-shops';
import DashboardLoading from '../Loaders/DashboardLoading';
import useSWR from 'swr';
import React, { useEffect } from 'react';

interface CoffeeShopProps {
  id: number;
  name: string;
  category?: string;
  address: string;
  imageUrl?: string;
}

const Dashboard = () => {
  // const latLong = "38.994373%2C-77.029778";
  // const limit = 10;

  // const { data: coffeeShopsData, error } = useSWR(getUrlForCoffeeShops(latLong, limit), coffeeShopsFetcher);
  const { data: coffeeShopsData, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/restaurants`,
  );

  useEffect(() => {
    const fetchData = async () => {
      const photos = await getListOfCoffeeStorePhotos();
      console.log({ photos });
    };
    fetchData();
  }, []);

  if (!coffeeShopsData && !error) return <DashboardLoading />;
  if (error) return <DashboardLoading />;

  return (
    <div className="mt-5 flex flex-row overflow-x-scroll md:flex-wrap md:justify-center md:overflow-auto">
      {}
      {coffeeShopsData.map((item: CoffeeShopProps) => {
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
