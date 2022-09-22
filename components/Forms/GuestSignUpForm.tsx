import { SubmitButton } from "components/Button";
import { useForm } from "react-hook-form";
import { sleep } from "utils/helpers";
import { TextInput } from "components/Forms";

interface GuestSignUpFormValues {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string
}

export const GuestSignUpForm = () => {
    const { control, handleSubmit, formState } = useForm<GuestSignUpFormValues>({ mode: "onTouched" });
    const { isSubmitting } = formState;
    const onSubmit = async (data: GuestSignUpFormValues) => {
        await sleep(2000);
        console.log("GuestSignUpForm", data);
    };
    return (
        <div className="flex w-5/6 lg:w-2/5 flex-col items-center justify-between border-gray-200 border-2 px-16 py-8 rounded-lg bg-white">
            <div className="mb-6 text-center">
                <h1 className="text-pink-primary text-xl md:text-3xl">Get started with RoastTime today.</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <TextInput
                    control={control}
                    name="firstName"
                    label="First Name"
                    autoComplete="firstName"
                />
                <TextInput
                    control={control}
                    name="lastName"
                    label="Last Name"
                    autoComplete="lastName"
                />
                <TextInput
                    control={control}
                    name="phoneNumber"
                    label="Phone Number"
                    autoComplete="phoneNumber"
                />
                <TextInput
                    control={control}
                    name="email"
                    label="Email"
                    autoComplete="email"
                />
                <TextInput
                    control={control}
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                />
                <div className="mt-6 flex justify-center">
                    <SubmitButton
                        text="Sign Up"
                        submittingText="Signing up..."
                        isSubmitting={isSubmitting}
                        className="w-auto shadow-lg"
                    />
                </div>
            </form>
        </div>
    )
};
