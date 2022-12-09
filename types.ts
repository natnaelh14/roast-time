import { FieldValues, UseControllerProps } from 'react-hook-form';
import { ComponentPropsWithoutRef } from 'react';

export interface TextInputProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<ComponentPropsWithoutRef<'input'>, 'name' | 'defaultValue'> {
  /** Field label. This acts as the placeholder until in focus */
  label: string;
  /** Field type. Defaults to "text" */
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'time';
  /** Optional description will show below the input. Will not be shown if the field has an error */
  description?: string;
}

export interface SelectOptionProps {
  value: string | number;
  label: string;
}
export interface SelectProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<ComponentPropsWithoutRef<'button'>, 'name' | 'defaultValue'> {
  /** Field label. This acts as the placeholder until in focus */
  label: string;
  /** Optional description will show below the input. Will not be shown if the field has an error */
  description?: string;
  /** The options to populate the select */
  options: SelectOptionProps[];
}

export interface MenuItemValues {
  id: number;
  title: string;
  price: number;
  description?: string;
}

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  category: string;
  imageData: string[];
  userId?: number;
}
export interface SessionAccount {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  accountType: 'GUEST' | 'RESTAURANT';
  restaurant?: Restaurant;
}
export interface UserSession {
  isLoggedIn: boolean;
  token?: string;
  account?: SessionAccount;
}

export interface Reservation {
  id: string;
  partySize: number;
  reservationDate: Date;
  reservationTime: string;
  restaurant: Restaurant;
}

export interface ErrorResponse {
  message: string;
}

export interface GuestAccountProps {
  handleLogout: () => void;
  isDropDownHidden: boolean;
  setDropDownHidden: (val: boolean) => void;
}

export interface ReservationFormValues {
  partySize: number;
  reservationDate: Date;
  reservationTime: string;
}
