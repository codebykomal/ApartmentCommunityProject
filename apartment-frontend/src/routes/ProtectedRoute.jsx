import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";


const ProtectedRoute = ({ children }) => {

    if(!isLoggedIn()){
        return <Navigate to="/authentication/login" replace />;//replace = purana route history se hata kar route change karo.
    }

    return children;
};


export default ProtectedRoute;