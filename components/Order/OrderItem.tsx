import { Button } from "components/Button";
import { Reservation } from "types";
import { deleteReservationByRestaurant } from "components/api/api";
import { useColorScheme } from "contexts/ColorSchemeContext";
import { UpdateReservationModal } from "components/Modal/UpdateReservationModal";
import Image from "next/legacy/image";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useUser } from "components/useUser";
import toast from "react-hot-toast";

const OrderItem = ({ reservation, mutate }: { reservation: Reservation; mutate: () => void }) => {
	const { colorScheme } = useColorScheme();
	const { user } = useUser();

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
				const { isSuccess } = await deleteReservationByRestaurant(
					user?.token ?? "",
					user?.account?.restaurant?.id ?? "",
					reservation?.id,
				);
				if (isSuccess && mutate) {
					mutate();
					toast.success("Your reservation has been cancelled.");
				} else {
					toast.error("Something went wrong. Please try again.");
				}
			}
		});
	};

	return (
		<tr>
			<td className="border-b border-gray-200 px-5 py-5 text-sm dark:border-gray-secondary">
				<div className="flex items-center">
					<div className="h-10 w-10 flex-shrink-0">
						<Image
							className="h-full w-full rounded-full"
							src={reservation?.user?.imageUrl ?? ""}
							height={75}
							width={75}
							alt="profile_name"
						/>
					</div>
					<div className="ml-3">
						<p className="whitespace-no-wrap text-gray-900 dark:text-gray-200">
							{reservation?.user?.firstName} {reservation?.user?.firstName}
						</p>
					</div>
				</div>
			</td>
			<td className="border-b border-gray-200 px-5 py-5 text-sm dark:border-gray-secondary">
				<p className="whitespace-no-wrap text-gray-900 dark:text-gray-200">{reservation?.user?.phoneNumber}</p>
			</td>
			<td className="border-b border-gray-200 px-5 py-5 text-sm dark:border-gray-secondary">
				<p className="whitespace-no-wrap text-gray-900 dark:text-gray-200">
					{dayjs(reservation.reservationDate).format("MM/DD/YYYY")} {reservation?.reservationTime}
				</p>
			</td>
			<td className="border-b border-gray-200 px-5 py-5 text-sm dark:border-gray-secondary">
				<p className="whitespace-no-wrap text-gray-900 dark:text-gray-200">{reservation?.partySize}</p>
			</td>
			<td className="flex flex-row items-start gap-2 border-b border-gray-200 px-5 py-5 text-sm dark:border-gray-secondary">
				<UpdateReservationModal reservation={reservation} reservationType="RESTAURANT" mutate={mutate} />
				<Button variant="secondary" className="my-2" onClick={handleDeleteReservation}>
					Cancel
				</Button>
			</td>
		</tr>
	);
};

export default OrderItem;
