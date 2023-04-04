import ModalWrapper from "components/Modal/ModalWrapper";
import { Button, SubmitButton } from "components/Button";
import { LabeledInput } from "components/Inputs";
import { updateAccount } from "components/api/api";
import { useColorScheme } from "contexts/ColorSchemeContext";
import { UseUserSession } from "contexts/UserSessionContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface AccountFormValues {
	firstName: string;
	lastName: string;
	phoneNumber: string;
}
const UpdateUserProfileModal = () => {
	const { userSession, refreshAccount } = UseUserSession();

	const { colorScheme } = useColorScheme();
	const [modalIsOpen, setIsOpen] = useState(false);
	const firstName = userSession?.account?.firstName;
	const lastName = userSession?.account?.lastName;
	const phoneNumber = userSession?.account?.phoneNumber;
	const accountId = userSession?.account?.id;
	const token = userSession?.token;
	const { setError, control, handleSubmit, formState } = useForm<AccountFormValues>({
		mode: "onTouched",
		defaultValues: {
			firstName,
			lastName,
			phoneNumber,
		},
	});
	const { isSubmitting, isValid, errors } = formState;

	const onSubmit = async (data: AccountFormValues) => {
		const response = await updateAccount(token || "", accountId || "", data);
		if (!response.isSuccess) {
			console.error(response.error);
			//@ts-ignore:next-line
			return setError("apiError", {
				type: "custom",
				message: "Unable to update profile. Please try again.",
			});
		}
		if (response.data && refreshAccount) {
			refreshAccount();
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
				title: "Updated account successfully",
			});
		}
	};

	return (
		<>
			<Button variant="secondary" onClick={() => setIsOpen(true)}>
				Edit
			</Button>
			<ModalWrapper modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
				<div className="rounded-xl border border-gray-200 bg-white px-24 py-16 dark:border-gray-secondary dark:bg-blue-dark">
					<h1 className="mb-10 text-center text-3xl text-brown-dark dark:text-brown-light">Update Profile</h1>
					<form onSubmit={handleSubmit(onSubmit)} className="w-full">
						<LabeledInput control={control} name="firstName" label="First Name" required={true} />
						<LabeledInput control={control} name="lastName" label="Last Name" required={true} />
						<LabeledInput
							type="tel"
							control={control}
							name="phoneNumber"
							label="Phone Number"
							maxLength={10}
							required={true}
						/>
						<div className="mt-10 flex flex-row items-end justify-center gap-6">
							<SubmitButton
								text="Update"
								variant="primary"
								submittingText="Updating..."
								isSubmitting={isSubmitting}
								isValid={isValid}
								className="w-auto shadow-lg"
							/>
							<Button
								variant="secondary"
								className="bg-zinc-500 text-white hover:bg-zinc-600 hover:text-white"
								disabled={isSubmitting}
								onClick={() => setIsOpen(false)}
							>
								Cancel
							</Button>
						</div>
						{/* @ts-ignore:next-line */}
						{errors.apiError && (
							<div className="mt-5 text-red-500">
								{/* @ts-ignore:next-line */}
								{errors.apiError?.message}
							</div>
						)}
					</form>
				</div>
			</ModalWrapper>
		</>
	);
};

export default UpdateUserProfileModal;
