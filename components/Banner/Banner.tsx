import React from 'react';
import SearchBar from 'components/SearchBar/SearchBar';

const Banner = () => {
    return (
        <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black h-[200px] md:h-[300px] banner flex flex-col justify-center items-center text-center">
            <p className='m-3'>Lets find you the best coffee shop</p>
            <SearchBar />
        </div>
    )
}

export default Banner
