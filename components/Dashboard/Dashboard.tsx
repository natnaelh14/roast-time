import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';
import useSWR from 'swr';
import { coffeeShopsFetcher, getUrlForCoffeeShops, getListOfCoffeeStorePhotos } from '../../libs/coffee-shops';

const items = [
    {
        image: "saigon-cinnamon.jpg",
        title: "Saigon Ground Cassia Cinnamon"
    },
    {
        image: "vulcan-salt.jpg",
        title: "Vulcan's Fire Salt"
    },
    {
        image: "chili-powder.jpg",
        title: "Medium Chili Powder"
    },
    {
        image: "anise-seeds.jpg",
        title: "Ground Anise Seeds"
    }
];

interface ItemProps {
    title: string,
    image: string
}

const Dashboard = () => {
    const latLong = "43.653833032607096%2C-79.37896808855945";
    const limit = 12;

    const { data: coffeeShopsData, error } = useSWR(getUrlForCoffeeShops(latLong, limit), coffeeShopsFetcher);
    console.log("COFFEE SHOPS", coffeeShopsData);
    const [coffeeShopsPhotos, setCoffeeShopsPhotos] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const photos = await getListOfCoffeeStorePhotos();
            console.log({ photos })
            setCoffeeShopsPhotos(photos)
        }
        fetchData()
    }, [])

    if (!coffeeShopsData || error) return null

    return (
        <div className="flex flex-wrap justify-center">
            {coffeeShopsData.map((item: any, i: number) => {
                return <Item key={i} title={item.name} image={coffeeShopsPhotos[i]} />
            })}
        </div>
    )
}

export default Dashboard;
