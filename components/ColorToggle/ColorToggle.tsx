import { useColorScheme } from "contexts/ColorSchemeContext";
import { Switch } from "@headlessui/react";
import { classNames } from "utils/helpers";

const ColorToggle = () => {
	const { colorScheme, toggleColorScheme } = useColorScheme();

	return (
		<div className="flex items-center gap-2">
			<span className=" text-sm text-gray-500 dark:text-gray-400">
				{colorScheme === "dark" ? "Dark Mode" : "Light Mode"}
			</span>
			<Switch
				checked={colorScheme === "dark"}
				onChange={() => toggleColorScheme()}
				className={classNames(
					colorScheme === "dark" ? "bg-orange-primary" : "bg-gray-300",
					"relative mr-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-0 focus:ring-offset-2",
				)}
			>
				<span className="sr-only">Use Light/Dark Mode</span>
				<span
					aria-hidden="true"
					className={classNames(
						colorScheme === "dark" ? "translate-x-5" : "translate-x-0",
						"pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
					)}
				/>
			</Switch>
		</div>
	);
};

export default ColorToggle;
