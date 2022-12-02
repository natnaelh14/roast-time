import Dashboard from 'components/Dashboard/Dashboard';
import Banner from 'components/Banner/Banner';
import Adjustment from 'components/Adjustment/Adjustment';
import Pagination from 'components/Pagination/Pagination';
import { RestaurantContextProvider } from 'contexts/RestaurantsContext';
import SearchBar from 'components/SearchBar/SearchBar';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="mb-20">
      <RestaurantContextProvider>
        <Banner title="Lets find you the best coffee shop">
          <SearchBar />
        </Banner>
        <Adjustment />
        <Dashboard />
        <Pagination />
      </RestaurantContextProvider>
    </div>
  );
};

export default Home;
