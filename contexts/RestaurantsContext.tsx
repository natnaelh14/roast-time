import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState } from "react";
import useSWR, { KeyedMutator } from "swr";
import { Restaurant } from "types";

interface RestaurantSessionContextState {
	restaurantsData?: { restaurants: Restaurant[]; totalCount: number };
	mutateRestaurant: KeyedMutator<unknown>;
	error: string;
	restaurantSearch: string;
	setRestaurantSearch: Dispatch<SetStateAction<string>>;
	pageCount: number;
	setPageCount: Dispatch<SetStateAction<number>>;
}

const RestaurantContext = createContext({} as RestaurantSessionContextState);
const RestaurantContextProvider = ({ children }: { children: ReactNode }) => {
	const [restaurantSearch, setRestaurantSearch] = useState<string>("");
	const [pageCount, setPageCount] = useState<number>(1);
	const {
		data: restaurantsData,
		error,
		mutate,
	} = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/restaurants/${pageCount}/${restaurantSearch}`);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const value = useMemo(
		() => ({
			restaurantsData,
			mutateRestaurant: mutate,
			error,
			restaurantSearch,
			setRestaurantSearch,
			pageCount,
			setPageCount,
		}),
		[restaurantsData, mutate, error, restaurantSearch, pageCount],
	);
	return <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>;
};

const useRestaurantContext = () => {
	const context = useContext(RestaurantContext);
	if (!context) {
		throw new Error("Unable to set user session");
	}
	return context;
};

export { RestaurantContextProvider, useRestaurantContext };
