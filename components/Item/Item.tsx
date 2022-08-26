import React from 'react';
import Image from 'next/image';
import Ratings from '../Ratings/Ratings';
import Link from 'next/link';
interface ItemProps {
    id: string,
    title: string,
    image: string
    location: string,
    categories: {
        name: string
    }[]
}

const Item = ({ id, title, image, location, categories }: ItemProps) => {
    return (
        <div>
            <Link href={`/restaurant/${id}`}>
                <div className="m-8 border w-[250px] border-gray-200 shadow-lg rounded hover:cursor-pointer hover:scale-105 transition ease-in-out delay-150">
                    <Image alt='shopping-item' src={image} width={250} height={200} />
                    <div className='m-2'>
                        <p className='text-md font-extrabold'>{title}</p>
                        <Ratings />
                        <p className='text-sm text-gray-500'>{categories[0]?.name}{" "}{" "}{categories[1]?.name && <span>&#8226;</span>}{" "}{categories[1]?.name && categories[1]?.name}</p>
                        <p className='text-sm text-gray-500'>{location}</p>
                        <button type='submit' className='bg-pink-primary hover:bg-orange-primary py-2 px-4 rounded w-full mt-3 relative right-0-0 bottom-0'>Reserve</button>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Item;
