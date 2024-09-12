import { Button } from "components/Button";
import { SaveIcon } from "components/icons";
import { Rating } from "components/Rating";
import { useUser } from "components/useUser";
import Image from "next/legacy/image";
import { useRouter } from "next/router";

interface ItemProps {
	id: string;
	name: string;
	address: string;
	category: string;
	imageData: string[];
	refreshSavedRestaurants?: () => void;
}

export const RestaurantCard = ({ id, name, imageData, address, category, refreshSavedRestaurants }: ItemProps) => {
	const { user } = useUser();
	const router = useRouter();
	const token = !!user?.token;

	return (
		<div>
			{imageData && (
				<div className="m-8 w-[250px] rounded-lg border border-gray-200 p-1 shadow-lg transition delay-150 ease-in-out dark:border-gray-secondary">
					<Image className="hover:scale-105" alt="shopping-item" src={imageData[0] ?? ""} width={250} height={200} />
					<div className="m-2">
						<div className="flex flex-row items-center justify-between">
							<p className="text-base font-extrabold dark:text-white">{name}</p>
							{token && <SaveIcon restaurantId={id} refreshSavedRestaurants={refreshSavedRestaurants} />}
						</div>
						<Rating />
						<p className="text-sm text-gray-500 dark:text-gray-300">{category}</p>
						<p className="text-sm text-gray-500 dark:text-gray-300">{`${address}`}</p>
						<Button className="mt-5 w-full" variant="primary" onClick={() => router.push(`/restaurant/${id}`)}>
							Reserve
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};
