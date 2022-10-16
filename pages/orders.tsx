
import axios from 'axios';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { isLoggedIn } = await axios.get('/api/user')

  // if () {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   }
  // }
  return {
    props: {}
  }
}

const Orders = () => {

  return (
    <div className='min-h-[600px] flex items-center justify-center text-3xl dark:text-white'>There are no orders yet.</div>
  )
}

export default Orders;