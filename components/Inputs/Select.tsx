import { Listbox, Transition } from "@headlessui/react";
import { SelectOption } from "components/inputs";
import { Fragment, useEffect, useState } from "react";
import { FieldValues, useController } from "react-hook-form";
import { SelectProps } from "types";
import { classNames } from "utils/helpers";
import { ErrorMessage } from "./ErrorMessage";
import { FieldDescription } from "./FieldDescription";

export const Select = <T extends FieldValues>({ label, description, options, ...props }: SelectProps<T>) => {
	const {
		field,
		formState: { isSubmitting },
		fieldState: { error },
	} = useController(props);
	const { disabled, name } = props;

	const [selectedOption, setSelectedOption] = useState(options.find((o) => o.value === field.value));

	useEffect(() => {
		setSelectedOption(options.find((o) => o.value === field.value));
	}, [field.value, options]);

	const isDisabled: boolean | undefined = isSubmitting || disabled;

	return (
		<Listbox {...field} disabled={isDisabled}>
			{({ open }) => (
				<div className="relative mt-1 h-[70px] w-full pt-5">
					<Listbox.Button
						className={classNames(
							"shadow-border-b hover:shadow-border-b-2 focus:shadow-border-b-2 form-select relative inline-block w-full cursor-pointer border-0 bg-white py-0 pl-0.5 pr-10 text-left text-base shadow-gray-300 transition placeholder:text-transparent hover:shadow-pink-primary focus:shadow-pink-primary focus:outline-none focus:ring-0 dark:bg-blue-dark dark:text-gray-300",
							open && "shadow-border-b-2 shadow-pink-primary",
							isDisabled && "pointer-events-none text-gray-300",
						)}
						{...props}
					>
						<span className="inline-flex h-8 items-center truncate text-gray-500 dark:text-gray-300">
							{selectedOption?.label}
						</span>
					</Listbox.Button>
					<Listbox.Label
						className={classNames(
							!!field.value || open ? "pointer-events-auto top-0 text-sm md:text-base" : "top-5 text-sm md:text-sm",
							"pointer-events-none absolute left-0.5 select-none font-medium transition-all ease-out after:-top-0.5 after:text-sm",
							isDisabled
								? "pointer-events-none text-gray-300"
								: error
								? "text-error"
								: "text-neutral-500 dark:text-neutral-300",
						)}
					>
						{label}
					</Listbox.Label>
					<Transition
						show={open}
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white shadow-md ring-1 ring-gray-200 ring-opacity-5 focus:outline-none dark:ring-gray-secondary">
							{options.map((option) => (
								<SelectOption key={option.value} value={option.value} label={option.label} />
							))}
						</Listbox.Options>
					</Transition>

					{/* Description and error visibility logic */}
					<div className="ml-px mt-1 min-h-5 text-xs">
						{description && (isDisabled || !error) && (
							<FieldDescription name={name} description={description} isDisabled={isDisabled} />
						)}
						{error && !isDisabled && <ErrorMessage name={name} error={error} />}
					</div>
				</div>
			)}
		</Listbox>
	);
};
