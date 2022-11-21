import { sessionOptions } from 'utils/config';
import { GetServerSideProps } from 'next';
import { withIronSessionSsr } from 'iron-session/next';

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res }) => {
    const { user } = req.session;

    if (!user?.isLoggedIn) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  },
  sessionOptions,
);

const ThankYou = () => {
  return (
    <div className="flex min-h-[500px] items-center justify-center">
      <p className="text-2xl dark:text-white">
        Thank you for making a reservation.
      </p>
    </div>
  );
};

export default ThankYou;
