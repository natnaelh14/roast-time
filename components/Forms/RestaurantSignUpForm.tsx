import { useState } from 'react';
import axios from "axios";
import { SubmitButton } from "../Button/SubmitButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { sleep } from "utils/helpers";
import { TextInput } from "./TextInput";
import { useRouter } from "next/router";
import { UserSession } from "types";
import { useUserSession } from 'contexts/UserSessionContext';
import Swal from 'sweetalert2';

interface RestaurantSignUpFormValues {
    first_name: string,
    last_name: string,
    phone_number: string,
    email: string,
    password: string,
    restaurant_name: string,
    restaurant_street_name: string,
    restaurant_city: string,
    restaurant_state: string,
    restaurant_zip_code: number
}

export const RestaurantSignUpForm = ({ setLoading }: { setLoading: (val: boolean) => void }) => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const { setSession } = useUserSession();
    const { control, handleSubmit, formState } = useForm<RestaurantSignUpFormValues>({ mode: "onTouched" });
    const { isSubmitting } = formState;
    const onSubmit = async (data: RestaurantSignUpFormValues) => {
        setErrorMessage('');
        try {
            const { data: userData } = await axios.post<UserSession>("/api/auth/restaurant/signup", data)
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

        }
    };
    return (
        <div className="flex w-5/6 lg:w-1/2 xl:w-2/5 flex-col items-center justify-between border-gray-200 border-2 px-16 py-8 rounded-lg bg-white">
            <div className="mb-6 text-center">
                <h1 className="text-pink-primary text-xl md:text-3xl text-center">Get started with RoastTime today.</h1>
                <p className="mt-1 text-xs md:text-base text-gray-secondary text-center">
                    Fill out the form below and a member of our team will contact you shortly
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className='flex flex-col md:flex-row justify-around'>
                    <div>
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
                            autoComplete="off"
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
                    </div>
                    <div>
                        <TextInput
                            control={control}
                            name="restaurant_name"
                            label="Restaurant Name"
                            autoComplete="restaurantName"
                            required={true}
                        />
                        <TextInput
                            control={control}
                            name="restaurant_street_name"
                            label="Restaurant Street Name"
                            autoComplete="restaurantStreetName"
                            required={true}
                        />
                        <TextInput
                            control={control}
                            name="restaurant_city"
                            label="Restaurant City"
                            autoComplete="restaurantCity"
                            required={true}
                        />
                        <TextInput
                            control={control}
                            name="restaurant_state"
                            label="Restaurant State"
                            autoComplete="restaurantState"
                            required={true}
                        />
                        <TextInput
                            control={control}
                            name="restaurant_zip_code"
                            label="Restaurant Zip Code"
                            autoComplete="restaurantZipCode"
                            required={true}
                        />
                    </div>
                </div>
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