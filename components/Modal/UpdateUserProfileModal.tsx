import { updateAccount } from "components/api/api";
import { Button, SubmitButton } from "components/Button";
import { Input } from "components/Inputs";
import { Modal } from "components/Modal/Modal";
import { useUser } from "components/useUser";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AccountFormValues {
	firstName: string;
	lastName: string;
	phoneNumber: string;
}

export const UpdateUserProfileModal = () => {
	const { user, userMutate } = useUser();
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
		toast.success("Updated account successfully");
	};

	return (
		<>
			<Button variant="secondary" onClick={() => setOpenModal(true)}>
				Edit
			</Button>
			<Modal open={openModal} setOpen={setOpenModal} title="Update Profile">
				<form onSubmit={handleSubmit(onSubmit)} className="w-full">
					<Input control={control} name="firstName" label="First Name" required={true} />
					<Input control={control} name="lastName" label="Last Name" required={true} />
					<Input type="tel" control={control} name="phoneNumber" label="Phone Number" maxLength={10} required={true} />
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
