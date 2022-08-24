import { ComponentPropsWithoutRef } from "react";
import { classNames } from "utils/helpers";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary" | "tertiary";
}

export const Button = ({
  variant = "primary",
  type = "button",
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={classNames(
        variant === "primary"
          ? "btn-primary"
          : variant === "secondary"
          ? "btn-secondary"
          : variant === "tertiary" && "btn-tertiary",
        className
      )}
      type={type}
    >
      {children}
    </button>
  );
};
