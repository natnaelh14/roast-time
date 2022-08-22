import { FieldValues, useController } from "react-hook-form";
import { TextInputProps } from "types";
import { classNames } from "utils/helpers";
import { ErrorMessage } from "./ErrorMessage";
import { FieldDescription } from "./FieldDescription";

export const TextInput = <T extends FieldValues>({
  type = "text",
  description,
  label,
  ...props
}: TextInputProps<T>) => {
  const {
    field,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController<T>(props);
  const { name, disabled } = props;

  const isDisabled: boolean | undefined = isSubmitting || disabled;

  return (
    <div className="relative flex flex-col space-y-1 pt-5">
      <input
        {...field}
        {...props}
        id={name}
        type={type}
        placeholder="doNotRemove"
        disabled={isDisabled}
        aria-describedby={
          error
            ? `${name}-error`
            : description
            ? `${name}-description`
            : undefined
        }
        className={classNames(
          "peer inline-block w-full border-0 py-0 pl-0.5 text-base shadow-border-b shadow-gray-300 transition placeholder:text-transparent hover:shadow-border-b-2 hover:shadow-blue-primary focus:shadow-border-b-2 focus:shadow-blue-primary focus:outline-none focus:ring-0 disabled:pointer-events-none disabled:text-gray-300",
          error && "shadow-error hover:shadow-error focus:shadow-error"
        )}
      />
      <label
        className={classNames(
          "font-medium absolute -top-0.5 left-0.5 select-none text-xs transition-all ease-out peer-placeholder-shown:pointer-events-none peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-required:after:content-['_*'] peer-focus:-top-0.5 peer-focus:text-xs",
          isDisabled
            ? "pointer-events-none text-gray-300"
            : error
            ? "text-error"
            : "text-gray-secondary"
        )}
        htmlFor={name}
      >
        {label}
      </label>
      <div className="mt-1 ml-[1px] min-h-[1.25rem] text-xs">
        {description && (isDisabled || !error) && (
          <FieldDescription
            name={name}
            description={description}
            isDisabled={isDisabled}
          />
        )}
        {error && !isDisabled && <ErrorMessage name={name} error={error} />}
      </div>
    </div>
  );
};