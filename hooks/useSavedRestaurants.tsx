import useSWR from "swr";

import { fetcher } from "adapters/fetcher";
import { useUser } from "components/useUser";
import { Restaurant } from "types";

interface ISavedRestaurant {
	id: string;
	userId: string;
	restaurantId: string;
	restaurant: Restaurant;
}
export function useSavedRestaurants() {
	const { user } = useUser();
	const accountId = user?.account?.id;
	const token = user?.token;
	const url = `${process.env.NEXT_PUBLIC_BASE_URL}/saved-restaurants/${accountId}`;
	const shouldFetch = token && url;

	const response = useSWR<{ savedRestaurants: ISavedRestaurant[] }, Error>(
		shouldFetch ? [url, token] : null,
		([url, token]: [url: string, token: string]) => fetcher<{ savedRestaurants: ISavedRestaurant[] }>(url, token),
		{
			revalidateOnFocus: false,
		},
	);

	return { ...response, data: response.data?.savedRestaurants ?? [] };
}
