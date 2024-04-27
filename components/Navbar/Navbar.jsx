import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import ColorToggle from "components/ColorToggle/ColorToggle";
import { CloseIcon, HamburgerIcon, UpcomingReservationsIcon } from "components/icons";
import { useUser } from "components/useUser";
import { useRestaurantContext } from "contexts/RestaurantsContext";
import { UseReservationsContext } from "contexts/UpcomingReservationsContext";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { MenuDropdown } from "./MenuDropdown";

export const Navbar = () => {
	const router = useRouter();
	const { user, userMutate } = useUser();
	const [mobileNavShown, setMobileNavShown] = useState(false);
	const { reservations } = UseReservationsContext();
	const { restaurantsData, error } = useRestaurantContext();
	if (!user) return null;

	const handleLogout = async () => {
		await axios.post("/api/auth/logout");
		await router.push("/signin");
		await userMutate();
	};

	return (
		<nav className="glass fixed inset-x-0 top-0 z-20 flex h-20 flex-row items-center px-2 dark:bg-blue-dark">
			<HamburgerIcon handleClick={() => setMobileNavShown(true)} />
			<Link href="/" className="mt-3" aria-label="Link to Homepage">
				<Image alt="roastTime logo" src="/logo.png" height={200} width={200} />
			</Link>
			<div>
				{error ? (
					<h2 className="text-red-600">• API Not Connected</h2>
				) : !restaurantsData?.restaurants?.length && !error ? (
					<h2 className="text-yellow-400">• API Loading</h2>
				) : (
					<h2 className="text-green-400">• API Connected</h2>
				)}
			</div>
			<div className="absolute right-2 hidden flex-row items-center md:flex">
				{!user?.isLoggedIn && (
					<>
						<Link
							href="/signin"
							className="m-2 p-2 text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white"
						>
							Sign In
						</Link>
						<Link
							href="/signup"
							className="m-2 p-2 text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white"
						>
							Sign Up
						</Link>
						<Link
							href="/restaurant/get-started"
							className="m-2 p-2 text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white"
						>
							For Businesses
						</Link>
					</>
				)}
				{user?.isLoggedIn && (
					<>
						{user?.account?.accountType === "GUEST" && (
							<UpcomingReservationsIcon reservationCount={reservations?.length || 0} />
						)}
						<MenuDropdown />
					</>
				)}
				<ColorToggle />
			</div>
			{/* Hamburger Nav */}
			<Transition.Root as={Fragment} show={mobileNavShown}>
				<Dialog as="div" className="fixed inset-0 z-20 overflow-hidden" onClose={setMobileNavShown}>
					<div className="absolute inset-0 overflow-hidden">
						<Transition.Child
							as={Fragment}
							enter="ease-in-out duration-500"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in-out duration-500"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
						</Transition.Child>
						<div className="pointer-events-none fixed inset-y-0">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-300"
								enterFrom="-translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-300"
								leaveFrom="translate-x-0"
								leaveTo="-translate-x-full"
							>
								<nav className="pointer-events-auto fixed inset-y-0 left-0 h-screen w-64 bg-white text-2xl dark:bg-blue-dark">
									<button
										aria-label="close navigation"
										className="ml-6 mt-6 size-[40px]"
										onClick={() => setMobileNavShown(false)}
									>
										<CloseIcon />
										<span className="sr-only">Close panel</span>
									</button>
									<ul className="flex flex-col space-y-6 pl-3 pt-8">
										{!user?.isLoggedIn && (
											<>
												<Link
													href="/signin"
													className="m-2 p-2 text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white"
													onClick={() => setMobileNavShown(false)}
												>
													Sign In
												</Link>
												<Link
													href="/signup"
													className="m-2 p-2 text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white"
													onClick={() => setMobileNavShown(false)}
												>
													Sign Up
												</Link>
												<Link
													href="/restaurant/get-started"
													className="m-2 p-2 text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white"
													onClick={() => setMobileNavShown(false)}
												>
													For Businesses
												</Link>
											</>
										)}
										{user?.isLoggedIn && (
											<>
												<Link
													href="/profile"
													onClick={() => setMobileNavShown(false)}
													className="m-2 p-2 text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white"
												>
													My Profile
												</Link>
												{user?.account?.accountType === "GUEST" ? (
													<>
														<Link
															href="/restaurant/upcoming-reservations"
															onClick={() => setMobileNavShown(false)}
															className="m-2 p-2"
														>
															<span className="text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white">
																Upcoming reservations
															</span>
															<span className="ml-3 inline-flex size-3 items-center justify-center rounded-full bg-orange-light p-3 text-sm font-medium text-black dark:bg-orange-primary dark:text-white">
																{reservations?.length || 0}
															</span>
														</Link>
														<Link
															href="/restaurant/dining-history"
															onClick={() => setMobileNavShown(false)}
															className="m-2 p-2 text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white"
														>
															My Dining History
														</Link>
														<Link
															href="/restaurant/saved-restaurants"
															onClick={() => setMobileNavShown(false)}
															className="m-2 p-2 text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white"
														>
															My Saved Restaurants
														</Link>
													</>
												) : (
													user?.account?.accountType === "RESTAURANT" && (
														<Link
															href="/restaurant/orders"
															onClick={() => setMobileNavShown(false)}
															className="m-2 p-2 text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white"
														>
															Orders
														</Link>
													)
												)}
												<Link
													href="/"
													className="m-2 p-2 text-base decoration-pink-primary decoration-4 underline-offset-8 hover:text-pink-primary hover:underline dark:text-white"
													onClick={() => {
														setMobileNavShown(false);
														handleLogout();
														toast.success("Logout successful");
													}}
												>
													Sign Out
												</Link>
											</>
										)}
										<ColorToggle />
									</ul>
								</nav>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</nav>
	);
};
