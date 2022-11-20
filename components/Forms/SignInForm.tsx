import { SubmitButton } from '../Button/SubmitButton';
import { TextInput } from 'components/Forms';
import { UserSession } from 'types';
import { useUserSession } from 'contexts/UserSessionContext';
import { useForm } from 'react-hook-form';
import TagManager from 'react-gtm-module';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useState } from 'react';

interface FormValues {
  email: string;
  password: string;
}

export const SignInForm = ({
  setLoading,
}: {
  setLoading: (val: boolean) => void;
}) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const { setSession } = useUserSession();
  const { control, handleSubmit, setError, formState } = useForm<FormValues>({
    mode: 'onTouched',
  });
  const { isSubmitting } = formState;

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
    <div className="flex w-5/6 flex-col items-center justify-between rounded-lg border-2 border-gray-200 bg-white px-16 py-8 dark:border-gray-secondary dark:bg-blue-dark md:w-2/3 lg:w-2/5 xl:w-1/3">
      <div className="mb-6 text-center">
        <h1 className="text-center text-xl text-pink-primary md:text-3xl">
          Go ahead, login.
        </h1>
        <p className="text center mt-1 text-xs text-gray-secondary dark:text-white md:text-base">
          Welcome back to RoastTime
        </p>
      </div>
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
        {errorMessage && (
          <p className="text-center text-error">{errorMessage}</p>
        )}
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
    </div>
  );
};
