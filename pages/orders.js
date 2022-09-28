
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}

const Orders = ({ session }) => {
  console.log("LOBOS", session)
  return(
    <div className='min-h-[600px] flex items-center justify-center text-3xl'>This is an order page.</div>
  )
}

export default Orders;