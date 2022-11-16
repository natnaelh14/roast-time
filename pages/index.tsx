import type { NextPage } from 'next';
import Dashboard from 'components/Dashboard/Dashboard';
import Banner from 'components/Banner/Banner';
import Adjustment from 'components/Adjustment/Adjustment';

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
