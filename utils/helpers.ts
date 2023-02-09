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

export const formatPhoneNumber = (value: string) => {
  // if input value is falsy eg if the user deletes the input, then just return
  if (!value) return value;
  // clean the input for any non-digit values.
  const phoneNumber = value.replace(/[^\d]/g, '');
  // phoneNumberLength is used to know when to apply our formatting for the phone number
  const phoneNumberLength = phoneNumber.length;
  // we need to return the value with no formatting if its less then four digits
  // this is to avoid weird behavior that occurs if you  format the area code to early
  if (phoneNumberLength < 4) return phoneNumber;
  // if phoneNumberLength is greater than 4 and less the 7 we start to return
  // the formatted number
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  // finally, if the phoneNumberLength is greater then seven, we add the last
  // bit of formatting and return it.
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6,
  )}-${phoneNumber.slice(6, 10)}`;
};
