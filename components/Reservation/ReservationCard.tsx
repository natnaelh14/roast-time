import { Reservation } from "types";
import { Button } from "components/Button";
import { deleteReservation } from "components/api/api";
import UpdateReservationModal from "components/Modal/UpdateReservationModal";
import { useColorScheme } from "contexts/ColorSchemeContext";
import dayjs from "dayjs";
import Image from "next/legacy/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { useUser } from "components/useUser";

const ReservationCard = ({
	reservation,
	isHistory,
	mutate,
}: {
	reservation: Reservation;
	isHistory?: boolean;
	mutate?: () => void;
}) => {
	const { colorScheme } = useColorScheme();
	const { user } = useUser();
	const { restaurant } = reservation;

	const handleDeleteReservation = () => {
		return Swal.fire({
			title: "Cancel Reservation",
			text: "Are you sure you want to cancel this reservation?",
			icon: "warning",
			showCancelButton: true,
			color: `${colorScheme === "dark" ? "#cfcfcf" : ""}`,
			confirmButtonColor: "#F78888",
			confirmButtonText: "Yes",
			cancelButtonText: "No",
			background: `${colorScheme === "dark" ? "#253443" : ""}`,
		}).then(async (result) => {
			// eslint-disable-next-line promise/always-return
			if (result.isConfirmed) {
				const { isSuccess } = await deleteReservation(
					// @ts-ignore:next-line
					user?.token,
					user?.account?.id,
					reservation?.id,
				);
				if (isSuccess && mutate) {
					mutate();
					await Swal.fire({
						title: "Deleted!",
						text: "Your reservation has been deleted.",
						icon: "success",
						color: `${colorScheme === "dark" ? "#cfcfcf" : ""}`,
						background: `${colorScheme === "dark" ? "#253443" : ""}`,
						confirmButtonText: "Ok",
						confirmButtonColor: "#F78888",
						iconColor: `${colorScheme === "dark" ? "#facea8" : "#c69977"}`,
					});
				} else {
					await Swal.fire({
						title: "Error!",
						text: "Something went wrong. Please try again.",
						icon: "error",
						color: `${colorScheme === "dark" ? "#cfcfcf" : ""}`,
						background: `${colorScheme === "dark" ? "#253443" : ""}`,
						confirmButtonText: "Ok",
						confirmButtonColor: "#F78888",
						iconColor: `${colorScheme === "dark" ? "#facea8" : "#c69977"}`,
					});
				}
			}
		});
	};

	return (
		<div className="w-lg flex min-w-80 flex-col overflow-hidden rounded border p-2 shadow-lg dark:border-gray-secondary md:flex-row">
			<Link href={`restaurant/${restaurant?.id}`} className="hover:cursor-pointer" passHref>
				<Image
					className=""
					src={restaurant?.imageData[0] || ""}
					height={275}
					width={325}
					alt={restaurant?.name || ""}
				/>
			</Link>
			<div className="flex flex-col items-start px-6 py-4">
				<h1 className="mb-2 text-xl font-bold dark:text-white">{restaurant?.name}</h1>
				<p className="text-base font-bold text-gray-500 dark:text-gray-300">
					<span className="font-medium">Party Size: </span>
					{reservation.partySize}
				</p>
				<p className="text-base font-extrabold text-gray-500 dark:text-gray-300">
					<span className="font-extrabold">Reservation: </span>
					{dayjs(reservation.reservationDate).format("MM/DD/YYYY")} {reservation.reservationTime}
				</p>
				<p className="my-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-blue-dark dark:text-gray-300">
					#{restaurant?.category}
				</p>
				{!isHistory && (
					<>
						<UpdateReservationModal reservation={reservation} reservationType="GUEST" mutate={mutate} />
						<Button variant="secondary" className="my-2 inline-flex items-center" onClick={handleDeleteReservation}>
							Cancel
						</Button>
					</>
				)}
			</div>
		</div>
	);
};

export default ReservationCard;
