import { Rating } from 'components/Rating';
import { Restaurant } from 'types';
import { SaveIcon } from 'components/Icons';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Item = ({ id, name, imageData, address, category }: Restaurant) => {
  return (
    <div>
      {imageData && (
        <div className="m-8 w-[250px] rounded-lg border border-gray-200 p-1 shadow-lg transition delay-150 ease-in-out hover:scale-105 dark:border-gray-secondary">
          <Image
            alt="shopping-item"
            src={imageData[0]}
            width={250}
            height={200}
          />
          <div className="m-2">
            <div className="flex flex-row items-center justify-between">
              <p className="text-md font-extrabold dark:text-white">{name}</p>
              <SaveIcon restaurantId={id} />
            </div>
            <Rating />
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {category}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">{`${address}`}</p>
            <Link href={`/restaurant/${id}`}>
              <a href="hover:cursor-pointer">
                <button
                  type="submit"
                  className="right-0-0 relative bottom-0 mt-3 w-full rounded bg-pink-primary py-2 px-4 hover:bg-orange-primary">
                  Reserve
                </button>
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
