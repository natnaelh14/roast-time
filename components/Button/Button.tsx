import { classNames } from 'utils/helpers';
import { ComponentPropsWithoutRef } from 'react';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export const Button = ({
  variant = 'primary',
  type = 'button',
  children,
  className,
  ...props
}: ButtonProps) => {
  let customButton;
  if (variant === 'primary') {
    customButton = 'btn-primary';
  } else if (variant === 'secondary') {
    customButton = 'btn-secondary';
  } else if (variant === 'tertiary') {
    customButton = 'btn-tertiary';
  }
  return (
    <button
      {...props}
      className={classNames(customButton, className)}
      type={type}
    >
      {children}
    </button>
  );
};
