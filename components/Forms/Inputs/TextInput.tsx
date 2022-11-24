import { ErrorMessage } from '../ErrorMessage';
import { FieldDescription } from '../FieldDescription';
import { TextInputProps } from 'types';
import { classNames } from 'utils/helpers';
import { FieldValues, useController } from 'react-hook-form';

export const TextInput = <T extends FieldValues>({
  type,
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
        type={type || 'text'}
        placeholder="doNotRemove"
        autoComplete="new-password"
        disabled={isDisabled}
        aria-describedby={
          error
            ? `${name}-error`
            : description
            ? `${name}-description`
            : undefined
        }
        className={classNames(
          'shadow-border-b hover:shadow-border-b-2 focus:shadow-border-b-2 peer mt-2 inline-block w-full rounded-lg border border-slate-300 p-2 text-base text-gray-500 shadow-gray-300 transition placeholder:text-transparent hover:shadow-pink-primary focus:shadow-pink-primary focus:outline-none focus:ring-0 disabled:pointer-events-none disabled:text-gray-300 dark:border-gray-secondary dark:bg-gray-700  dark:text-gray-300',
          error && 'shadow-error hover:shadow-error focus:shadow-error',
        )}
      />
      <label
        className={classNames(
          "absolute -top-0.5 left-0.5 select-none text-xs font-medium transition-all ease-out peer-placeholder-shown:pointer-events-none peer-placeholder-shown:text-xs peer-required:after:content-['_*'] peer-focus:-top-0.5 peer-focus:text-sm md:text-sm md:peer-placeholder-shown:text-base",
          isDisabled
            ? 'pointer-events-none text-gray-300'
            : error
            ? 'text-error'
            : 'text-neutral-500 dark:text-neutral-300',
        )}
        htmlFor={name}>
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
