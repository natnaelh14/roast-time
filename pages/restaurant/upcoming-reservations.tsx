import { sessionOptions } from 'utils/config';
import ReservationCard from 'components/Reservation/ReservationCard';
import { Reservation } from 'types';
import { ThreeDotsLoading } from 'components/Loaders';
import EmptyState from 'components/EmptyState/EmptyState';
import { GetServerSideProps } from 'next';
import { withIronSessionSsr } from 'iron-session/next';
import useSWR from 'swr';

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async ({ req, res }) => {
    const { user } = req.session;
    const accountId = user?.account?.id;
    const token = user?.token;

    if (!user?.isLoggedIn) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    return {
      props: {
        accountId: accountId || null,
        token: token || null,
      },
    };
  },
  sessionOptions,
);

const UpcomingReservations = ({
  accountId,
  token,
}: {
  accountId: string;
  token: string;
}) => {
  const {
    data: reservationData,
    error,
    mutate,
  } = useSWR([
    `${process.env.NEXT_PUBLIC_BASE_URL}/reservations/${accountId}`,
    token,
  ]);

  if (!reservationData && !error) return <ThreeDotsLoading />;
  if (error) return <EmptyState message="No upcoming reservations found" />;

  return (
    <div className="my-10 text-3xl dark:text-white ">
      <h1 className="m-4 text-center text-4xl">Upcoming Reservations</h1>
      <div className="flex flex-row overflow-x-scroll md:flex-wrap md:justify-center md:overflow-auto">
        {reservationData?.reservations.map((reservation: Reservation) => {
          return (
            <div key={reservation?.id} className="m-4">
              <ReservationCard reservation={reservation} mutate={mutate} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingReservations;
