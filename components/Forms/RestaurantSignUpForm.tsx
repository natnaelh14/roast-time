import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ImageInput, Input, LocationSearchInput } from "components/Inputs";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IRestaurantSignUpForm, UserSession } from "types";
import { formatPhoneNumber, validateEmailAndPhoneNumber } from "utils/helpers";
import { z, ZodType } from "zod";
import { SubmitButton } from "../Button/SubmitButton";
import { useUser } from "components/useUser";
import toast from "react-hot-toast";

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
	name: z.string().min(1, { message: "Restaurant name is required" }).default(""),
	category: z.string().min(1, { message: "Restaurant category is required" }).default(""),
	serverError: z.void(),
});

export const RestaurantSignUpForm = ({ setLoading }: { setLoading: Dispatch<SetStateAction<boolean>> }) => {
	const router = useRouter();
	const { userMutate } = useUser();
	const [address, setAddress] = useState<string | undefined>("");
	const [lat, setLat] = useState<number | undefined>();
	const [long, setLong] = useState<number | undefined>();
	const [image, setImage] = useState<Blob | undefined>();
	const { setError, control, handleSubmit, formState } = useForm<IRestaurantSignUpForm>({
		resolver: zodResolver(schema),
		mode: "onSubmit",
	});
	const { errors, isSubmitting } = formState;
	const onSubmit = async (data: IRestaurantSignUpForm) => {
		try {
			await validateEmailAndPhoneNumber(data.email, data.phoneNumber, setError);
			const resumeData = new FormData();
			resumeData.append("upload_preset", "resume");
			resumeData.append("file", image as Blob);
			const resumeRes = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`, resumeData);
			const imageUrl = resumeRes.data.secure_url;
			await axios.post<UserSession>("/api/auth/restaurant/signup", {
				...data,
				address,
				latitude: lat,
				longitude: long,
				imageData: [imageUrl],
			});
			toast.success("Congrats! Your account has been created.");
			setLoading(true);
			await router.push("/restaurant/orders");
			await userMutate();
		} catch (e) {
			return setError("serverError", {
				type: "custom",
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
			<Input type="email" control={control} name="email" label="Email" />
			<Input type="password" control={control} name="password" label="Password" />
			<Input control={control} name="name" label="Restaurant Name" />
			<Input control={control} name="category" label="Restaurant Category" />
			<LocationSearchInput
				name="address"
				label="Restaurant Address"
				address={address ?? ""}
				setAddress={setAddress}
				setLat={setLat}
				setLong={setLong}
			/>
			<ImageInput setImage={setImage} type="RESTAURANT" />
			{errors.serverError && <div className="mt-5 text-center text-red-500">{errors.serverError?.message}</div>}
			<div className="mt-6 flex justify-center">
				<SubmitButton text="Sign Up" variant="primary" isSubmitting={isSubmitting} className="w-auto shadow-lg" />
			</div>
		</form>
	);
};
