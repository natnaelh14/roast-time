import { FieldValues, UseControllerProps } from "react-hook-form";
  import { ComponentPropsWithoutRef } from "react";

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