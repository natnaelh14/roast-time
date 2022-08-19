import type { NextPage } from 'next'
import Navbar from '../components/Navbar/Navbar';
import Dashboard from '../components/Dashboard/Dashboard';

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Dashboard />
    </>
  )
}

export default Home
