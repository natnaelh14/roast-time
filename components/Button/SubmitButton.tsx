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
  variant,
  className,
  ...props
}: SubmitButtonProps) => {
  let customButton;
  switch (variant) {
    case 'primary':
      customButton = 'btn-primary';
      break;
    case 'secondary':
      customButton = 'btn-secondary';
      break;
    default:
      customButton = 'btn-tertiary';
  }
  return (
    <button
      {...props}
      type="submit"
      disabled={isSubmitting}
      className={classNames(customButton, className)}>
      {isSubmitting ? submittingText : text}
      {isSubmitting && (
        <span className="-mr-1 ml-2">
          <ButtonSpinner />
        </span>
      )}
    </button>
  );
};
