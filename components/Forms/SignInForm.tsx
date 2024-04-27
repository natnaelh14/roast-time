import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { SubmitButton } from "components/Button/SubmitButton";
import { Input } from "components/inputs";
import { useUser } from "components/useUser";
import Link from "next/link";
import { useRouter } from "next/router";
import TagManager from "react-gtm-module";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { UserSession } from "types";
import { z, ZodType } from "zod";

interface SignInFormData {
	email: string;
	password: string;
	serverError: () => void;
}

const schema: ZodType = z.object({
	email: z
		.string()
		.min(1, { message: "Email address is required" })
		.email({ message: "Invalid email address" })
		.default(""),
	password: z.string().min(10, { message: "Must be 10 or more characters long" }).default(""),
	serverError: z.void(),
});

export const SignInForm = () => {
	const router = useRouter();
	const { userMutate } = useUser();
	const { restaurantId } = router.query;
	const {
		control,
		handleSubmit,
		setError,
		formState: { isSubmitting, errors },
	} = useForm<SignInFormData>({
		resolver: zodResolver(schema),
		mode: "onSubmit",
	});

	const onSubmit = async (data: SignInFormData) => {
		try {
			await axios.post<UserSession>("/api/auth/login", data);
			// eslint-disable-next-line
			TagManager.dataLayer({
				dataLayer: {
					event: "login",
					email: data.email,
				},
			});
			toast.success("Login successful");
			if (restaurantId) {
				await router.push(`/restaurant/${restaurantId}`);
			} else {
				await router.push("/restaurant/upcoming-reservations");
			}
			await userMutate();
		} catch (e) {
			return setError("serverError", {
				type: "server",
				message: "Unable to log in, Please try again",
			});
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-full">
			<Input type="email" control={control} name="email" label="Email" />
			<Input type="password" control={control} name="password" label="Password" />
			<div className="mt-6 flex flex-col items-center space-y-3">
				<SubmitButton text="Sign In" variant="primary" isSubmitting={isSubmitting} className="w-auto shadow-lg" />
				{errors.serverError && <span className="text-center text-error">{errors.serverError?.message}</span>}
				<div className="block dark:text-white">
					<span>New User?</span>
					{"  "}
					<Link
						href={`/signup${restaurantId?.length ? `?restaurantId=${restaurantId}` : ""}`}
						className="text-center underline decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary"
					>
						Signup
					</Link>
				</div>
			</div>
		</form>
	);
};
