import { SubmitButton } from '../Button/SubmitButton';
import { TextInput, LocationSearchInput } from 'components/Forms';
import { UserSession } from 'types';
import { useUserSession } from 'contexts/UserSessionContext';
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Length, IsEmail, IsPhoneNumber } from 'class-validator';

interface RestaurantSignUpFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  name: string;
}

class UserFormValues {
  @IsEmail()
  email!: string;

  @Length(10)
  password!: string;

  @IsPhoneNumber()
  phoneNumber!: number;
}

export const RestaurantSignUpForm = ({
  setLoading,
}: {
  setLoading: (val: boolean) => void;
}) => {
  const [address, setAddress] = useState<string | undefined>('');
  const [lat, setLat] = useState<number | undefined>();
  const [long, setLong] = useState<number | undefined>();

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
    console.log({ address, lat, long, data });
    const imageUrl =
      'https://images.unsplash.com/photo-1542181961-9590d0c79dab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDkxMTF8MHwxfHNlYXJjaHwzMHx8Y29mZmVlJTIwc2hvcHxlbnwwfHx8fDE2NjkwNjQyODg&ixlib=rb-4.0.3&q=80&w=400';
    const category = 'French';
    try {
      const { data: userData } = await axios.post<UserSession>(
        '/api/auth/restaurant/signup',
        { ...data, address, imageUrl, category },
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
      <TextInput
        control={control}
        name="name"
        label="Restaurant Name"
        autoComplete="restaurantName"
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
