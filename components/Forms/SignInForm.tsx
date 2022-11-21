import { SubmitButton } from '../Button/SubmitButton';
import { TextInput } from 'components/Forms';
import { UserSession } from 'types';
import { useUserSession } from 'contexts/UserSessionContext';
import { useForm } from 'react-hook-form';
import TagManager from 'react-gtm-module';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useState } from 'react';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Min, IsEmail } from 'class-validator';

interface FormValues {
  email: string;
  password: string;
}
class UserFormValues {
  @IsEmail()
  email!: string;

  @Min(10)
  password!: string;
}
const resolver = classValidatorResolver(UserFormValues);

export const SignInForm = ({
  setLoading,
}: {
  setLoading: (val: boolean) => void;
}) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const { setSession } = useUserSession();
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<UserFormValues>({
    resolver,
    mode: 'onTouched',
  });

  const onSubmit = async (data: FormValues) => {
    setErrorMessage('');
    try {
      const { data: userData } = await axios.post<UserSession>(
        '/api/auth/login',
        data,
      );
      if (userData?.isLoggedIn) {
        setSession(userData);
        // eslint-disable-next-line
        TagManager.dataLayer({
          dataLayer: {
            event: 'login',
            email: data.email,
          },
        });
        setLoading(true);
        router.push('/orders');
      }
    } catch (e) {
      // setError('email', { message: 'Opss No go' })
      setErrorMessage('Unable to log in, Please try again');
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full"
      autoComplete="off"
    >
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
        autoComplete="current-password"
        required={true}
      />
      {/* <ErrorMessage
                    errors={formState.errors}
                    name="singleErrorInput"
                    render={({ message }) => <p>{message}</p>}
                /> */}
      {errorMessage && <p className="text-center text-error">{errorMessage}</p>}
      <div className="mt-6 flex flex-col items-center">
        <SubmitButton
          text="Sign In"
          submittingText="Signing in..."
          isSubmitting={isSubmitting}
          className="w-auto shadow-lg"
        />
        <a
          className="text-md mt-2 block text-center text-pink-primary"
          href="#"
        >
          Forgot your password?
        </a>
      </div>
    </form>
  );
};
