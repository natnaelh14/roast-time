import { SubmitButton } from "../components/Button/SubmitButton";
import { useForm } from "react-hook-form";
import { sleep } from "utils/helpers";
import { TextInput } from "../components//Forms/TextInput";

const SignUpForm = () => {
    const { control, handleSubmit, formState } = useForm({ mode: "onTouched" });
    const { isSubmitting } = formState;
    const onSubmit = async () => {
        await sleep(2000);
        console.log("Logged in");
    };

    return (
        <div className='flex items-center justify-center min-h-[800px] banner'>
            <div className="flex w-1/2 flex-col items-center justify-between border-gray-200 border-2 px-16 py-8 rounded-lg bg-white">
                <div className="mb-6 text-center">
                    <h1 className="text-blue-primary text-4xl">Get started with RoastTime today.</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <TextInput
                        control={control}
                        name="firstName"
                        label="First name"
                        autoComplete="firstName"
                    />
                    <TextInput
                        control={control}
                        name="lastName"
                        label="Last name"
                        autoComplete="lastName"
                    />
                    <TextInput
                        control={control}
                        name="phoneNumber"
                        label="Phone number"
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
                        autoComplete="current-password"
                    />
                    <div className="mt-6 flex justify-center">
                        <SubmitButton
                            text="Sign Up"
                            submittingText="Signing up..."
                            isSubmitting={isSubmitting}
                            className="w-auto"
                        />
                    </div>
                </form>
            </div>
        </div>

    );
};

export default SignUpForm;
