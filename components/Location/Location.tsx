import React from 'react';
import LocationSVG from './LocationSVG';

const Location = () => {
    return (
        <div className="flex flex-row mt-6 hover:cursor-pointer">
            <LocationSVG />
            <p className="hover:underline decoration-pink-primary decoration-2 underline-offset-8 text-md lg:text-lg dark:text-white">Coffee shops near you</p>
        </div>
    )
}

export default Location;
