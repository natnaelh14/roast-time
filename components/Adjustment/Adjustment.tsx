import FilterCoffeeShops from '../FilterCoffeeShops/FilterCoffeeShops';
import Location from 'components/Location/Location';
import React from 'react';

const Adjustment = () => {
  return (
    <div className="h-[75px] border-b-2 border-gray-200 dark:border-gray-secondary">
      <div className="flex flex-row items-center">
        <Location />
        <FilterCoffeeShops />
      </div>
    </div>
  );
};

export default Adjustment;
