import { Reservation } from 'types';
import { useUserSession } from 'contexts/UserSessionContext';
import { createContext, ReactNode, useContext } from 'react';
import useSWR from 'swr';

interface ReservationsContextState {
  reservations: Reservation[];
  error: string;
  mutate: () => void;
}

const ReservationsContext = createContext({} as ReservationsContextState);
const ReservationsContextProvider = ({ children }: { children: ReactNode }) => {
  const { userSession } = useUserSession();
  const accountId = userSession?.account?.id;
  const token = userSession?.token;

  const {
    data: reservationData,
    error,
    mutate,
  } = useSWR(
    token
      ? [`${process.env.NEXT_PUBLIC_BASE_URL}/reservations/${accountId}`, token]
      : null,
  );
  const value = {
    reservations: reservationData?.reservations,
    error,
    mutate,
  };
  return (
    <ReservationsContext.Provider value={value}>
      {children}
    </ReservationsContext.Provider>
  );
};

const useReservationsContext = () => {
  const context = useContext(ReservationsContext);
  if (!context) {
    throw new Error('Unable to set user session');
  }
  return context;
};

export { ReservationsContextProvider, useReservationsContext };
