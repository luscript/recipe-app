import React, {createContext, JSX, useContext, useState} from 'react';
import {UserType} from "../domain/UserType.ts";
import {UserContextType} from "../domain/UserContextType.ts";
import { getUser } from "../services/userService.tsx";

const UserContext = createContext({} as UserContextType);
export const useUserContext = () => useContext(UserContext);
export const UserContextProvider = ({children}: { children: JSX.Element }) => {

    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getUser(token).then((response) => {
                const res = (response as AxiosResponse);
                res.data ? setUser({token, email: res.data.email}) : setUser(null);
            }).finally(() => setLoading(false))
        }
    }, []);
    const contextLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    }
    const contextLogin = () => {
        const token = localStorage.getItem('token');
        if (token) {
            getUser(token).then((response) => {
                const res = (response as AxiosResponse);
                res.data ? setUser({token, email: res.data.email}) : setUser(null);
            })
        }
    };

    return (
        <UserContext.Provider value={{user, contextLogout, contextLogin, loading}}>
            {children}
        </UserContext.Provider>
    );
}

