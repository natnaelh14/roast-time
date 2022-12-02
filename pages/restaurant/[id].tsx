import Reservation from 'components/Reservation/Reservation';
import RestaurantTabs from 'components/RestaurantTabs/RestaurantTabs';
import Banner from 'components/Banner/Banner';
import React from 'react';

const Restaurants = () => {
  return (
    <>
      <Banner title="Lets find you a table for any occasion" />
      <div className="my-5 flex flex-col items-center xl:flex-row xl:items-start xl:justify-around">
        <RestaurantTabs />
        <Reservation />
      </div>
    </>
  );
};

export default Restaurants;
