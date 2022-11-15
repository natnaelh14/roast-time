import { SubmitButton } from "components/Button";
import { useForm } from "react-hook-form";
import { TextInput } from "components/Forms";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { UserSession } from "types";
import { useUserSession } from "contexts/UserSessionContext";
import { useState } from "react";

interface GuestSignUpFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export const GuestSignUpForm = ({
  setLoading,
}: {
  setLoading: (val: boolean) => void;
}) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const { setSession } = useUserSession();
  const { control, handleSubmit, formState } = useForm<GuestSignUpFormValues>({
    mode: "onTouched",
  });
  const { isSubmitting } = formState;
  const onSubmit = async (data: GuestSignUpFormValues) => {
    setErrorMessage("");
    try {
      const { data: userData } = await axios.post<UserSession>(
        "/api/auth/signup",
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
    } catch (e) {
      setErrorMessage("Unable to register user, please try again");
    }
  };
  return (
    <div className="flex w-5/6 flex-col items-center justify-between rounded-lg border-2 border-gray-200 bg-white px-16 py-8 dark:border-gray-secondary dark:bg-blue-dark lg:w-2/5">
      <div className="mb-6 text-center">
        <h1 className="text-xl text-pink-primary md:text-3xl">
          Get started with RoastTime today.
        </h1>
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
