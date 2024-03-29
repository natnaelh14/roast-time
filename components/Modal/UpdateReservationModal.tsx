import { DatePicker } from "@mantine/dates";
import { updateReservation, updateReservationByRestaurant } from "components/api/api";
import { Button, SubmitButton } from "components/Button";
import { Input, Select } from "components/Inputs";
import { Modal } from "components/Modal/Modal";
import { useUser } from "components/useUser";
import { useColorScheme } from "contexts/ColorSchemeContext";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Reservation, ReservationFormData, SelectOptionProps } from "types";

export const UpdateReservationModal = ({
	reservation,
	mutate,
	reservationType,
}: {
	reservation: Reservation;
	mutate?: () => void;
	reservationType: string;
}) => {
	const { user } = useUser();
	const { colorScheme } = useColorScheme();
	const [openModal, setOpenModal] = useState(false);
	const { id: reservationId, partySize, reservationDate, reservationTime } = reservation;
	const { control, handleSubmit, formState } = useForm<ReservationFormData>({
		mode: "onTouched",
		defaultValues: {
			partySize,
			reservationDate: new Date(reservationDate),
			reservationTime,
		},
	});
	const { isSubmitting } = formState;

	const onSubmit = async (data: ReservationFormData) => {
		let hasError;
		if (reservationType === "GUEST") {
			const updateReservationPayload = {
				token: user?.token ?? "",
				accountId: user?.account?.id ?? "",
				reservationId,
				reservation: { ...data },
			};
			const response = await updateReservation(updateReservationPayload);
			hasError = !response.isSuccess;
		} else if (reservationType === "RESTAURANT") {
			const response = await updateReservationByRestaurant(
				user?.token ?? "",
				user?.account?.restaurant?.id ?? "",
				reservationId,
				{ ...data },
			);
			hasError = !response.isSuccess;
		}
		if (!hasError && mutate) {
			mutate();
			setOpenModal(false);
			toast.success("Updated reservation successfully");
		} else {
			console.error("reservation update error");
		}
	};
	const people: SelectOptionProps[] = [
		{ value: 1, label: "1 person" },
		{ value: 2, label: "2 people" },
		{ value: 3, label: "3 people" },
		{ value: 4, label: "4 people" },
		{ value: 5, label: "5 people" },
		{ value: 6, label: "6 people" },
		{ value: 7, label: "7 people" },
		{ value: 8, label: "8 people" },
		{ value: 9, label: "9 people" },
		{ value: 10, label: "10 people" },
	];

	return (
		<>
			<Button variant="primary" onClick={() => setOpenModal(true)} className="my-2">
				Update
			</Button>
			<Modal open={openModal} setOpen={setOpenModal} title="Update Reservation">
				<form onSubmit={handleSubmit(onSubmit)} className="w-full">
					<Select control={control} label="Party Size" name="partySize" options={people} />
					<Controller
						control={control}
						name="reservationDate"
						// @ts-ignore:next-line
						render={({ field: { onChange, value, name } }) => (
							<div className="mb-5">
								<DatePicker
									label="Select Date"
									placeholder="MM/DD/YYYY"
									styles={() => ({
										day: {
											backgroundColor: colorScheme === "dark" ? "#253443" : "",
										},
										label: {
											color: colorScheme === "dark" ? "#cfcfcf" : "#737373",
											fontSize: "1rem",
										},
										input: {
											color: colorScheme === "dark" ? "#cfcfcf" : "#737373",
										},
									})}
									variant="unstyled"
									name={name}
									value={value}
									onChange={onChange}
									required={true}
								/>
							</div>
						)}
					/>
					<Input control={control} type="time" name="reservationTime" label="Select Time" required={true} />
					<div className="mt-10 flex flex-row items-end justify-center gap-6">
						<SubmitButton text="Update" variant="primary" isSubmitting={isSubmitting} className="w-auto shadow-lg" />
						<Button
							variant="secondary"
							className="bg-zinc-500 text-white hover:bg-zinc-600 hover:text-white"
							disabled={isSubmitting}
							onClick={() => setOpenModal(false)}
						>
							Cancel
						</Button>
					</div>
				</form>
			</Modal>
		</>
	);
};
