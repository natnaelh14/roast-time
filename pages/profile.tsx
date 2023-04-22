import { sessionOptions } from "utils/config";
import { UseReservationsContext } from "contexts/UpcomingReservationsContext";
import { ThreeDotsLoading } from "components/Loaders";
import { GetServerSideProps } from "next";
import { withIronSessionSsr } from "iron-session/next";
import Image from "next/legacy/image";
import Link from "next/link";
import { useUser } from "components/useUser";
import { UpdateUserProfileModal } from "components/Modal/UpdateUserProfileModal";

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(({ req, res }) => {
	const { user } = req.session;
	if (!user?.isLoggedIn) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
}, sessionOptions);

const Profile = () => {
	const { user } = useUser();
	const { reservations } = UseReservationsContext();
	const account = user?.account;

	if (!account) return <ThreeDotsLoading />;

	return (
		<section className="mb-20 pt-16">
			<div className="mx-auto w-full px-4 lg:w-1/2">
				<div className="relative mb-6 mt-16 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-xl dark:bg-blue-dark">
					<div className="flex flex-wrap justify-center">
						<div className="mb-20 flex w-full justify-center px-4">
							<div className="absolute top-[-80px] flex h-auto max-w-[150px] flex-col items-center gap-4 rounded-full border-none">
								<Image
									alt="user logo"
									src={account.imageUrl}
									height={150}
									width={150}
									className="rounded-full border-none"
								/>
								<UpdateUserProfileModal />
							</div>
						</div>
						<div className="mt-10 w-full px-4 text-center">
							<div className="flex justify-center py-4 lg:pt-4">
								<Link
									href="/restaurant/upcoming-reservations"
									className="mr-4 p-3 text-center underline-offset-8 hover:underline dark:text-gray-200"
								>
									<span className="block text-xl font-bold uppercase tracking-wide">
										{
											// @ts-ignore:next-line
											reservations?.length || 0
										}
									</span>
									<span className="text-sm text-gray-500 dark:text-blue-200">Upcoming Reservations</span>
								</Link>
								<Link
									href="/restaurant/saved-restaurants"
									className="mr-4 p-3 text-center underline-offset-8 hover:underline dark:text-gray-200"
								>
									<span className="block text-xl font-bold uppercase tracking-wide">
										{
											// @ts-ignore:next-line
											account?.savedRestaurant?.length || 0
										}
									</span>
									<span className="text-sm text-gray-500 dark:text-blue-200">Saved Restaurants</span>
								</Link>
							</div>
						</div>
					</div>
					<div className="my-8 text-center">
						<h3 className="mb-2 text-xl font-semibold leading-normal dark:text-gray-200">
							{`${account.firstName} ${account.lastName}`}
						</h3>
						<div className="mt-0 mb-2 text-sm font-bold leading-normal text-gray-500 dark:text-blue-200">
							{account.email}
						</div>
						<div className="mt-0 mb-2 text-sm font-bold uppercase leading-normal text-gray-500 dark:text-blue-200">
							{account.phoneNumber}
						</div>
						<div className="mt-0 mb-2 text-sm font-bold uppercase leading-normal text-gray-500 dark:text-blue-200">
							{account.address}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Profile;
