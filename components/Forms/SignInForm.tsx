import { SubmitButton } from "../Button/SubmitButton";
import { useForm } from "react-hook-form";
import { sleep } from "utils/helpers";
import { TextInput } from "./TextInput";

const SignInForm = () => {
    const { control, handleSubmit, formState } = useForm({ mode: "onTouched" });
    const { isSubmitting } = formState;
    const onSubmit = async () => {
        await sleep(2000);
        console.log("Logged in");
    };

    return (
        <div className="flex w-1/2 flex-col items-center justify-between border-gray-200 border-2 bg-white px-16 py-8 rounded-lg">
            <div className="mb-6 text-center">
                <h1 className="text-blue-primary text-4xl">Go ahead, login.</h1>
                <p className="mt-1 text-lg text-gray-secondary">
                    Welcome back to RoastTime
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
                <div className="flex flex-col items-center mt-6">
                    <SubmitButton
                        text="Sign In"
                        submittingText="Signing in..."
                        isSubmitting={isSubmitting}
                        className="w-auto"
                    />
                    <a className="mt-2 block text-center text-md" href="#">
                        Forgot your password?
                    </a>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;