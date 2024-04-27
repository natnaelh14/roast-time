import EmptyState from "components/EmptyState/EmptyState";
import { RestaurantCard } from "components/home/RestaurantCard";
import { DashboardLoading, ThreeDotsLoading } from "components/loaders";
import { useRestaurantContext } from "contexts/RestaurantsContext";
import { Restaurant } from "types";

const Dashboard = () => {
	const { restaurantsData, error, restaurantSearch } = useRestaurantContext();
	const restaurants = restaurantsData?.restaurants;

	if (!restaurants && !error && !restaurantSearch?.length) return <DashboardLoading />;
	if (!restaurants && !error && restaurantSearch?.length) return <ThreeDotsLoading />;
	if (error) return <EmptyState message="No restaurants found" />;

	return (
		<div className="mt-5 flex flex-row overflow-x-scroll md:flex-wrap md:justify-center md:overflow-auto">
			{restaurants?.map((item: Restaurant) => {
				return (
					<RestaurantCard
						key={item.id}
						id={item.id}
						name={item.name}
						imageData={item.imageData}
						address={item.address}
						category={item.category}
					/>
				);
			})}
		</div>
	);
};

export default Dashboard;
