import EmptyState from "components/EmptyState/EmptyState";
import { ThreeDotsLoading } from "components/loaders";
import ReservationCard from "components/Reservation/ReservationCard";
import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import useSWR from "swr";
import { Reservation } from "types";
import { sessionOptions } from "utils/config";

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(({ req, res }) => {
	const { user } = req.session;
	const accountId = user?.account?.id;
	const token = user?.token;
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
		props: {
			accountId: accountId || null,
			token: token || null,
		},
	};
}, sessionOptions);

const DiningHistory = ({ accountId, token }: { accountId: string; token: string }) => {
	const { data, error } = useSWR<{ reservations: Reservation[] }>(
		token ? [`${process.env.NEXT_PUBLIC_BASE_URL}/reservations/history/${accountId}`, token] : null,
	);
	const reservations = data?.reservations;
	if (!reservations && !error) return <ThreeDotsLoading />;
	if (error || reservations == undefined) return <EmptyState message="No dining history found" />;

	return (
		<div className="my-10 min-h-160 text-3xl dark:text-white">
			<h1 className="p-6 text-center text-4xl text-brown-dark dark:text-brown-light">Reservation History</h1>
			<div className="flex flex-row overflow-x-scroll md:flex-wrap md:justify-center md:overflow-auto">
				{reservations.map((reservation: Reservation) => {
					return (
						<div key={reservation.id} className="m-4">
							<ReservationCard reservation={reservation} isHistory={true} />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default DiningHistory;
