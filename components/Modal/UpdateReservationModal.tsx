import ModalWrapper from "components/Modal/ModalWrapper";
import { Button, SubmitButton } from "components/Button";
import { Select, LabeledInput } from "components/Inputs";
import { SelectOptionProps, ReservationFormData, Reservation } from "types";
import { updateReservation, updateReservationByRestaurant } from "components/api/api";
import { useColorScheme } from "contexts/ColorSchemeContext";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from "@mantine/dates";
import Swal from "sweetalert2";
import { useUser } from "components/useUser";

const UpdateReservationModal = ({
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
	const [modalIsOpen, setIsOpen] = useState(false);
	const { id: reservationId, partySize, reservationDate, reservationTime } = reservation;
	const { control, handleSubmit, formState } = useForm<ReservationFormData>({
		mode: "onTouched",
		defaultValues: {
			partySize,
			reservationDate: new Date(reservationDate),
			reservationTime,
		},
	});
	const { isSubmitting, isValid } = formState;

	const onSubmit = async (data: ReservationFormData) => {
		let hasError;
		if (reservationType === "GUEST") {
			const updateReservationPayload = {
				token: user?.token || "",
				accountId: user?.account?.id || "",
				reservationId,
				reservation: { ...data },
			};
			const response = await updateReservation(updateReservationPayload);
			hasError = !response.isSuccess;
		} else if (reservationType === "RESTAURANT") {
			const response = await updateReservationByRestaurant(
				user?.token || "",
				user?.account?.restaurant?.id || "",
				reservationId,
				{ ...data },
			);
			hasError = !response.isSuccess;
		}
		if (!hasError && mutate) {
			mutate();
			setIsOpen(false);
			const Toast = Swal.mixin({
				toast: true,
				position: "top-end",
				showConfirmButton: false,
				timer: 3000,
				color: `${colorScheme === "dark" ? "#cfcfcf" : ""}`,
				timerProgressBar: true,
				iconColor: `${colorScheme === "dark" ? "#facea8" : "#c69977"}`,
				background: `${colorScheme === "dark" ? "#4B5563" : ""}`,
			});
			await Toast.fire({
				icon: "success",
				title: "Updated reservation successfully",
			});
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
			<Button variant="primary" onClick={() => setIsOpen(true)} className="my-2">
				Update
			</Button>
			<ModalWrapper modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
				<div className="rounded-xl border border-gray-200 bg-white px-24 py-16 dark:border-gray-secondary dark:bg-blue-dark">
					<h1 className="mb-10 text-center text-3xl text-brown-dark dark:text-brown-light">Update Reservation</h1>
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
						<LabeledInput control={control} type="time" name="reservationTime" label="Select Time" required={true} />
						<div className="mt-10 flex flex-row items-end justify-center gap-6">
							<SubmitButton text="Update" variant="primary" isSubmitting={isSubmitting} className="w-auto shadow-lg" />
							<Button
								variant="secondary"
								className="bg-zinc-500 text-white hover:bg-zinc-600 hover:text-white"
								disabled={isSubmitting}
								onClick={() => setIsOpen(false)}
							>
								Cancel
							</Button>
						</div>
					</form>
				</div>
			</ModalWrapper>
		</>
	);
};

export default UpdateReservationModal;
