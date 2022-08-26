import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';
import useSWR from 'swr';
import { coffeeShopsFetcher, getUrlForCoffeeShops, getListOfCoffeeStorePhotos } from '../../libs/coffee-shops';
import DashboardLoading from '../Loaders/DashboardLoading';


interface CoffeeShopProps {
    id: string,
    title: string,
    categories: {
        name: string
    }[],
    location: string,
    image: string
}

const Dashboard = () => {
    const latLong = "38.994373%2C-77.029778";
    const limit = 10;

    const { data: coffeeShopsData, error } = useSWR(getUrlForCoffeeShops(latLong, limit), coffeeShopsFetcher);
    console.log("COFFEE SHOPS", coffeeShopsData);
    const [coffeeShopsPhotos, setCoffeeShopsPhotos] = useState<Array<string>>([])

    useEffect(() => {
        const fetchData = async () => {
            const photos = await getListOfCoffeeStorePhotos();
            console.log({ photos })
            setCoffeeShopsPhotos(photos)
        }
        fetchData()
    }, [])

    if (!coffeeShopsData && !error) return <DashboardLoading />

    return (
        <div className="flex flex-row overflow-x-scroll md:overflow-auto md:flex-wrap md:justify-center">
            {coffeeShopsData.map((item: CoffeeShopProps, i: number) => {
                return <Item key={item.id} id={item.id} title={item.title} image={coffeeShopsPhotos[i]} location={item.location} categories={item.categories} />
            })}
        </div>
    )
}

export default Dashboard;
