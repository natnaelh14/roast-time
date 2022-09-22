import { Rating } from 'components/Rating';
import React from 'react';
import useSWR from 'swr';
import { coffeeShopsFetcher, getUrlForCoffeeShops } from '../../libs/coffee-shops';
import { useRouter } from "next/router";

interface CoffeeShopProps {
    id: string,
    title: string,
    categories: {
        name: string
    }[],
    location: string,
    image: string
}

export const Overview = () => {
    const latLong = "38.994373%2C-77.029778";
    const limit = 10;
    const router = useRouter();
    const id = router.query.id;
    const { data: coffeeShopsData, error } = useSWR(getUrlForCoffeeShops(latLong, limit), coffeeShopsFetcher);
    const findCoffeeStoreById = coffeeShopsData && coffeeShopsData.find((coffeeShop: CoffeeShopProps) => { return coffeeShop.id === id });
    return (
        <>
            {findCoffeeStoreById && (
                <div className='my-5'>
                    <p className='text-5xl'>{findCoffeeStoreById?.title}</p>
                    <div className='flex flex-row mt-2'>
                        <Rating />
                        <p className='ml-4 text-sm text-gray-500'>{findCoffeeStoreById?.categories[0]?.name}{" "}{" "}{findCoffeeStoreById?.categories[1]?.name && <span>&#8226;</span>}{" "}{findCoffeeStoreById?.categories[1]?.name && findCoffeeStoreById?.categories[1]?.name}</p>
                    </div>
                    <p className='m-2 text-gray-500 leading-relaxed'>{findCoffeeStoreById?.location}</p>
                    <p className='m-2 text-gray-500 leading-relaxed'>Located in the heart of Washington, D.C., steps from the National Mall, and across from Pershing Park, a national park home to the new World War 1 Memorial, Café du Parc is reminiscent of a Parisian-inspired sidewalk café.</p>
                    <p className='m-2 text-gray-500 leading-relaxed'>Paying homage to traditional French cooking, the restaurant offers diners various culinary creations from coffee and pastries at its coffee shop, Le Café, to breakfast, lunch, dinner, and brunch on Sunday on its outside terrace or inside the main dining room.</p>
                </div>
            )}
        </>
    )
}
