import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import { useUser } from "components/useUser";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import toast from "react-hot-toast";

export const MenuDropdown = () => {
	const router = useRouter();
	const { user, userMutate } = useUser();
	const handleLogout = async () => {
		await axios.post("/api/auth/logout");
		await router.push("/signin");
		await userMutate();
	};

	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="inline-flex w-full justify-center rounded-md bg-transparent bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
					<Image
						className="rounded-full"
						width={32}
						height={32}
						src={user?.account?.imageUrl || ""}
						alt="user profile photo"
					/>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-gray-500 dark:bg-blue-light dark:text-white">
					<div className="px-4 py-3">
						<span className="block text-sm text-gray-900 dark:text-white">Hello, {user?.account?.firstName}</span>
						<span className="block truncate text-sm font-medium text-gray-500 dark:text-gray-400">
							{user?.account?.email}
						</span>
					</div>
					<div className="p-1 ">
						<Menu.Item>
							{({ active }) => (
								<Link
									href="/profile"
									className={`${
										active && "bg-gray-200 dark:bg-blue-primary"
									} group flex w-full items-center rounded-md p-2 text-sm`}
								>
									My Profile
								</Link>
							)}
						</Menu.Item>
						{user?.account?.accountType === "GUEST" ? (
							<>
								<Menu.Item>
									{({ active }) => (
										<Link
											href="/restaurant/dining-history"
											className={`${
												active && "bg-gray-200 dark:bg-blue-primary"
											} group flex w-full items-center rounded-md p-2 text-sm`}
										>
											My Dining History
										</Link>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<Link
											href="/restaurant/saved-restaurants"
											className={`${
												active && "bg-gray-200 dark:bg-blue-primary"
											} group flex w-full items-center rounded-md p-2 text-sm`}
										>
											My Saved Restaurants
										</Link>
									)}
								</Menu.Item>
							</>
						) : (
							user?.account?.accountType === "RESTAURANT" && (
								<Menu.Item>
									{({ active }) => (
										<Link
											href="/restaurant/orders"
											className={`${
												active && "bg-gray-200 dark:bg-blue-primary"
											} group flex w-full items-center rounded-md p-2 text-sm`}
										>
											Orders
										</Link>
									)}
								</Menu.Item>
							)
						)}
						<Menu.Item>
							{({ active }) => (
								<button
									className={`${
										active && "bg-gray-200 dark:bg-blue-primary"
									} group flex w-full items-center rounded-md p-2 text-sm`}
									onClick={async () => {
										await handleLogout();
										toast.success("Logout successful");
									}}
								>
									Logout
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
