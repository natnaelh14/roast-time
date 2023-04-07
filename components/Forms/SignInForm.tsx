import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { LabeledInput } from "components/Inputs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import TagManager from "react-gtm-module";
import { useForm } from "react-hook-form";
import { UserSession } from "types";
import { z, ZodType } from "zod";
import { SubmitButton } from "../Button/SubmitButton";
import { useUser } from "components/useUser";

interface SignInFormData {
	email: string;
	password: string;
}

const schema: ZodType = z.object({
	email: z.string().email({ message: "Invalid email address" }).default(""),
	password: z.string().min(10, { message: "Must be 10 or more characters long" }).default(""),
});

export const SignInForm = () => {
	const router = useRouter();
	const { userMutate } = useUser();
	const [errorMessage, setErrorMessage] = useState("");
	const { restaurantId } = router.query;
	const {
		control,
		handleSubmit,
		formState: { isSubmitting, isValid },
	} = useForm<SignInFormData>({
		resolver: zodResolver(schema),
		mode: "onChange",
	});

	const onSubmit = async (data: SignInFormData) => {
		setErrorMessage("");
		try {
			await axios.post<UserSession>("/api/auth/login", data);
			// eslint-disable-next-line
			TagManager.dataLayer({
				dataLayer: {
					event: "login",
					email: data.email,
				},
			});
			if (restaurantId) {
				await router.push(`/restaurant/${restaurantId}`);
			} else {
				await router.push("/restaurant/upcoming-reservations");
			}
			await userMutate();
		} catch (e) {
			setErrorMessage("Unable to log in, Please try again");
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-full">
			<LabeledInput type="email" control={control} name="email" label="Email" required={true} />
			<LabeledInput type="password" control={control} name="password" label="Password" required={true} />
			{/* <ErrorMessage
                    errors={formState.errors}
                    name="singleErrorInput"
                    render={({ message }) => <p>{message}</p>}
                /> */}
			{errorMessage && <p className="text-center text-error">{errorMessage}</p>}
			<div className="mt-6 flex flex-col items-center">
				<SubmitButton text="Sign In" variant="primary" isSubmitting={isSubmitting} className="w-auto shadow-lg" />
				<div className="mt-3 block dark:text-white">
					<span>New User?</span>
					{"  "}
					<Link
						href={`/signup${restaurantId?.length ? `?restaurantId=${restaurantId}` : ""}`}
						className="text-md text-center underline decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary"
					>
						Signup
					</Link>
				</div>
			</div>
		</form>
	);
};
