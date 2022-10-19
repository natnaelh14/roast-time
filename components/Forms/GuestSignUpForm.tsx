import { SubmitButton } from "components/Button";
import { useForm } from "react-hook-form";
import { TextInput } from "components/Forms";
import axios from 'axios';
import { useRouter } from "next/router";
import Swal from 'sweetalert2';
import { UserSession } from "types";
import { useUserSession } from 'contexts/UserSessionContext';
import { useState } from 'react';

interface GuestSignUpFormValues {
    first_name: string,
    last_name: string,
    phone_number: string,
    email: string,
    password: string
}

export const GuestSignUpForm = ({ setLoading }: { setLoading: (val: boolean) => void }) => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const { setSession } = useUserSession();
    const { control, handleSubmit, formState } = useForm<GuestSignUpFormValues>({ mode: "onTouched" });
    const { isSubmitting } = formState;
    const onSubmit = async (data: GuestSignUpFormValues) => {
        setErrorMessage('');
        try {
            const { data: userData } = await axios.post<UserSession>("/api/auth/signup", data)
            if (userData?.isLoggedIn) {
                setSession(userData)
                await Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Congrats! Your account has been created.',
                    color: '#F78888',
                    iconColor: '#F78888',
                    showConfirmButton: false,
                    timer: 1500
                });
                setLoading(true)
                router.push('/orders');
            }
        } catch (e) {
            setErrorMessage('Unable to register user, please try again')
        }
    }
    return (
        <div className="flex w-5/6 lg:w-2/5 flex-col items-center justify-between border-gray-200 dark:border-gray-secondary border-2 px-16 py-8 rounded-lg bg-white dark:bg-blue-dark">
            <div className="mb-6 text-center">
                <h1 className="text-pink-primary text-xl md:text-3xl">Get started with RoastTime today.</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <TextInput
                    control={control}
                    name="first_name"
                    label="First Name"
                    autoComplete="firstName"
                    required={true}
                />
                <TextInput
                    control={control}
                    name="last_name"
                    label="Last Name"
                    autoComplete="lastName"
                    required={true}
                />
                <TextInput
                    control={control}
                    name="phone_number"
                    label="Phone Number"
                    autoComplete="phoneNumber"
                    required={true}
                />
                <TextInput
                    control={control}
                    name="email"
                    label="Email"
                    autoComplete="email"
                    required={true}
                />
                <TextInput
                    control={control}
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    required={true}
                />
                {errorMessage && (
                    <p className='text-center text-error'>{errorMessage}</p>
                )}
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
