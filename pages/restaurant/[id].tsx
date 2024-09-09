import { APIProvider } from "@vis.gl/react-google-maps";
import Banner from "components/Banner/Banner";
import { Reservation } from "components/Reservation/Reservation";
import RestaurantTabs from "components/RestaurantTabs/RestaurantTabs";

const Restaurants = () => {
	return (
		<>
			<Banner title="Lets find you a table for any occasion" />
			<div className="my-5 flex flex-col items-center xl:flex-row xl:items-start xl:justify-around">
				<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}>
					<RestaurantTabs />
				</APIProvider>
				<Reservation />
			</div>
		</>
	);
};

export default Restaurants;
