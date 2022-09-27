import { SubmitButton } from "../Button/SubmitButton";
import { useForm } from "react-hook-form";
import { sleep } from "utils/helpers";
import { TextInput } from "components/Forms";
import TagManager from 'react-gtm-module';
import axios from "axios";
import { signIn } from 'next-auth/react';
import { parseJwt } from 'utils/helpers';
import { getSession } from 'next-auth/react';

interface FormValues {
    username: string,
    password: string
}

export const SignInForm = () => {
    const { control, handleSubmit, formState } = useForm<FormValues>({ mode: "onTouched" });
    const { isSubmitting } = formState;
    const onSubmit = async (data: FormValues) => {
        await sleep(2000);
        // const { data: { accessToken } } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, data);
        const res = await signIn('credentials', { ...data, redirect: false });
        const result = await getSession()
        console.log("ELSHA", result);
        // const result = parseJwt(accessToken);
        // const payload = {
        //     token: accessToken,

        // }
        // const res = await signIn('credentials', { ...data, redirect: false })

        console.log("Logged in");
        // eslint-disable-next-line
        TagManager.dataLayer({
            dataLayer: {
                event: 'login',
                email: data.username,
            },
        });
    };
    return (
        <div className="flex w-5/6 md:w-2/3 lg:w-2/5 xl:w-1/3 flex-col items-center justify-between border-gray-200 border-2 bg-white px-16 py-8 rounded-lg">
            <div className="mb-6 text-center">
                <h1 className="text-pink-primary text-xl md:text-3xl text-center">Go ahead, login.</h1>
                <p className="mt-1 text-xs md:text-base text-gray-secondary text center">
                    Welcome back to RoastTime
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full" autoComplete="off">
                <TextInput
                    control={control}
                    name="username"
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