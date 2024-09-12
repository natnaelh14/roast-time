import useSWR from "swr";

import { fetcher } from "adapters/fetcher";
import { useUser } from "components/useUser";
import { Reservation } from "types";

export function useUpcomingReservations() {
	const { user } = useUser();
	const accountId = user?.account?.id;
	const token = user?.token;
	const url = `${process.env.NEXT_PUBLIC_BASE_URL}/reservations/${accountId}`;
	const shouldFetch = token && url;

	const response = useSWR<{ reservations: Reservation[] }, Error>(
		shouldFetch ? [url, token] : null,
		([url, token]: [url: string, token: string]) => fetcher<{ reservations: Reservation[] }>(url, token),
		{
			revalidateOnFocus: false,
		},
	);

	return { ...response, data: response.data?.reservations ?? [] };
}
