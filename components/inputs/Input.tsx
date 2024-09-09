import { FieldValues, useController } from "react-hook-form";
import { InputProps } from "types";
import { classNames } from "utils/helpers";
import { ErrorMessage } from "./ErrorMessage";
import { FieldDescription } from "./FieldDescription";

export const Input = <T extends FieldValues>({ type, description, label, ...props }: InputProps<T>) => {
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
				type={type ?? "text"}
				placeholder={type === "tel" ? "(XXX) XXX-XXXX" : ""}
				disabled={isDisabled}
				aria-describedby={error ? `${name}-error` : description && `${name}-description`}
				className={classNames(
					"shadow-border-b hover:shadow-border-b-2 focus:shadow-border-b-2 peer mt-2 inline-block w-full rounded-lg border border-slate-300 p-2 text-base text-gray-500 shadow-gray-300 transition hover:shadow-pink-primary focus:shadow-pink-primary focus:outline-none focus:ring-0 disabled:pointer-events-none disabled:text-gray-300 dark:border-gray-secondary dark:bg-gray-700 dark:text-gray-300",
					error && "border-error",
				)}
			/>
			<label
				className={classNames(
					"absolute -top-0.5 left-0.5 select-none text-sm font-medium text-neutral-500 transition-all ease-out peer-placeholder-shown:pointer-events-none peer-required:after:content-['_*'] peer-focus:-top-0.5 peer-focus:text-xs dark:text-neutral-300 md:text-base md:peer-focus:text-sm",
					isDisabled && "pointer-events-none text-gray-300",
				)}
				htmlFor={name}
			>
				{label}
			</label>
			<div className="ml-px mt-1 min-h-5 text-xs">
				{description && (isDisabled || !error) && (
					<FieldDescription name={name} description={description} isDisabled={isDisabled} />
				)}
				{error && <ErrorMessage name={name} error={error} />}
			</div>
		</div>
	);
};
