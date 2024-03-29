import { Overview, Photos, Reviews, Menu } from "components/RestaurantTabs";
import { Tab } from "@headlessui/react";

const RestaurantTabs = () => {
	return (
		<Tab.Group defaultIndex={0}>
			<div className="lg:min-w-lg flex flex-col lg:max-w-4xl">
				<Tab.List>
					<Tab
						className={({ selected }) =>
							selected
								? "m-3 border-b-2 border-pink-primary p-4 text-pink-primary hover:cursor-pointer focus:outline-hidden"
								: "m-3 border-b-2 border-transparent p-4 text-gray-600 hover:cursor-pointer hover:border-gray-secondary focus:outline-hidden dark:text-gray-300"
						}
					>
						Overview
					</Tab>
					<Tab
						className={({ selected }) =>
							selected
								? "m-3 border-b-2 border-pink-primary p-4 text-pink-primary hover:cursor-pointer focus:outline-hidden"
								: "m-3 border-b-2 border-transparent p-4 text-gray-600 hover:cursor-pointer hover:border-gray-secondary focus:outline-hidden dark:text-gray-300"
						}
					>
						Menu
					</Tab>
					<Tab
						className={({ selected }) =>
							selected
								? "m-3 border-b-2 border-pink-primary p-4 text-pink-primary hover:cursor-pointer focus:outline-hidden"
								: "m-3 border-b-2 border-transparent p-4 text-gray-600 hover:cursor-pointer hover:border-gray-secondary focus:outline-hidden dark:text-gray-300"
						}
					>
						Photos
					</Tab>
					<Tab
						className={({ selected }) =>
							selected
								? "m-3 border-b-2 border-pink-primary p-4 text-pink-primary hover:cursor-pointer focus:outline-hidden"
								: "m-3 border-b-2 border-transparent p-4 text-gray-600 hover:cursor-pointer hover:border-gray-secondary focus:outline-hidden dark:text-gray-300"
						}
					>
						Reviews
					</Tab>
				</Tab.List>
				<Tab.Panels className="min-h-[450px] w-full">
					<Tab.Panel>
						<Overview />
					</Tab.Panel>
					<Tab.Panel>
						<Menu />
					</Tab.Panel>
					<Tab.Panel>
						<Photos />
					</Tab.Panel>
					<Tab.Panel>
						<Reviews />
					</Tab.Panel>
				</Tab.Panels>
			</div>
		</Tab.Group>
	);
};
export default RestaurantTabs;
