import React from 'react';
import Item from '../Item/Item';

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
    return (
        <div className="flex flex-wrap justify-center">
            {items.map((item: ItemProps , i) => {
                return <Item key={i} title={item.title} image={item.image} />
            })}
        </div>
    )
}

export default Dashboard;
