import { createContext, ReactNode, useEffect, useState, useContext } from "react";
import { UserSession } from "types";
import axios from "axios";

interface UserSessionContextState {
    userSession?: UserSession
    setSession: (userSession: UserSession) => void
}

const UserSessionContext = createContext({} as UserSessionContextState);

const UserSessionContextProvider = ({ children }: { children: ReactNode }) => {
    const [userSession, setUserSession] = useState<UserSession>();
    useEffect(() => {
        const fetchData = async () => {
            await axios.get("/api/user")
                .then((res) => setUserSession(res.data))
                // .then((res) => console.log("CATCH", res))
                .catch(() => console.log("An error occurred"));
        };
        fetchData();
    }, []);

    const setSession = (val: UserSession) => {
        setUserSession(val)
    }

    const value = {
        userSession, setSession
    }
    return (
        <UserSessionContext.Provider value={value}>
            {children}
        </UserSessionContext.Provider>
    )
}

const useUserSession = () => {
    const context = useContext(UserSessionContext);
    if (!context) {
        throw new Error('Unable to set user session');
    }
    return context;
}

export { UserSessionContextProvider, useUserSession };