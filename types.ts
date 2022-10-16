import { FieldValues, UseControllerProps } from "react-hook-form";
  import { ComponentPropsWithoutRef } from "react";
import { Session } from "node:inspector";

export interface TextInputProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<ComponentPropsWithoutRef<"input">, "name" | "defaultValue"> {
  /** Field label. This acts as the placeholder until in focus */
  label: string;
  /** Field type. Defaults to "text" */
  type?: "text" | "password" | "email" | "number" | "tel";
  /** Optional description will show below the input. Will not be shown if the field has an error */
  description?: string;
}

export interface DateInputProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<ComponentPropsWithoutRef<"input">, "name" | "defaultValue"> {
  /** Field label. This acts as the placeholder until in focus */
  label: string;
  /** Field type. Defaults to "text" */
  type?: "text";
  /** Optional description will show below the input. Will not be shown if the field has an error */
  description?: string;
}

export interface SelectProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<ComponentPropsWithoutRef<"button">, "name" | "defaultValue"> {
  /** Field label. This acts as the placeholder until in focus */
  label: string;
  /** Optional description will show below the input. Will not be shown if the field has an error */
  description?: string;
  /** The options to populate the select */
  options: SelectOptionProps[];
}

export interface SelectOptionProps {
  value: string | number;
  label: string;
}

export interface menuItemValues {
  id: number,
  title: string,
  price: number,
  description?: string
}

export interface UserSession {
  isLoggedIn: boolean,
  accessToken?: string,
  account?: SessionAccount
}

export interface SessionAccount {
  firstName?: string,
  lastName?: string,
  emailAddress?: string
}

export interface ErrorResponse {
  message: string
}