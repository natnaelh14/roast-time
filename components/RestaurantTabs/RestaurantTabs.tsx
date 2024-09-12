import { Tab } from "@headlessui/react";
import { Maps, Menu, Overview, Photos, Reviews } from "components/RestaurantTabs";
import { useRouter } from "next/router";

const RestaurantTabs = () => {
	const router = useRouter();
	const { id: restaurantId } = router.query;
	return (
		<div className="flex flex-col items-center">
			<button
				type="submit"
				className="mt-3 w-fit rounded bg-pink-primary px-36 py-2 text-base text-white hover:bg-orange-primary dark:text-black"
				onClick={async () =>
					await router.push({
						pathname: "/signin",
						query: { restaurantId },
					})
				}
			>
				Complete reservation
			</button>
			<Tab.Group defaultIndex={0} as="div">
				<div className="flex flex-col lg:max-w-4xl">
					<Tab.List>
						<Tab
							className={({ selected }) =>
								selected
									? "focus:outline-hidden m-3 border-b-2 border-pink-primary p-4 text-pink-primary hover:cursor-pointer"
									: "focus:outline-hidden m-3 border-b-2 border-transparent p-4 text-gray-600 hover:cursor-pointer hover:border-gray-secondary dark:text-gray-300"
							}
						>
							Overview
						</Tab>
						<Tab
							className={({ selected }) =>
								selected
									? "focus:outline-hidden m-3 border-b-2 border-pink-primary p-4 text-pink-primary hover:cursor-pointer"
									: "focus:outline-hidden m-3 border-b-2 border-transparent p-4 text-gray-600 hover:cursor-pointer hover:border-gray-secondary dark:text-gray-300"
							}
						>
							Menu
						</Tab>
						<Tab
							className={({ selected }) =>
								selected
									? "focus:outline-hidden m-3 border-b-2 border-pink-primary p-4 text-pink-primary hover:cursor-pointer"
									: "focus:outline-hidden m-3 border-b-2 border-transparent p-4 text-gray-600 hover:cursor-pointer hover:border-gray-secondary dark:text-gray-300"
							}
						>
							Photos
						</Tab>
						<Tab
							className={({ selected }) =>
								selected
									? "focus:outline-hidden m-3 border-b-2 border-pink-primary p-4 text-pink-primary hover:cursor-pointer"
									: "focus:outline-hidden m-3 border-b-2 border-transparent p-4 text-gray-600 hover:cursor-pointer hover:border-gray-secondary dark:text-gray-300"
							}
						>
							Reviews
						</Tab>
						<Tab
							className={({ selected }) =>
								selected
									? "focus:outline-hidden m-3 border-b-2 border-pink-primary p-4 text-pink-primary hover:cursor-pointer"
									: "focus:outline-hidden m-3 border-b-2 border-transparent p-4 text-gray-600 hover:cursor-pointer hover:border-gray-secondary dark:text-gray-300"
							}
						>
							Map
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
						<Tab.Panel>
							<Maps />
						</Tab.Panel>
					</Tab.Panels>
				</div>
			</Tab.Group>
		</div>
	);
};
export default RestaurantTabs;
