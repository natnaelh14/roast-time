import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { LabeledInput } from 'components/Inputs';
import { useUserSession } from 'contexts/UserSessionContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import TagManager from 'react-gtm-module';
import { useForm } from 'react-hook-form';
import { UserSession } from 'types';
import { z, ZodType } from 'zod';
import { SubmitButton } from '../Button/SubmitButton';

interface SignInFormData {
  email: string;
  password: string;
}

const schema: ZodType<SignInFormData> = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(10, { message: 'Must be 10 or more characters long' }),
});

export const SignInForm = ({
  setLoading,
}: {
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const { setUserSession } = useUserSession();
  const { restaurantId } = router.query;
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: SignInFormData) => {
    setErrorMessage('');
    try {
      const { data: userData } = await axios.post<UserSession>(
        '/api/auth/login',
        data,
      );
      if (userData?.isLoggedIn) {
        setUserSession(userData);
        // eslint-disable-next-line
        TagManager.dataLayer({
          dataLayer: {
            event: 'login',
            email: data.email,
          },
        });
        setLoading(true);
        if (restaurantId) {
          router.push(`/restaurant/${restaurantId}`);
        } else {
          router.push('/restaurant/upcoming-reservations');
        }
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
      autoComplete="off">
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
          variant="primary"
          submittingText="Signing in..."
          isSubmitting={isSubmitting}
          className="w-auto shadow-lg"
        />
        <div className="mt-3 block dark:text-white">
          <span>New User?</span>
          {'  '}
          <Link
            href={`/signup${
              restaurantId?.length ? `?restaurantId=${restaurantId}` : ''
            }`}
            className="text-md text-center underline decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary">
            Signup
          </Link>
        </div>
      </div>
    </form>
  );
};
