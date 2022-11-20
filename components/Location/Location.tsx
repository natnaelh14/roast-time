import LocationSVG from './LocationSVG';
import React from 'react';

const Location = () => {
  return (
    <div className="mt-6 flex flex-row hover:cursor-pointer">
      <LocationSVG />
      <p className="text-md decoration-pink-primary decoration-2 underline-offset-8 hover:underline dark:text-white lg:text-lg">
        Coffee shops near you
      </p>
    </div>
  );
};

export default Location;
