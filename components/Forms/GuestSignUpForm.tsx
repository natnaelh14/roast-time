import { SubmitButton } from 'components/Button';
import { TextInput } from 'components/Inputs';
import { UserSession } from 'types';
import { useUserSession } from 'contexts/UserSessionContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Min, IsEmail, IsMobilePhone } from 'class-validator';

interface GuestSignUpFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

class UserFormValues {
  @IsEmail()
  email!: string;

  @Min(10)
  password!: string;

  @IsMobilePhone()
  phoneNumber!: string;
}

export const GuestSignUpForm = ({
  setLoading,
}: {
  setLoading: (val: boolean) => void;
}) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const { setSession } = useUserSession();
  const { control, handleSubmit, formState } = useForm<GuestSignUpFormValues>({
    resolver: classValidatorResolver(UserFormValues),
    mode: 'onTouched',
  });
  const { isSubmitting } = formState;
  const onSubmit = async (data: GuestSignUpFormValues) => {
    setErrorMessage('');
    try {
      const { data: userData } = await axios.post<UserSession>(
        '/api/auth/signup',
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
        autoComplete="firstName"
        rules={{ required: true }}
      />
      <TextInput
        control={control}
        name="lastName"
        label="Last Name"
        autoComplete="lastName"
        rules={{ required: true }}
      />
      <TextInput
        type="tel"
        control={control}
        name="phoneNumber"
        label="Phone Number"
        autoComplete="phoneNumber"
        rules={{ required: true }}
      />
      <TextInput
        type="email"
        control={control}
        name="email"
        label="Email"
        autoComplete="email"
        rules={{ required: true }}
      />
      <TextInput
        type="password"
        control={control}
        name="password"
        label="Password"
        autoComplete="new-password"
        rules={{ required: true }}
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
