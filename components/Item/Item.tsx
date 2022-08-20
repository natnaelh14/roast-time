import React from 'react';
import Image from 'next/image';

interface ItemProps {
    title: string,
    image: string
    location: string,
    categories: {
        name: string
    }[]
}

const Item = ({ title, image, location, categories }: ItemProps) => {
    return (
        <div className="m-8 w-[250px]">
            <Image alt='shopping-item' src={image} width={250} height={200} />
            <p className='text-md font-extrabold'>{title}</p>
            <p className='text-sm text-gray-500'>{categories[0]?.name}{" "}{" "}{categories[1]?.name && <span>&#8226;</span>}{" "}{categories[1]?.name && categories[1]?.name}</p>
            <p className='text-sm text-gray-500'>{location}</p>
            <button type='submit' className='bg-orange-light hover:bg-orange-primary py-2 px-4 mt-2 rounded-lg w-full'>Reserve</button>
        </div>
    )
}

export default Item;
