import { ErrorMessage } from '../ErrorMessage';
import { FieldDescription } from '../FieldDescription';
import { DateInputProps } from 'types';
import { classNames } from 'utils/helpers';
import { FieldValues, useController } from 'react-hook-form';

export const DateInput = <T extends FieldValues>({
  description,
  label,
  ...props
}: DateInputProps<T>) => {
  const {
    field,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController<T>(props);
  const { name, disabled } = props;

  const isDisabled: boolean | undefined = isSubmitting || disabled;

  return (
    <div className="relative flex flex-col space-y-1 pt-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <input
        {...field}
        {...props}
        id={name}
        disabled={isDisabled}
        aria-describedby={
          error
            ? `${name}-error`
            : description
            ? `${name}-description`
            : undefined
        }
        type="date"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      />
      <label
        className={classNames(
          "md:text-smz absolute -top-0.5 left-0.5 select-none text-xs font-medium transition-all ease-out peer-placeholder-shown:pointer-events-none peer-placeholder-shown:top-5 peer-placeholder-shown:text-xs peer-required:after:content-['_*'] peer-focus:-top-0.5 peer-focus:text-sm md:peer-placeholder-shown:text-base",
          isDisabled
            ? 'pointer-events-none text-gray-300'
            : error
            ? 'text-error'
            : 'text-gray-500',
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
