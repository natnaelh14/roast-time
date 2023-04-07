import { ComponentPropsWithoutRef } from "react";
import { classNames } from "utils/helpers";
import { ButtonSpinner } from "../Loaders";

export interface SubmitButtonProps extends Omit<ComponentPropsWithoutRef<"button">, "type" | "disabled"> {
	text: string;
	isSubmitting: boolean;
	variant?: "primary" | "secondary" | "tertiary";
}

export const SubmitButton = ({ text, isSubmitting, variant, className, ...props }: SubmitButtonProps) => {
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
		<button {...props} type="submit" disabled={isSubmitting} className={classNames(customButton, className)}>
			{!isSubmitting && text}
			{isSubmitting && <ButtonSpinner />}
		</button>
	);
};
