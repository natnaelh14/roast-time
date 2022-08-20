import React from 'react';
import FilterCoffeeShops from '../FilterCoffeeShops/FilterCoffeeShops';
import Location from 'components/Location/Location';

const Adjustment = () => {
    return (
        <div className="mx-[8%] h-[75px] border-b-2 border-gray-200">
            <div className="flex flex-row items-center">
                <Location />
                <FilterCoffeeShops />
            </div>
        </div>
    )
}

export default Adjustment;
