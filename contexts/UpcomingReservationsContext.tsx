import { Reservation } from 'types';
import { getSession } from 'components/api/api';
import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from 'react';
import useSWR from 'swr';

interface ReservationsContextState {
  reservations: Reservation[];
  error: string;
  mutate: () => void;
}

const ReservationsContext = createContext({} as ReservationsContextState);
const ReservationsContextProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>('');
  const [accountId, setAccountId] = useState<string>('');
  useEffect(() => {
    const fetchData = async () => {
      await getSession().then((res) => {
        // eslint-disable-next-line promise/always-return
        if (res.data?.token) {
          setToken(res.data?.token);
          setAccountId(res.data?.account?.id);
        }
      });
    };
    fetchData();
  }, []);

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
