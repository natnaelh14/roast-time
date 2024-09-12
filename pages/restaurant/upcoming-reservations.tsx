import EmptyState from "components/EmptyState/EmptyState";
import { ThreeDotsLoading } from "components/loaders";
import ReservationCard from "components/Reservation/ReservationCard";
import { useUpcomingReservations } from "hooks/useUpcomingReservations";
import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import { Reservation } from "types";
import { sessionOptions } from "utils/config";

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(({ req, res }) => {
	const { user } = req.session;
	const accountType = user?.account?.accountType;

	if (!user?.isLoggedIn) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	if (accountType === "RESTAURANT") {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
}, sessionOptions);

const UpcomingReservations = () => {
	const { mutate, isLoading, error, data: reservations } = useUpcomingReservations();

	if (isLoading) return <ThreeDotsLoading />;
	if (error || (reservations && reservations?.length === 0))
		return <EmptyState message="No upcoming reservations found" />;

	return (
		<div className="my-20 mt-28 min-h-160 text-3xl dark:text-white">
			<h1 className="m-4 text-center text-4xl text-brown-dark dark:text-brown-light">Upcoming Reservations</h1>
			<div className="flex flex-row overflow-x-scroll md:flex-wrap md:justify-center md:overflow-auto">
				{reservations.map((reservation: Reservation) => {
					return (
						<div key={reservation.id} className="m-4">
							<ReservationCard reservation={reservation} mutate={mutate} />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default UpcomingReservations;
