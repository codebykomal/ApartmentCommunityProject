// "Login function token aur role ko AuthContext ki state me set karta hai. 
//AuthProvider ki state me set hota hai, aur Provider us state ko AuthContext ke through puri application me provide karta hai."
// Fir Sidebar role ko use karke menu decide karta hai."

//AuthContext.js = React application me authentication state manage karta hai
import React, { createContext, useContext, useState } from "react";

import {
    saveToken,
    getToken,
    removeToken,
    getRole
} from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(getToken());

    // const [role, setRole] = useState(
    //     localStorage.getItem("role")
    // );

    const [role, setRole] = useState(getRole());

    const login = (token, role) => {

        saveToken(token);

        localStorage.setItem(
            "role",
            role
        );

        setToken(token);

        setRole(role);

    };

    const logout = () => {

        removeToken();

        localStorage.removeItem("role");

        setToken(null);

        setRole(null);

    };

    return (

        <AuthContext.Provider

            value={{

                token,

                role,

                login,

                logout,

                isAuthenticated: !!token

            }}

        >

            {children}

        </AuthContext.Provider>

    );

};


//custom hook useAuth
export const useAuth = () => {

    return useContext(AuthContext);//eg login.jsx,will provide data that is inside authcontext and can easily used like this const {role} = useAuth();

};