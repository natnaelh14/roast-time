import { useState } from "react";
import { Modal } from "components/Modal/Modal";
import { Button, SubmitButton } from "components/Button";
import { LabeledInput } from "components/Inputs";
import { updateAccount } from "components/api/api";
import { useColorScheme } from "contexts/ColorSchemeContext";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useUser } from "components/useUser";

interface AccountFormValues {
	firstName: string;
	lastName: string;
	phoneNumber: string;
}

export const UpdateUserProfileModal = () => {
	const { user, userMutate } = useUser();
	const { colorScheme } = useColorScheme();
	const [openModal, setOpenModal] = useState(false);
	const firstName = user?.account?.firstName;
	const lastName = user?.account?.lastName;
	const phoneNumber = user?.account?.phoneNumber;
	const accountId = user?.account?.id;
	const token = user?.token;
	const { setError, control, handleSubmit, formState } = useForm<AccountFormValues>({
		mode: "onTouched",
		defaultValues: {
			firstName,
			lastName,
			phoneNumber,
		},
	});
	const { isSubmitting, errors } = formState;

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
		await userMutate();
		setOpenModal(false);
		const Toast = Swal.mixin({
			toast: true,
			position: "top-end",
			showConfirmButton: false,
			timer: 1000,
			color: `${colorScheme === "dark" ? "#cfcfcf" : ""}`,
			timerProgressBar: true,
			iconColor: `${colorScheme === "dark" ? "#facea8" : "#c69977"}`,
			background: `${colorScheme === "dark" ? "#4B5563" : ""}`,
		});
		await Toast.fire({
			icon: "success",
			title: "Updated account successfully",
		});
	};

	return (
		<>
			<Button variant="secondary" onClick={() => setOpenModal(true)}>
				Edit
			</Button>
			<Modal open={openModal} setOpen={setOpenModal} title="Update Profile">
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
					{/* @ts-ignore:next-line */}
					{errors.apiError && (
						<div className="mt-5 text-red-500">
							{/* @ts-ignore:next-line */}
							{errors.apiError?.message}
						</div>
					)}
				</form>
			</Modal>
		</>
	);
};
