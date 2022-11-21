import {
  coffeeShopsFetcher,
  getUrlForCoffeeShops,
} from '../../libs/coffee-shops';
import { Rating } from 'components/Rating';
import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

interface CoffeeShopProps {
  id: number;
  restaurantName: string;
  restaurantImage: string;
  restaurantStreetName: string;
  restaurantCity: string;
  restaurantState: string;
  restaurantZipCode: string;
  category: string;
}

export const Overview = () => {
  const latLong = '38.994373%2C-77.029778';
  const limit = 10;
  const router = useRouter();
  const { id } = router.query;
  const { data: coffeeShopsData, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/restaurant/${id}`,
  );
  return (
    <>
      {coffeeShopsData && (
        <div className="my-5">
          <p className="text-5xl dark:text-white">{coffeeShopsData.name}</p>
          <div className="mt-2 flex flex-row">
            <Rating />
            {/* <p className='ml-4 text-sm text-gray-500'>{findCoffeeStoreById?.categories[0]?.name}{" "}{" "}{findCoffeeStoreById?.categories[1]?.name && <span>&#8226;</span>}{" "}{findCoffeeStoreById?.categories[1]?.name && findCoffeeStoreById?.categories[1]?.name}</p> */}
            <p className="ml-4 text-sm text-gray-500">
              {coffeeShopsData.category}
            </p>
          </div>
          <p className="m-2 leading-relaxed text-gray-500">{`${coffeeShopsData.address}, ${coffeeShopsData.city} ${coffeeShopsData.state} ${coffeeShopsData.zipCode}`}</p>
          <p className="m-2 leading-relaxed text-gray-500">
            Located in the heart of Washington, D.C., steps from the National
            Mall, and across from Pershing Park, a national park home to the new
            World War 1 Memorial, Café du Parc is reminiscent of a
            Parisian-inspired sidewalk café.
          </p>
          <p className="m-2 leading-relaxed text-gray-500">
            Paying homage to traditional French cooking, the restaurant offers
            diners various culinary creations from coffee and pastries at its
            coffee shop, Le Café, to breakfast, lunch, dinner, and brunch on
            Sunday on its outside terrace or inside the main dining room.
          </p>
        </div>
      )}
    </>
  );
};
