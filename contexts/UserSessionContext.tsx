import { UserSession, SessionAccount } from "types";
import { createContext, ReactNode, useEffect, useState, useContext, Dispatch, SetStateAction, useMemo } from "react";
import axios from "axios";
import useSWR from "swr";

interface UserSessionContextState {
	userSession?: UserSession;
	setUserSession: Dispatch<SetStateAction<UserSession>>;
	refreshAccount?: () => void;
}

const UserSessionContext = createContext({} as UserSessionContextState);

const UserSessionContextProvider = ({ children }: { children: ReactNode }) => {
	const [userSession, setUserSession] = useState<UserSession>({ isLoggedIn: false });
	const token = userSession?.token;
	const accountId = userSession?.account?.id;

	const { data: accountData, mutate: refreshAccount } = useSWR<{ account: SessionAccount }>(
		accountId ? [`${process.env.NEXT_PUBLIC_BASE_URL}/account/${accountId}`, token] : null,
	);
	useEffect(() => {
		const fetchData = async () => {
			if (userSession?.isLoggedIn) {
				const res = await axios
					.post<UserSession>("/api/mutate-user", {
						account: accountData?.account,
					})
					.catch((e) => console.error("mutate user error", e));
				if (res?.data !== undefined) {
					setUserSession(res.data);
				}
			} else {
				const { data } = await axios.get<UserSession>("/api/user");
				setUserSession(data);
			}
		};
		void fetchData();
	}, [accountData, userSession?.isLoggedIn]);

	const value = useMemo(
		() => ({
			userSession,
			setUserSession,
			refreshAccount,
		}),
		[userSession, setUserSession, refreshAccount],
	);

	return <UserSessionContext.Provider value={value}>{children}</UserSessionContext.Provider>;
};

const UseUserSession = () => {
	const context = useContext(UserSessionContext);
	if (!context) {
		throw new Error("Unable to set user session");
	}
	return context;
};

export { UserSessionContextProvider, UseUserSession };
