import Dashboard from 'components/Dashboard/Dashboard';
import Banner from 'components/Banner/Banner';
import Adjustment from 'components/Adjustment/Adjustment';
import { RestaurantContextProvider } from 'contexts/RestaurantsContext';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="mb-20">
      <RestaurantContextProvider>
        <Banner />
        <Adjustment />
        <Dashboard />
      </RestaurantContextProvider>
    </div>
  );
};

export default Home;
