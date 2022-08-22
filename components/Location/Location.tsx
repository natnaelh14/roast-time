import React from 'react';
import LocationSVG from './LocationSVG';

const Location = () => {
    return (
        <div className="flex flex-row mt-6 hover:cursor-pointer">
            <LocationSVG />
            <p className="hover:underline decoration-pink-primary decoration-2 underline-offset-8">Coffee shops near you</p>
        </div>
    )
}

export default Location;
