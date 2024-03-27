import { DatePicker } from "@mantine/dates";
import { handleReservation } from "components/api/api";
import { SubmitButton } from "components/Button";
import { Input, Select } from "components/Inputs";
import { useColorScheme } from "contexts/ColorSchemeContext";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { ReservationFormData, SelectOptionProps } from "types";
import { useUser } from "components/useUser";
import toast from "react-hot-toast";

const Reservation = () => {
	const router = useRouter();
	const { id: restaurantId } = router.query;
	const { user } = useUser();
	const { colorScheme } = useColorScheme();

	const { control, handleSubmit, formState } = useForm<ReservationFormData>({
		mode: "onTouched",
		defaultValues: {
			partySize: 1,
			reservationDate: new Date(),
			reservationTime: "12:00",
		},
	});
	const { isSubmitting } = formState;
	const onSubmit = async (data: ReservationFormData) => {
		try {
			if (!user?.token) {
				await router.push({
					pathname: "/signin",
					query: { restaurantId },
				});
			}
			const reservationPayload = {
				...data,
				restaurantId,
				userId: user?.account?.id,
				token: user?.token,
			};
			// @ts-ignore:next-line
			const { hasError } = await handleReservation(reservationPayload);
			if (!hasError) {
				toast.success("Your reservation has been confirmed.");
				await router.push("/restaurant/upcoming-reservations");
			}
			return;
		} catch (e) {
			console.error(e);
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
		<div className="m-8 flex h-fit w-fit flex-col items-center rounded-lg border-2 border-gray-200 bg-white px-16 py-8 shadow-lg dark:border-gray-secondary dark:bg-blue-dark lg:justify-between">
			<div className="mb-6 text-center">
				<h1 className="text-center text-xl text-pink-primary lg:text-3xl">Make a reservation</h1>
			</div>
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
				<div className="mt-6 flex flex-col items-center">
					<SubmitButton variant="primary" text="Reserve" isSubmitting={isSubmitting} className="w-auto shadow-lg" />
				</div>
			</form>
		</div>
	);
};

export default Reservation;
