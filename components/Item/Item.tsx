import { Rating } from 'components/Rating';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ItemProps {
  id: number;
  restaurantName: string;
  restaurantImage: string;
  restaurantStreetName: string;
  restaurantCity: string;
  restaurantState: string;
  restaurantZipCode: string;
  category: string;
}

const Item = ({
  id,
  restaurantName,
  restaurantImage,
  restaurantStreetName,
  restaurantCity,
  restaurantState,
  restaurantZipCode,
  category,
}: ItemProps) => {
  return (
    <div>
      {restaurantImage && (
        <Link href={`/restaurant/${id}`}>
          <div className="m-8 w-[250px] rounded border border-gray-200 shadow-lg transition delay-150 ease-in-out hover:scale-105 hover:cursor-pointer dark:border-gray-secondary">
            <Image
              alt="shopping-item"
              src={restaurantImage}
              width={250}
              height={200}
            />
            <div className="m-2">
              <p className="text-md font-extrabold dark:text-white">
                {restaurantName}
              </p>
              <Rating />
              {/* <p className='text-sm text-gray-500'>{categories[0]?.name}{" "}{" "}{categories[1]?.name && <span>&#8226;</span>}{" "}{categories[1]?.name && categories[1]?.name}</p> */}
              <p className="text-sm text-gray-500">{category}</p>
              <p className="text-sm text-gray-500">{`${restaurantStreetName}, ${restaurantCity} ${restaurantState} ${restaurantZipCode}`}</p>
              <button
                type="submit"
                className="right-0-0 relative bottom-0 mt-3 w-full rounded bg-pink-primary py-2 px-4 hover:bg-orange-primary"
              >
                Reserve
              </button>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Item;
