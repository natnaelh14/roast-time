import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { SubmitButton } from "components/Button";
import { Input, LocationSearchInput } from "components/Inputs";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { IGuestSignUpForm, UserSession } from "types";
import { formatPhoneNumber, validateEmailAndPhoneNumber } from "utils/helpers";
import { z, ZodType } from "zod";
import { useUser } from "components/useUser";

const schema: ZodType = z.object({
	firstName: z.string().min(1, { message: "First name is required" }).default(""),
	lastName: z.string().min(1, { message: "Last name is required" }).default(""),
	phoneNumber: z
		.string()
		.regex(/^\(\d{3}\) \d{3}-\d{4}$/, { message: "Please enter a valid 10 digit phone number." })
		.default(""),

	email: z
		.string()
		.min(1, { message: "Email address is required" })
		.email({ message: "Invalid email address" })
		.default(""),
	password: z.string().min(10, { message: "Must be 10 or more characters long" }).default(""),
	serverError: z.void(),
});

export const GuestSignUpForm = ({ setLoading }: { setLoading: (val: boolean) => void }) => {
	const router = useRouter();
	const { userMutate } = useUser();
	const { restaurantId } = router.query;
	const [address, setAddress] = useState<string | undefined>("");
	const [lat, setLat] = useState<number | undefined>();
	const [long, setLong] = useState<number | undefined>();
	const { setError, control, handleSubmit, formState } = useForm<IGuestSignUpForm>({
		resolver: zodResolver(schema),
		mode: "onSubmit",
	});
	const { isSubmitting, errors } = formState;
	const onSubmit = async (data: IGuestSignUpForm) => {
		try {
			await validateEmailAndPhoneNumber(data.email, data.phoneNumber, setError);
			await axios.post<UserSession>("/api/auth/signup", {
				...data,
				address,
				latitude: lat,
				longitude: long,
			});
			await Swal.fire({
				position: "top-end",
				icon: "success",
				title: "Congrats! Your account has been created.",
				color: "#F78888",
				iconColor: "#F78888",
				showConfirmButton: false,
				timer: 1500,
			});
			setLoading(true);
			if (restaurantId) {
				await router.push(`/restaurant/${restaurantId}`);
			} else {
				await router.push("/");
			}
			await userMutate();
		} catch (e) {
			console.error("account creation error", e);
			return setError("serverError", {
				type: "server",
				message: "Unable to sign up. Please try again.",
			});
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-full">
			<Input control={control} name="firstName" label="First Name" />
			<Input control={control} name="lastName" label="Last Name" />
			<Controller
				name="phoneNumber"
				render={({ field }) => (
					<Input
						type="tel"
						control={control}
						name="phoneNumber"
						label="Phone Number"
						onChange={(e) => {
							field.onChange(formatPhoneNumber(e.target.value));
						}}
					/>
				)}
				control={control}
			/>
			<LocationSearchInput
				name="address"
				label="Address"
				address={address ?? ""}
				setAddress={setAddress}
				setLat={setLat}
				setLong={setLong}
			/>
			<Input type="email" control={control} name="email" label="Email" />
			<Input type="password" control={control} name="password" label="Password" />
			{errors.serverError && <span className="mt-5 text-center text-red-500">{errors.serverError?.message}</span>}
			<div className="mt-6 flex justify-center">
				<SubmitButton text="Sign Up" variant="primary" isSubmitting={isSubmitting} className="w-auto shadow-lg" />
			</div>
		</form>
	);
};
