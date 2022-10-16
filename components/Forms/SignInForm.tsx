import { SubmitButton } from "../Button/SubmitButton";
import { useForm } from "react-hook-form";
import { sleep } from "utils/helpers";
import { TextInput } from "components/Forms";
import TagManager from 'react-gtm-module';
import { useRouter } from "next/router";
import axios from 'axios';
import { UserSession } from "types";

interface FormValues {
    email: string,
    password: string
}

export const SignInForm = () => {
    const router = useRouter();
    const { control, handleSubmit, formState } = useForm<FormValues>({ mode: "onTouched" });
    const { isSubmitting } = formState;
    const onSubmit = async (data: FormValues) => {
        await sleep(2000);
        try {
            const { data: { accessToken } } = await axios.post<UserSession>("/api/auth/login", data)
            if (accessToken) {
                console.log({ accessToken })
                router.push('/orders')
                // eslint-disable-next-line
                TagManager.dataLayer({
                    dataLayer: {
                        event: 'login',
                        email: data.email,
                    },
                });
            }
        }
        catch (e) {
            console.error("Unable to log in")
        }
    };
    return (
        <div className="flex w-5/6 md:w-2/3 lg:w-2/5 xl:w-1/3 flex-col items-center justify-between border-gray-200 dark:border-gray-secondary border-2 bg-white dark:bg-blue-dark px-16 py-8 rounded-lg">
            <div className="mb-6 text-center">
                <h1 className="text-pink-primary text-xl md:text-3xl text-center">Go ahead, login.</h1>
                <p className="mt-1 text-xs md:text-base text-gray-secondary dark:text-white text center">
                    Welcome back to RoastTime
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full" autoComplete="off">
                <TextInput
                    control={control}
                    name="email"
                    label="Email"
                    autoComplete="off"
                    required={true}
                />
                <TextInput
                    control={control}
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    required={true}
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