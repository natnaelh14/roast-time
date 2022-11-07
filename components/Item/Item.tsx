import React from 'react';
import Image from 'next/image';
import { Rating } from 'components/Rating';
import Link from 'next/link';
interface ItemProps {
    id: number,
    restaurantName: string,
    restaurantImage: string,
    restaurantStreetName: string,
    restaurantCity: string,
    restaurantState: string,
    restaurantZipCode: string,
    category: string
}

const Item = ({ id,
    restaurantName,
    restaurantImage,
    restaurantStreetName,
    restaurantCity,
    restaurantState,
    restaurantZipCode,
    category }: ItemProps) => {
    return (
        <div>
            {restaurantImage && (
                <Link href={`/restaurant/${id}`}>
                    <div className="m-8 border w-[250px] border-gray-200 dark:border-gray-secondary shadow-lg rounded hover:cursor-pointer hover:scale-105 transition ease-in-out delay-150">
                        <Image alt='shopping-item' src={restaurantImage} width={250} height={200} />
                        <div className='m-2'>
                            <p className='text-md font-extrabold dark:text-white'>{restaurantName}</p>
                            <Rating />
                            {/* <p className='text-sm text-gray-500'>{categories[0]?.name}{" "}{" "}{categories[1]?.name && <span>&#8226;</span>}{" "}{categories[1]?.name && categories[1]?.name}</p> */}
                            <p className='text-sm text-gray-500'>{category}</p>
                            <p className='text-sm text-gray-500'>{`${restaurantStreetName}, ${restaurantCity} ${restaurantState} ${restaurantZipCode}`}</p>
                            <button type='submit' className='bg-pink-primary hover:bg-orange-primary py-2 px-4 rounded w-full mt-3 relative right-0-0 bottom-0'>Reserve</button>
                        </div>
                    </div>
                </Link>
            )}
        </div>
    )
}

export default Item;
