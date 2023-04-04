import { Reservation } from "types";
import { UseUserSession } from "contexts/UserSessionContext";
import { createContext, ReactNode, useContext } from "react";
import useSWR from "swr";

interface ReservationsContextState {
	reservations: Reservation[];
	error: string;
	mutate: () => void;
}

const ReservationsContext = createContext({} as ReservationsContextState);
const ReservationsContextProvider = ({ children }: { children: ReactNode }) => {
	const { userSession } = UseUserSession();
	const accountId = userSession?.account?.id;
	const token = userSession?.token;

	const {
		data: reservationData,
		error,
		mutate,
	} = useSWR<{ reservations: Reservation[] }>(
		token ? [`${process.env.NEXT_PUBLIC_BASE_URL}/reservations/${accountId}`, token] : null,
	);
	const value = {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		reservations: reservationData?.reservations || [],
		error,
		mutate,
	};
	return <ReservationsContext.Provider value={value}>{children}</ReservationsContext.Provider>;
};

const UseReservationsContext = () => {
	const context = useContext(ReservationsContext);
	if (!context) {
		throw new Error("Unable to set user session");
	}
	return context;
};

export { ReservationsContextProvider, UseReservationsContext };
