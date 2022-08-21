import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';
import useSWR from 'swr';
import { coffeeShopsFetcher, getUrlForCoffeeShops, getListOfCoffeeStorePhotos } from '../../libs/coffee-shops';
import DashboardLoading from '../Loading/DashboardLoading';

const Dashboard = () => {
    const latLong = "43.653833032607096%2C-79.37896808855945";
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
        <div className="flex flex-wrap justify-center">
            {coffeeShopsData.map((item: any, i: number) => {
                return <Item key={i} title={item.name} image={coffeeShopsPhotos[i]} location={item.location.formatted_address} categories={item.categories} />
            })}
        </div>
    )
}

export default Dashboard;
