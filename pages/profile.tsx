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

const profile = () => {
  return (
    <div className="flex min-h-[600px] items-center justify-center text-3xl dark:text-white">
      This is the profile page.
    </div>
  );
};

export default profile;
