// @ts-nocheck
import React, { createContext, useContext, useEffect, useState } from 'react'
import { verityTokenRequest } from '../service/userService';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("El useAuth deberia estar dentro de un AuthProvider")
    }
    return context;
}


export const AuthProvider = ({ children }) => {

    const [isAuthen, setIsAuthen] = useState(false);
    const [user, setUser] = useState(null);
    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()
            if (!cookies.token) {
                setIsAuthen(false);
                return;
            }
            try {
                const res = await verityTokenRequest(cookies.token)
                //console.log(res);
                if (res.status !== 200) {
                    setIsAuthen(false);
                    return;
                }
                setIsAuthen(true);
                setUser(res.data?.usuario);
            } catch (error) {
                setIsAuthen(false);
                return;
            }
        }

        checkLogin();
    }, []);
    return (
        <AuthContext.Provider value={{ isAuthen, setIsAuthen, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
