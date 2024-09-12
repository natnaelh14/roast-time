import EmptyState from "components/EmptyState/EmptyState";
import { RestaurantCard } from "components/home/RestaurantCard";
import { ThreeDotsLoading } from "components/loaders";
import { useSavedRestaurants } from "hooks/useSavedRestaurants";
import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import { Restaurant } from "types";
import { sessionOptions } from "utils/config";

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(({ req, res }) => {
	const { user } = req.session;
	const accountId = user?.account?.id;
	const token = user?.token;
	const accountType = user?.account?.accountType;
	if (!user?.isLoggedIn) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	if (accountType === "RESTAURANT") {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	return {
		props: {
			accountId: accountId || null,
			token: token || null,
		},
	};
}, sessionOptions);

interface ISavedRestaurant {
	id: string;
	userId: string;
	restaurantId: string;
	restaurant: Restaurant;
}

const SavedRestaurants = () => {
	const { data: savedRestaurants, error, mutate: refreshSavedRestaurants } = useSavedRestaurants();
	if (!savedRestaurants && !error) return <ThreeDotsLoading />;
	if (error || savedRestaurants == undefined) return <EmptyState message="No saved restaurants found" />;

	return (
		<div className="my-10 min-h-160 text-3xl dark:text-white">
			<h1 className="p-6 text-center text-4xl text-brown-dark dark:text-brown-light">Saved Restaurants</h1>
			<div className="flex flex-row overflow-x-scroll md:flex-wrap md:justify-center md:overflow-auto">
				{savedRestaurants.map((savedRestaurant) => {
					return (
						<RestaurantCard
							key={savedRestaurant.id}
							id={savedRestaurant.restaurant.id}
							name={savedRestaurant.restaurant.name}
							imageData={savedRestaurant.restaurant.imageData}
							address={savedRestaurant.restaurant.address}
							category={savedRestaurant.restaurant.category}
							refreshSavedRestaurants={refreshSavedRestaurants}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default SavedRestaurants;
