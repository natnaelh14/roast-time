import { SubmitButton } from "../Button/SubmitButton";
import { useForm } from "react-hook-form";
import { sleep } from "utils/helpers";
import { TextInput } from "../Forms/TextInput";

export const SignInForm = () => {
    const { control, handleSubmit, formState } = useForm({ mode: "onTouched" });
    const { isSubmitting } = formState;
    const onSubmit = async () => {
        await sleep(2000);
        console.log("Logged in");
    };
    return (
        <div className="flex w-1/3 flex-col items-center justify-between border-gray-200 border-2 bg-white px-16 py-8 rounded-lg">
            <div className="mb-6 text-center">
                <h1 className="text-pink-primary text-3xl text-center">Go ahead, login.</h1>
                <p className="mt-1 text-md text-gray-secondary text center">
                    Welcome back to RoastTime
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full" autoComplete="off">
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
                        className="w-auto shadow-lg"
                    />
                    <a className="mt-2 block text-center text-md text-pink-primary" href="#">
                        Forgot your password?
                    </a>
                </div>
            </form>
        </div>
    )
};