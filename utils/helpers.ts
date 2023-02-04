import { validateEmail, validatePhoneNumber } from 'components/api/api';
import { SignUpFormValues } from 'types';
import { UseFormSetError } from 'react-hook-form';

/** Combines multiple class strings into one. Separate by comma */
export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ');
}

export const getSystemDarkTheme = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
};

export const validateEmailAndPhoneNumber = async (
  email: string,
  phoneNumber: string,
  // @ts-ignore:next-line
  setError: UseFormSetError<SignUpFormValues>,
) => {
  const { data: emailData } = await validateEmail(email);
  if (!emailData?.isValid) {
    setError('email', {
      message: 'A user with this email already exists.',
    });
  }
  const { data: phoneNumberData } = await validatePhoneNumber(phoneNumber);
  if (!phoneNumberData?.isValid) {
    setError('phoneNumber', {
      message: 'A user with this phone number already exists.',
    });
  }
};
