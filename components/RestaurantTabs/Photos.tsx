import { OverviewLoading } from "components/Loaders";
import ImageModal from "components/Modal/ImageModal";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Restaurant } from "types";

export const Photos = () => {
	const router = useRouter();
	const { id } = router.query;
	const { data: restaurant, error } = useSWR<Restaurant>(`${process.env.NEXT_PUBLIC_BASE_URL}/search/restaurant/${id}`);

	if (!restaurant && !error) return <OverviewLoading />;
	if (restaurant == undefined) return null;

	return (
		<div className="my-5 flex flex-wrap justify-around">
			{restaurant.imageData.map((image: string, i: number) => {
				return (
					<div className="m-4" key={i}>
						<ImageModal imageUrl={image} />
					</div>
				);
			})}
		</div>
	);
};
