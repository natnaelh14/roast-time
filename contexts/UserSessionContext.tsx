import { UserSession } from 'types';
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from 'react';
import axios from 'axios';
import useSWR from 'swr';

interface UserSessionContextState {
  userSession?: UserSession;
  setSession: (userSession: UserSession) => void;
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
  console.log(
    '🚀 ~ file: UserSessionContext.tsx:30 ~ UserSessionContextProvider ~ accountData',
    accountData,
  );
  useEffect(() => {
    const fetchData = async () => {
      console.log('resttesgsefgdf', userSession);
      console.log('resttesgsefgdf', accountData);

      if (
        // accountData.length &&
        userSession?.account?.savedRestaurant !==
        accountData?.account?.savedRestaurant
      ) {
        const { data: userSessionData } = await axios.post('/api/mutate-user', {
          account: accountData?.account,
        });
        console.log(
          '🚀 ~ file: UserSessionContext.tsx:49 ~ fetchData ~ userSessionData',
          userSessionData,
        );

        setUserSession(userSessionData);
      } else if (!userSession) {
        const { data } = await axios.get('/api/user');
        setUserSession(data);
      }
    };
    fetchData();
  }, [accountData]);

  const setSession = (val: UserSession) => {
    setUserSession(val);
  };

  const value = {
    userSession,
    setSession,
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
