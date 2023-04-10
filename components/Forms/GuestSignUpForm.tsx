import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { SubmitButton } from "components/Button";
import { ImageInput, LabeledInput, LocationSearchInput } from "components/Inputs";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { IGuestSignUpForm, UserSession } from "types";
import { formatPhoneNumber, validateEmailAndPhoneNumber } from "utils/helpers";
import { z, ZodType } from "zod";
import { useUser } from "components/useUser";

const schema: ZodType = z.object({
	firstName: z.string(),
	lastName: z.string(),
	phoneNumber: z.string(),
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string().min(10, { message: "Must be 10 or more characters long" }),
	serverError: z.void(),
});

export const GuestSignUpForm = ({ setLoading }: { setLoading: (val: boolean) => void }) => {
	const router = useRouter();
	const { userMutate } = useUser();
	const { restaurantId } = router.query;
	const [address, setAddress] = useState<string | undefined>("");
	const [lat, setLat] = useState<number | undefined>();
	const [long, setLong] = useState<number | undefined>();
	const [image, setImage] = useState<Blob | undefined>();
	const { setError, control, handleSubmit, formState } = useForm<IGuestSignUpForm>({
		resolver: zodResolver(schema),
		mode: "onSubmit",
	});
	const { isSubmitting, errors } = formState;
	const onSubmit = async (data: IGuestSignUpForm) => {
		try {
			await validateEmailAndPhoneNumber(data.email, data.phoneNumber, setError);
			const resumeData = new FormData();
			resumeData.append("upload_preset", "resume");
			resumeData.append("file", image as Blob);
			const resumeRes = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`, resumeData);
			const imageUrl = resumeRes.data.secure_url;
			await axios.post<UserSession>("/api/auth/signup", {
				...data,
				address,
				latitude: lat,
				longitude: long,
				imageUrl,
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
			<LabeledInput control={control} name="firstName" label="First Name" required={true} />
			<LabeledInput control={control} name="lastName" label="Last Name" required={true} />
			<Controller
				name="phoneNumber"
				render={({ field }) => (
					<LabeledInput
						type="tel"
						control={control}
						name="phoneNumber"
						label="Phone Number"
						required={true}
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
				address={address || ""}
				setAddress={setAddress}
				setLat={setLat}
				setLong={setLong}
			/>
			<ImageInput setImage={setImage} />
			<LabeledInput type="email" control={control} name="email" label="Email" required={true} />
			<LabeledInput type="password" control={control} name="password" label="Password" required={true} />
			{errors.serverError && <span className="mt-5 text-center text-red-500">{errors.serverError?.message}</span>}
			<div className="mt-6 flex justify-center">
				<SubmitButton text="Sign Up" variant="primary" isSubmitting={isSubmitting} className="w-auto shadow-lg" />
			</div>
		</form>
	);
};
