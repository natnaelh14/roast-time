import { Map, Marker } from "@vis.gl/react-google-maps";
import { useRouter } from "next/router";
import useSWR from "swr";

export const Maps = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data: restaurant, error } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/search/restaurant/${id}`);
	if (!restaurant && !error) return null;

	return (
		<div className="w-full">
			<Map
				style={{ width: "100%", height: "400px" }}
				defaultCenter={{ lat: restaurant.latitude, lng: restaurant.longitude }}
				defaultZoom={12}
				gestureHandling={"greedy"}
				disableDefaultUI={true}
			>
				<Marker position={{ lat: 53.54992, lng: 10.00678 }} />
			</Map>
		</div>
	);
};
