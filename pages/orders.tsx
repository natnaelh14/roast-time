
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { UserSession } from 'types';
import useSWR from "swr";

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

  const { data: user } = useSWR("/api/user");
  console.log("USER", user)

  return (
    <div className='min-h-[600px] flex items-center justify-center text-3xl dark:text-white'>There are no orders yet.</div>
  )
}

export default Orders;