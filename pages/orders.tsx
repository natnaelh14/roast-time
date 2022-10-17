
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { UserSession } from 'types';
import { useUserSession } from 'contexts/UserSessionContext';
import { getSession } from 'components/api/api';

export const getServerSideProps: GetServerSideProps = async (context) => {

  // if (!isLoggedIn) {
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
  const { userSession } = useUserSession();

  return (
    <div className='min-h-[600px] flex items-center justify-center text-3xl dark:text-white'>There are no orders yet.</div>
  )
}

export default Orders;