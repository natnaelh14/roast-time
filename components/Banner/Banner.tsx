import SearchBar from 'components/SearchBar/SearchBar';
import React from 'react';

const Banner = () => {
  return (
    <div className="banner flex h-[200px] flex-col items-center justify-center text-center text-xl font-black sm:text-2xl md:h-[300px] md:text-4xl lg:text-5xl">
      <p className="m-3">Lets find you the best coffee shop</p>
      <SearchBar />
    </div>
  );
};

export default Banner;
