import { FieldError } from "react-hook-form";

type ErrorMessageProps = {
  name: string;
  error: FieldError | undefined;
};

export const ErrorMessage = ({ error, name }: ErrorMessageProps) => {
  if (!error) return null;

  return (
    <span role="alert" id={`${name}-error`} className="text-error">
      {error.message}
    </span>
  );
};