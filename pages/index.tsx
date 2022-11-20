import Dashboard from 'components/Dashboard/Dashboard';
import Banner from 'components/Banner/Banner';
import Adjustment from 'components/Adjustment/Adjustment';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="mb-20">
      <Banner />
      <Adjustment />
      <Dashboard />
    </div>
  );
};

export default Home;
