import { RestaurantSignUpForm } from 'components/Forms';
import ThreeDotsLoading from 'components/Loaders/ThreeDotsLoading';
import { useState } from 'react';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  // if (session) {
  //     return {
  //         redirect: {
  //             destination: '/',
  //             permanent: false,
  //         },
  //     }
  // }
  return {
    props: {},
  };
};

const GetStarted = () => {
  const [loading, setLoading] = useState(false);
  if (loading) return <ThreeDotsLoading />;

  return (
    <div className="form-background flex min-h-[800px] w-full flex-row items-center justify-center py-16">
      <RestaurantSignUpForm setLoading={setLoading} />
    </div>
  );
};

export default GetStarted;
