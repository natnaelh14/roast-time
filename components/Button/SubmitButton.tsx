import { ButtonSpinner } from '../Loaders';
import { classNames } from 'utils/helpers';
import { ComponentPropsWithoutRef } from 'react';

export interface SubmitButtonProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'type' | 'disabled'> {
  // formState: FormState<T>;
  text: string;
  submittingText: string;
  isSubmitting: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export const SubmitButton = ({
  text,
  submittingText,
  isSubmitting,
  variant = 'primary',
  className,
  ...props
}: SubmitButtonProps) => {
  return (
    <button
      {...props}
      type="submit"
      disabled={isSubmitting}
      className={classNames(
        variant === 'primary'
          ? 'btn-primary'
          : variant === 'secondary' && 'btn-secondary',
        className,
      )}>
      {isSubmitting ? submittingText : text}
      {isSubmitting && (
        <span className="-mr-1 ml-2">
          <ButtonSpinner />
        </span>
      )}
    </button>
  );
};
