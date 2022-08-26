import Ratings from '../Ratings/Ratings';
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

const Overview = () => {
    const latLong = "38.994373%2C-77.029778";
    const limit = 10;
    const router = useRouter();
    const id = router.query.id;
    const { data: coffeeShopsData, error } = useSWR(getUrlForCoffeeShops(latLong, limit), coffeeShopsFetcher);
    const findCoffeeStoreById = coffeeShopsData && coffeeShopsData.find((coffeeShop: CoffeeShopProps) => { return coffeeShop.id === id });
    return (
        <div className='my-5'>
            <p className='text-5xl'>{findCoffeeStoreById?.title}</p>
            <div className='flex flex-row mt-2'>
                <Ratings />
                <p className='ml-4 text-sm text-gray-500'>{findCoffeeStoreById?.categories[0]?.name}{" "}{" "}{findCoffeeStoreById?.categories[1]?.name && <span>&#8226;</span>}{" "}{findCoffeeStoreById?.categories[1]?.name && findCoffeeStoreById?.categories[1]?.name}</p>
            </div>
            <p className='my-2'>{findCoffeeStoreById?.location}</p>
        </div>
    )
}

export default Overview
