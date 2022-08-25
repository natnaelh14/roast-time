import React from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import { coffeeShopsFetcher, getUrlForCoffeeShops } from '../../libs/coffee-shops';
import { useRouter } from "next/router";
import Ratings from '../../components/Ratings/Ratings';
import Reservation from '../../components/Reservation/Reservation';

interface CoffeeShopProps {
    id: string,
    title: string,
    categories: {
        name: string
    }[],
    location: string,
    image: string
}

const Restaurants = () => {
    const latLong = "43.653833032607096%2C-79.37896808855945";
    const limit = 10;
    const router = useRouter();
    const id = router.query.id;
    const { data: coffeeShopsData, error } = useSWR(getUrlForCoffeeShops(latLong, limit), coffeeShopsFetcher);
    const findCoffeeStoreById = coffeeShopsData && coffeeShopsData.find((coffeeShop: CoffeeShopProps) => { return coffeeShop.id === id });

    return (
        <div className='my-10'>
            <div className='flex flex-wrap justify-center'>
                <Image alt='shopping-item' src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMTF8MHwxfHNlYXJjaHwyfHxjb2ZmZWUlMjBzaG9wfGVufDB8fHx8MTY2MTQ0ODA4Ng&ixlib=rb-1.2.1&q=80&w=400" width={250} height={200} />
                <Image alt='shopping-item' src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMTF8MHwxfHNlYXJjaHwzfHxjb2ZmZWUlMjBzaG9wfGVufDB8fHx8MTY2MTQ0ODA4Ng&ixlib=rb-1.2.1&q=80&w=400" width={250} height={200} />
                <Image alt='shopping-item' src="https://images.unsplash.com/photo-1525193612562-0ec53b0e5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMTF8MHwxfHNlYXJjaHw0fHxjb2ZmZWUlMjBzaG9wfGVufDB8fHx8MTY2MTQ0ODA4Ng&ixlib=rb-1.2.1&q=80&w=400" width={250} height={200} />
                <Image alt='shopping-item' src="https://images.unsplash.com/photo-1511081692775-05d0f180a065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMTF8MHwxfHNlYXJjaHw3fHxjb2ZmZWUlMjBzaG9wfGVufDB8fHx8MTY2MTQ0ODA4Ng&ixlib=rb-1.2.1&q=80&w=400" width={250} height={200} />
            </div>
            <div className='flex flex-row justify-around my-5'>
                <div className=''>
                    <p className='text-5xl'>{findCoffeeStoreById?.title}</p>
                    <div className='flex flex-row mt-2'>
                        <Ratings />
                        <p className='ml-4 text-sm text-gray-500'>{findCoffeeStoreById?.categories[0]?.name}{" "}{" "}{findCoffeeStoreById?.categories[1]?.name && <span>&#8226;</span>}{" "}{findCoffeeStoreById?.categories[1]?.name && findCoffeeStoreById?.categories[1]?.name}</p>
                    </div>
                    <p className='my-2'>{findCoffeeStoreById?.location}</p>
                </div>
                <Reservation />
            </div>
        </div>
    )
}

export default Restaurants;