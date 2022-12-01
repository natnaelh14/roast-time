import { Rating } from 'components/Rating';
import { Restaurant } from 'types';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Item = ({ id, name, imageData, address, category }: Restaurant) => {
  return (
    <div>
      {imageData && (
        <Link href={`/restaurant/${id}`}>
          <div className="m-8 w-[250px] rounded-lg border border-gray-200 p-1 shadow-lg transition delay-150 ease-in-out hover:scale-105 hover:cursor-pointer dark:border-gray-secondary">
            <Image
              alt="shopping-item"
              src={imageData[0]}
              width={250}
              height={200}
            />
            <div className="m-2">
              <p className="text-md font-extrabold dark:text-white">{name}</p>
              <Rating />
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {category}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">{`${address}`}</p>
              <button
                type="submit"
                className="right-0-0 relative bottom-0 mt-3 w-full rounded bg-pink-primary py-2 px-4 hover:bg-orange-primary">
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
