import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { FieldValues, useController } from "react-hook-form";
import { SelectProps } from "types";
import { classNames } from "utils/helpers";
import { ErrorMessage } from "./ErrorMessage";
import { FieldDescription } from "./FieldDescription";
import { SelectOption } from "./SelectOption";

export const Select = <T extends FieldValues>({
    label,
    description,
    options,
    ...props
}: SelectProps<T>) => {
    const {
        field,
        formState: { isSubmitting },
        fieldState: { error },
    } = useController(props);
    const { disabled, name } = props;

    const [selectedOption, setSelectedOption] = useState(
        options.find((o) => o.value === field.value)
    );

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
                            "form-select relative inline-block w-full cursor-pointer border-0 bg-white py-0 pl-0.5 pr-10 text-left text-base shadow-border-b shadow-gray-300 transition placeholder:text-transparent hover:shadow-border-b-2 hover:shadow-blue-primary focus:shadow-border-b-2 focus:shadow-blue-primary focus:outline-none focus:ring-0",
                            open && "shadow-border-b-2 shadow-blue-primary",
                            isDisabled && "pointer-events-none text-gray-300"
                        )}
                        {...props}
                    >
                        <span className="block h-6 truncate">{selectedOption?.label}</span>
                    </Listbox.Button>
                    <Listbox.Label
                        className={classNames(
                            !!field.value || open
                                ? "pointer-events-auto top-0 text-xs"
                                : "top-5 text-sm",
                            "font-medium pointer-events-none absolute left-0.5 select-none transition-all ease-out",
                            isDisabled
                                ? "pointer-events-none text-gray-300"
                                : error
                                    ? "text-error"
                                    : "text-gray-secondary"
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
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded bg-white py-2 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {options.map((option) => (
                                <SelectOption
                                    key={option.value}
                                    value={option.value}
                                    label={option.label}
                                />
                            ))}
                        </Listbox.Options>
                    </Transition>

                    {/* Description and error visibility logic */}
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
            )}
        </Listbox>
    );
};

