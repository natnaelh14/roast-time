import { ThreeDotsLoading } from "components/loaders";
import { UpdateUserProfileModal } from "components/Modal/UpdateUserProfileModal";
import { useUser } from "components/useUser";
import { useUpcomingReservations } from "hooks/useUpcomingReservations";
import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import Image from "next/legacy/image";
import Link from "next/link";
import { sessionOptions } from "utils/config";

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
	const { data: reservations } = useUpcomingReservations();
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
						<div className="mt-16 flex w-full justify-center p-4 text-center text-gray-500 dark:text-gray-200 lg:pt-4">
							<div>
								<span className="block text-xl font-bold uppercase tracking-wide">{reservations?.length ?? 0}</span>
								<Link
									href="/restaurant/upcoming-reservations"
									className="text-center underline-offset-8 hover:underline "
								>
									<span className="text-sm">Upcoming Reservations</span>
								</Link>
							</div>
							<div>
								<span className="block text-xl font-bold uppercase tracking-wide">
									{account?.savedRestaurant?.length ?? 0}
								</span>
								<Link
									href="/restaurant/saved-restaurants"
									className="p-3 text-center underline-offset-8 hover:underline"
								>
									<span className="text-sm">Saved Restaurants</span>
								</Link>
							</div>
						</div>
					</div>
					<div className="my-8 text-center">
						<h3 className="mb-2 text-xl font-semibold leading-normal dark:text-gray-200">
							{`${account.firstName} ${account.lastName}`}
						</h3>
						<div className="mb-2 mt-0 text-sm font-bold leading-normal text-gray-500 dark:text-blue-200">
							{account.email}
						</div>
						<div className="mb-2 mt-0 text-sm font-bold uppercase leading-normal text-gray-500 dark:text-blue-200">
							{account.phoneNumber}
						</div>
						<div className="mb-2 mt-0 text-sm font-bold uppercase leading-normal text-gray-500 dark:text-blue-200">
							{account.address}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Profile;
