import React from 'react';

const RestaurantsEmptyState = () => {
  return (
    <div className="flex h-128 items-center justify-center">
      <p className="text:black text-5xl dark:text-gray-300">
        No restaurants found.
      </p>
    </div>
  );
};

export default RestaurantsEmptyState;
