import axios from "axios";//library that helps Frontend se HTTP request bhejna.also provides extra features
import { getToken } from "../utils/auth";


const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json"
    }
});


api.interceptors.request.use(
    (config) => {

        const token = getToken();

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


export default api;
/*
Config Axios ke andar request ki settings ka object hai.
 Interceptor us config ko modify karta hai (jaise token add karna), 
 fir Axios us modified config se actual API request bhejta hai. */