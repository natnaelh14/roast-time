import useSWR from "swr";
import { UserSession } from "types";

export const useUser = () => {
	const { data: user, ...rest } = useSWR<UserSession>("/api/user");
	return { user, ...rest };
};
