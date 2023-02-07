import { UserSession } from 'types';
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import axios from 'axios';
import useSWR from 'swr';

interface UserSessionContextState {
  userSession?: UserSession;
  setUserSession: Dispatch<SetStateAction<UserSession | undefined>>;
  refreshAccount?: () => void;
}

const UserSessionContext = createContext({} as UserSessionContextState);

const UserSessionContextProvider = ({ children }: { children: ReactNode }) => {
  const [userSession, setUserSession] = useState<UserSession>();
  const token = userSession?.token;
  const accountId = userSession?.account?.id;

  const {
    data: accountData,
    error,
    mutate: refreshAccount,
  } = useSWR(
    accountId
      ? [`${process.env.NEXT_PUBLIC_BASE_URL}/account/${accountId}`, token]
      : null,
  );
  useEffect(() => {
    const fetchData = async () => {
      if (userSession?.isLoggedIn) {
        const res = await axios
          .post('/api/mutate-user', {
            account: accountData?.account,
          })
          .catch((e) => console.error('mutate user error', e));
        setUserSession(res?.data);
      } else {
        const { data } = await axios.get('/api/user');
        setUserSession(data);
      }
    };
    fetchData();
  }, [accountData]);

  const value = {
    userSession,
    setUserSession,
    refreshAccount,
  };
  return (
    <UserSessionContext.Provider value={value}>
      {children}
    </UserSessionContext.Provider>
  );
};

const useUserSession = () => {
  const context = useContext(UserSessionContext);
  if (!context) {
    throw new Error('Unable to set user session');
  }
  return context;
};

export { UserSessionContextProvider, useUserSession };
