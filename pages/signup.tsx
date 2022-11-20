import { GuestSignUpForm } from 'components/Forms/GuestSignUpForm';
import ThreeDotsLoading from 'components/Loaders/ThreeDotsLoading';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

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

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  if (loading) return <ThreeDotsLoading />;

  return (
    <div className="form-background flex min-h-[800px] items-center justify-center">
      <GuestSignUpForm setLoading={setLoading} />
    </div>
  );
};

export default SignUpForm;
