import { Listbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { SelectOptionProps } from "types";
import { classNames } from "utils/helpers";

export const SelectOption = ({ value, label }: SelectOptionProps) => {
	return (
		<Listbox.Option
			value={value}
			className={({ active }) =>
				classNames(
					active ? "bg-gray-200" : "bg-white dark:bg-gray-700",
					"relative cursor-default select-none py-1.5 pl-9 pr-4 text-sm hover:cursor-pointer dark:bg-blue-light  hover:dark:bg-blue-light",
				)
			}
		>
			{({ selected, active }) => (
				<>
					<span
						className={classNames(
							"block truncate",
							active && selected
								? "font-medium text-pink-primary"
								: selected
								? "font-medium text-pink-primary"
								: "font-normal dark:text-gray-100",
						)}
					>
						{label}
					</span>
					{selected && (
						<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-pink-primary">
							<CheckIcon className="size-4" aria-hidden="true" />
						</span>
					)}
				</>
			)}
		</Listbox.Option>
	);
};
