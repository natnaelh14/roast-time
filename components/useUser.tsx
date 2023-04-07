import useSWR from "swr";
import { UserSession } from "types";

export const useUser = () => {
	const { data: user, mutate: userMutate, ...rest } = useSWR<UserSession>("/api/user");
	return { user, userMutate, ...rest };
};
