import { SubmitButton } from 'components/Button';
import { UserSession } from 'types';
import { useUserSession } from 'contexts/UserSessionContext';
import { TextInput, LocationSearchInput } from 'components/Inputs';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface GuestSignUpFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(10, { message: 'Must be 10 or more characters long' }),
});
const resolver = zodResolver(schema);

export const GuestSignUpForm = ({
  setLoading,
}: {
  setLoading: (val: boolean) => void;
}) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [address, setAddress] = useState<string | undefined>('');
  const [lat, setLat] = useState<number | undefined>();
  const [long, setLong] = useState<number | undefined>();
  const { setSession } = useUserSession();
  const { control, handleSubmit, formState } = useForm<GuestSignUpFormValues>({
    resolver,
    mode: 'onSubmit',
  });
  const { isSubmitting } = formState;
  const onSubmit = async (data: GuestSignUpFormValues) => {
    setErrorMessage('');
    try {
      const { data: userData } = await axios.post<UserSession>(
        '/api/auth/signup',
        {
          ...data,
          address,
          latitude: lat,
          longitude: long,
        },
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
    } catch (e) {
      setErrorMessage('Unable to register user, please try again');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <TextInput
        control={control}
        name="firstName"
        label="First Name"
        required={true}
      />
      <TextInput
        control={control}
        name="lastName"
        label="Last Name"
        required={true}
      />
      <TextInput
        type="tel"
        control={control}
        name="phoneNumber"
        label="Phone Number"
        maxLength={10}
        required={true}
      />
      <LocationSearchInput
        name="address"
        label="Address"
        address={address || ''}
        setAddress={setAddress}
        setLat={setLat}
        setLong={setLong}
      />
      <TextInput
        type="email"
        control={control}
        name="email"
        label="Email"
        autoComplete="email"
        required={true}
      />
      <TextInput
        type="password"
        control={control}
        name="password"
        label="Password"
        autoComplete="new-password"
        required={true}
      />
      {errorMessage && <p className="text-center text-error">{errorMessage}</p>}
      <div className="mt-6 flex justify-center">
        <SubmitButton
          text="Sign Up"
          variant="primary"
          submittingText="Signing up..."
          isSubmitting={isSubmitting}
          className="w-auto shadow-lg"
        />
      </div>
    </form>
  );
};
