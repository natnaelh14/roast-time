import { classNames } from "utils/helpers";
import { ComponentPropsWithoutRef } from "react";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
	variant: "primary" | "secondary" | "tertiary";
}

export const Button = ({ variant, type = "button", children, className, ...props }: ButtonProps) => {
	let customButton;
	switch (variant) {
		case "primary":
			customButton = "btn-primary";
			break;
		case "secondary":
			customButton = "btn-secondary";
			break;
		default:
			customButton = "btn-tertiary";
	}
	return (
		<button {...props} className={classNames(customButton, className)} type={type}>
			{children}
		</button>
	);
};
