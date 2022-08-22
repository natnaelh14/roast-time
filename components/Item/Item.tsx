import React from 'react';
import Image from 'next/image';
import Ratings from '../Ratings/Ratings';
import { Transition } from '@headlessui/react';

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
        <>
            <Transition
                show={true}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="m-8 w-[250px] border border-gray-200 shadow-lg rounded hover:cursor-pointer">
                    <Image alt='shopping-item' src={image} width={250} height={200} />
                    <div className='m-2'>
                        <p className='text-md font-extrabold'>{title}</p>
                        <Ratings />
                        <p className='text-sm text-gray-500'>{categories[0]?.name}{" "}{" "}{categories[1]?.name && <span>&#8226;</span>}{" "}{categories[1]?.name && categories[1]?.name}</p>
                        <p className='text-sm text-gray-500'>{location}</p>
                        <button type='submit' className='bg-pink-primary hover:bg-orange-primary py-2 px-4 rounded w-full mt-3 relative right-0-0 bottom-0'>Reserve</button>
                    </div>
                </div>
            </Transition>
        </>

    )
}

export default Item;
