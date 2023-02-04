import { SubmitButton } from '../Button/SubmitButton';
import { TextInput, LocationSearchInput, ImageInput } from 'components/Inputs';
import { UserSession } from 'types';
import { useUserSession } from 'contexts/UserSessionContext';
import { validateEmail, validatePhoneNumber } from 'components/api/api';
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface RestaurantSignUpFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  name: string;
  category: string;
}

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(10, { message: 'Must be 10 or more characters long' }),
  name: z.string(),
  category: z.string(),
});
const resolver = zodResolver(schema);

export const RestaurantSignUpForm = ({
  setLoading,
}: {
  setLoading: (val: boolean) => void;
}) => {
  const [address, setAddress] = useState<string | undefined>('');
  const [lat, setLat] = useState<number | undefined>();
  const [long, setLong] = useState<number | undefined>();
  const [image, setImage] = useState<Blob | undefined>();
  const router = useRouter();
  const { setSession } = useUserSession();
  const { setError, control, handleSubmit, formState } =
    useForm<RestaurantSignUpFormValues>({
      resolver,
      mode: 'onSubmit',
    });
  const { errors, isSubmitting } = formState;
  const onSubmit = async (data: RestaurantSignUpFormValues) => {
    const { data: emailData } = await validateEmail(data.email);
    if (!emailData?.isValid) {
      return setError('email', {
        message: 'A user with this email already exists.',
      });
    }
    const { data: phoneNumberData } = await validatePhoneNumber(
      data.phoneNumber,
    );
    if (!phoneNumberData?.isValid) {
      return setError('phoneNumber', {
        message: 'A user with this phone number already exists.',
      });
    }
    try {
      const resumeData = new FormData();
      resumeData.append('upload_preset', 'resume');
      // @ts-ignore:next-line
      resumeData.append('file', image);
      const resumeRes = await axios.post(
        `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`,
        resumeData,
      );
      const imageUrl = resumeRes.data.secure_url;
      const { data: userData } = await axios.post<UserSession>(
        '/api/auth/restaurant/signup',
        {
          ...data,
          address,
          latitude: lat,
          longitude: long,
          imageData: [imageUrl],
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
        router.push('/restaurant/orders');
      }
    } catch (e) {
      console.error('account creation error', e);
      // @ts-ignore:next-line
      return setError('apiError', {
        type: 'custom',
        message: 'Unable to sign up. Please try again.',
      });
    }
  };
  return (
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
        type="tel"
        control={control}
        name="phoneNumber"
        label="Phone Number"
        autoComplete="phoneNumber"
        required={true}
      />
      <TextInput
        type="email"
        control={control}
        name="email"
        label="Email"
        autoComplete="off"
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
      <TextInput
        control={control}
        name="name"
        label="Restaurant Name"
        autoComplete="restaurantName"
        required={true}
      />
      <TextInput
        control={control}
        name="category"
        label="Restaurant Category"
        autoComplete="restaurant category"
        required={true}
      />
      <LocationSearchInput
        name="address"
        label="Restaurant Address"
        address={address || ''}
        setAddress={setAddress}
        setLat={setLat}
        setLong={setLong}
      />
      <ImageInput setImage={setImage} />
      {/* @ts-ignore:next-line */}
      {errors.apiError && (
        <div className="mt-5 text-center text-red-500">
          {/* @ts-ignore:next-line */}
          {errors.apiError?.message}
        </div>
      )}
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
