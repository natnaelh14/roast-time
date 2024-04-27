import { SaveIcon } from "components/icons";
import { Rating } from "components/Rating";
import { useUser } from "components/useUser";
import Image from "next/legacy/image";
import Link from "next/link";

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
	const token = !!user?.token;

	return (
		<div>
			{imageData && (
				<Link href={`/restaurant/${id}`} className="hover:cursor-pointer">
					<div className="m-8 w-[250px] rounded-lg border border-gray-200 p-1 shadow-lg transition delay-150 ease-in-out hover:scale-105 dark:border-gray-secondary">
						<Image alt="shopping-item" src={imageData[0] || ""} width={250} height={200} />
						<div className="m-2">
							<div className="flex flex-row items-center justify-between">
								<p className="text-base font-extrabold dark:text-white">{name}</p>
								{token && <SaveIcon restaurantId={id} refreshSavedRestaurants={refreshSavedRestaurants} />}
							</div>
							<Rating />
							<p className="text-sm text-gray-500 dark:text-gray-300">{category}</p>
							<p className="text-sm text-gray-500 dark:text-gray-300">{`${address}`}</p>
						</div>
					</div>
				</Link>
			)}
		</div>
	);
};
