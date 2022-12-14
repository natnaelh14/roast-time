import ReservationCard from 'components/Reservation/ReservationCard';
import { Reservation } from 'types';
import { ThreeDotsLoading } from 'components/Loaders';
import EmptyState from 'components/EmptyState/EmptyState';
import { useReservationsContext } from 'contexts/UpcomingReservationsContext';

const UpcomingReservations = () => {
  const { reservations, error, mutate } = useReservationsContext();

  if (!reservations && !error) return <ThreeDotsLoading />;
  if (error || !reservations.length)
    return <EmptyState message="No upcoming reservations found" />;

  return (
    <div className="my-10 min-h-160 text-3xl dark:text-white">
      <h1 className="m-4 text-center text-4xl text-brown-dark dark:text-brown-light">
        Upcoming Reservations
      </h1>
      <div className="flex flex-row overflow-x-scroll md:flex-wrap md:justify-center md:overflow-auto">
        {reservations.map((reservation: Reservation) => {
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
