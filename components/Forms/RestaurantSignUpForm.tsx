import { TextInput } from './TextInput';
import { SubmitButton } from '../Button/SubmitButton';
import { UserSession } from 'types';
import { useUserSession } from 'contexts/UserSessionContext';
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Min, IsEmail, IsPhoneNumber, IsPostalCode } from 'class-validator';

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

class UserFormValues {
  @IsEmail()
  email!: string;

  @Min(10)
  password!: string;

  @IsPhoneNumber()
  phoneNumber!: string;

  @IsPostalCode()
  zipCode!: string;
}

export const RestaurantSignUpForm = ({
  setLoading,
}: {
  setLoading: (val: boolean) => void;
}) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const { setSession } = useUserSession();
  const { control, handleSubmit, formState } =
    useForm<RestaurantSignUpFormValues>({
      resolver: classValidatorResolver(UserFormValues),
      mode: 'onTouched',
    });
  const { isSubmitting } = formState;
  const onSubmit = async (data: RestaurantSignUpFormValues) => {
    setErrorMessage('');
    try {
      const { data: userData } = await axios.post<UserSession>(
        '/api/auth/restaurant/signup',
        data,
      );
      if (userData?.isLoggedIn) {
        setSession(userData);
        await Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Congrats! Your account has been created.',
          color: '#F78888',
          iconColor: '#F78888',
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(true);
        router.push('/orders');
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };
  return (
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
      {errorMessage && <p className="text-center text-error">{errorMessage}</p>}
      <div className="mt-6 flex justify-center">
        <SubmitButton
          text="Sign Up"
          submittingText="Signing up..."
          isSubmitting={isSubmitting}
          className="w-auto shadow-lg"
        />
      </div>
    </form>
  );
};
