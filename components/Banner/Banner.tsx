import React from 'react';
import SearchBar from 'components/SearchBar/SearchBar';

const Banner = () => {
    return (
        <div className="text-3xl md:text-4xl lg:text-5xl font-black h-[300px] banner flex flex-col justify-center items-center text-center">
            <p>Lets find you the best coffee shop</p>
            <SearchBar />
        </div>
    )
}

export default Banner
