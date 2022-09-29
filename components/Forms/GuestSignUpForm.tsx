import { SubmitButton } from "components/Button";
import { useForm } from "react-hook-form";
import { sleep } from "utils/helpers";
import { TextInput } from "components/Forms";
import axios from 'axios';
import { useRouter } from "next/router";
import Swal from 'sweetalert2';

interface GuestSignUpFormValues {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string
}

export const GuestSignUpForm = () => {
    const router = useRouter();
    const { control, handleSubmit, formState } = useForm<GuestSignUpFormValues>({ mode: "onTouched" });
    const { isSubmitting } = formState;
    const onSubmit = async (data: GuestSignUpFormValues) => {
        await sleep(2000);
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/register`,
                { email: data?.email, password: data?.password });
            await Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Congrats! Your account has been created.',
                color: '#F78888',
                iconColor: '#F78888',
                showConfirmButton: false,
                timer: 1500
            })
            router.push('/signin')
        } catch (e) {
            console.error('unable to register user.')
        }
    }
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
                    required={true}
                />
                <TextInput
                    control={control}
                    name="lastName"
                    label="Last Name"
                    autoComplete="lastName"
                    required={true}
                />
                <TextInput
                    control={control}
                    name="phoneNumber"
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
