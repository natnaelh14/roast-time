import type { NextPage } from 'next'
import Dashboard from '../components/Dashboard/Dashboard';
import Banner from '../components/Banner/Banner';
import Adjustment from '../components/Adjustment/Adjustment';

const Home: NextPage = () => {
  return (
    <>
      <Banner />
      <Adjustment />
      <Dashboard />
    </>
  )
}

export default Home
