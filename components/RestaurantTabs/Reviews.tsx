import { Rating, RatingGraph } from 'components/Rating';
import React from 'react';

export const Reviews = () => {
  return (
    <div className="my-5 flex flex-col items-center lg:flex-row lg:justify-between">
      <div className="w-full">
        <h4 className="font-gray-secondary font-bold dark:text-white">
          Overall ratings and reviews
        </h4>
        <p className="text-gray-500">
          Reviews can only be made by diners who have eaten at this restaurant
        </p>
        <div className="row flex flex">
          <Rating />
          <p className="ml-2 text-gray-500">4.4 based on recent ratings</p>
        </div>
      </div>
      <RatingGraph />
    </div>
  );
};
