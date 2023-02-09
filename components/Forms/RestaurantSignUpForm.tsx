import { SubmitButton } from '../Button/SubmitButton';
import {
  LabeledInput,
  LocationSearchInput,
  ImageInput,
} from 'components/Inputs';
import { UserSession, SignUpFormValues } from 'types';
import { useUserSession } from 'contexts/UserSessionContext';
import { validateEmailAndPhoneNumber, formatPhoneNumber } from 'utils/helpers';
import { useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const [address, setAddress] = useState<string | undefined>('');
  const [lat, setLat] = useState<number | undefined>();
  const [long, setLong] = useState<number | undefined>();
  const [image, setImage] = useState<Blob | undefined>();
  const router = useRouter();
  const { setUserSession } = useUserSession();
  const { setError, control, handleSubmit, formState } =
    useForm<SignUpFormValues>({
      resolver,
      mode: 'onSubmit',
    });
  const { errors, isSubmitting } = formState;
  const onSubmit = async (data: SignUpFormValues) => {
    try {
      await validateEmailAndPhoneNumber(data.email, data.phoneNumber, setError);
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
        setUserSession(userData);
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
      <LabeledInput
        control={control}
        name="firstName"
        label="First Name"
        autoComplete="firstName"
        required={true}
      />
      <LabeledInput
        control={control}
        name="lastName"
        label="Last Name"
        autoComplete="lastName"
        required={true}
      />
      <Controller
        name="phoneNumber"
        render={({ field }) => (
          <LabeledInput
            type="tel"
            control={control}
            name="phoneNumber"
            label="Phone Number"
            required={true}
            onChange={(e) => {
              field.onChange(formatPhoneNumber(e.target.value));
            }}
          />
        )}
        control={control}
      />
      <LabeledInput
        type="email"
        control={control}
        name="email"
        label="Email"
        autoComplete="off"
        required={true}
      />
      <LabeledInput
        type="password"
        control={control}
        name="password"
        label="Password"
        autoComplete="new-password"
        required={true}
      />
      <LabeledInput
        control={control}
        name="name"
        label="Restaurant Name"
        autoComplete="restaurantName"
        required={true}
      />
      <LabeledInput
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
