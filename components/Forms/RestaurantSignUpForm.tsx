import { useState } from "react";
import axios from "axios";
import { SubmitButton } from "../Button/SubmitButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { sleep } from "utils/helpers";
import { TextInput } from "./TextInput";
import { useRouter } from "next/router";
import { UserSession } from "types";
import { useUserSession } from "contexts/UserSessionContext";
import Swal from "sweetalert2";

interface RestaurantSignUpFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export const RestaurantSignUpForm = ({
  setLoading,
}: {
  setLoading: (val: boolean) => void;
}) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const { setSession } = useUserSession();
  const { control, handleSubmit, formState } =
    useForm<RestaurantSignUpFormValues>({ mode: "onTouched" });
  const { isSubmitting } = formState;
  const onSubmit = async (data: RestaurantSignUpFormValues) => {
    setErrorMessage("");
    try {
      const { data: userData } = await axios.post<UserSession>(
        "/api/auth/restaurant/signup",
        data
      );
      if (userData?.isLoggedIn) {
        setSession(userData);
        await Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Congrats! Your account has been created.",
          color: "#F78888",
          iconColor: "#F78888",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(true);
        router.push("/orders");
      }
    } catch (e) {}
  };
  return (
    <div className="flex w-5/6 flex-col items-center justify-between rounded-lg border-2 border-gray-200 bg-white px-16 py-8 lg:w-1/2 xl:w-2/5">
      <div className="mb-6 text-center">
        <h1 className="text-center text-xl text-pink-primary md:text-3xl">
          Get started with RoastTime today.
        </h1>
        <p className="mt-1 text-center text-xs text-gray-secondary md:text-base">
          Fill out the form below and a member of our team will contact you
          shortly
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col justify-around md:flex-row">
          <div>
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
              name="name"
              label="Restaurant Name"
              autoComplete="restaurantName"
              required={true}
            />
            <TextInput
              control={control}
              name="address"
              label="Restaurant Street Name"
              autoComplete="restaurantStreetName"
              required={true}
            />
            <TextInput
              control={control}
              name="city"
              label="Restaurant City"
              autoComplete="restaurantCity"
              required={true}
            />
            <TextInput
              control={control}
              name="state"
              label="Restaurant State"
              autoComplete="restaurantState"
              required={true}
            />
            <TextInput
              control={control}
              name="zipCode"
              label="Restaurant Zip Code"
              autoComplete="restaurantZipCode"
              required={true}
            />
          </div>
        </div>
        {errorMessage && (
          <p className="text-center text-error">{errorMessage}</p>
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
  );
};
