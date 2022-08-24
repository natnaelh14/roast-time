import { SubmitButton } from "../Button/SubmitButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { sleep } from "utils/helpers";
import { TextInput } from "./TextInput";

// interface RestaurantSignUpFormValues {
//     firstName: string,
//     lastName: string,
//     phoneNumber: string,
//     email: string,
//     password: string,
//     restaurantName: string,
//     restaurantStreetName: string,
//     restaurantCity: string,
//     restaurantState: string,
//     restaurantZipCode: number
// }

export const RestaurantSignUpForm = () => {
    const { control, handleSubmit, formState } = useForm({ mode: "onTouched" });
    const { isSubmitting } = formState;
    const onSubmit = async () => {
        await sleep(2000);
        // console.log({ firstName, lastName, phoneNumber, email, password });
    };
    return (
        <div className="flex w-5/6 lg:w-1/2 xl:w-2/5 flex-col items-center justify-between border-gray-200 border-2 px-16 py-8 rounded-lg bg-white">
            <div className="mb-6 text-center">
                <h1 className="text-pink-primary text-xl lg:text-3xl text-center">Get started with RoastTime today.</h1>
                <p className="mt-1 text-sm lg:text-md text-gray-secondary text-center">
                    Fill out the form below and a member of our team will contact you shortly
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className='flex flex-col md:flex-row justify-around'>
                    <div>
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
                            autoComplete="off"
                        />
                        <TextInput
                            control={control}
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <TextInput
                            control={control}
                            name="restaurantName"
                            label="Restaurant Name"
                            autoComplete="restaurantName"
                        />
                        <TextInput
                            control={control}
                            name="restaurantStreetName"
                            label="Restaurant Street Name"
                            autoComplete="restaurantStreetName"
                        />
                        <TextInput
                            control={control}
                            name="restaurantCity"
                            label="Restaurant City"
                            autoComplete="restaurantCity"
                        />
                        <TextInput
                            control={control}
                            name="restaurantState"
                            label="Restaurant State"
                            autoComplete="restaurantState"
                        />
                        <TextInput
                            control={control}
                            name="restaurantZipCode"
                            label="Restaurant Zip/Postal Code"
                            autoComplete="restaurantZipCode"
                        />
                    </div>
                </div>


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