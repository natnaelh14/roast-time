import React, { useEffect } from 'react';
import Item from '../Item/Item';
import useSWR from 'swr';
import { getListOfCoffeeStorePhotos } from '../../libs/coffee-shops';
import DashboardLoading from '../Loaders/DashboardLoading';

interface CoffeeShopProps {
    id: number,
    restaurant_name: string,
    // categories: {
    //     name: string
    // }[],
    category: string,
    restaurant_street_name: string,
    restaurant_city: string,
    restaurant_state: string,
    restaurant_zip_code: string,
    restaurant_image_url: string
}

const Dashboard = () => {
    // const latLong = "38.994373%2C-77.029778";
    // const limit = 10;

    // const { data: coffeeShopsData, error } = useSWR(getUrlForCoffeeShops(latLong, limit), coffeeShopsFetcher);
    const { data: coffeeShopsData, error } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/restaurants`)

    useEffect(() => {
        const fetchData = async () => {
            const photos = await getListOfCoffeeStorePhotos();
            console.log({ photos })
        }
        fetchData()
    }, [])

    if (!coffeeShopsData && !error) return <DashboardLoading />
    if (error) return <DashboardLoading />

    return (
        <div className="flex flex-row overflow-x-scroll md:overflow-auto md:flex-wrap md:justify-center mt-5">
            { }
            {coffeeShopsData.map((item: CoffeeShopProps) => {
                return <Item key={item.id} id={item.id} restaurantName={item.restaurant_name} restaurantImage={item.restaurant_image_url} restaurantStreetName={item.restaurant_street_name} restaurantCity={item.restaurant_city} restaurantState={item.restaurant_state} restaurantZipCode={item.restaurant_zip_code} category={'Cafe'} />
            })}
        </div>
    )
}

export default Dashboard;
