//auth.js = browser storage manage karta hai

//Login se token aati hai → AuthContext manage karta hai → auth.js store karta hai.
const TOKEN_KEY = "token";
const ROLE_KEY = "role";


export const saveToken = (token) => {

    localStorage.setItem(
        TOKEN_KEY,
        token
    );

};


export const getToken = () => {

    return localStorage.getItem(
        TOKEN_KEY
    );

};


export const removeToken = () => {

    localStorage.removeItem(
        TOKEN_KEY
    );

};


export const saveRole = (role) => {

    localStorage.setItem(
        ROLE_KEY,
        role
    );

};


export const getRole = () => {

    return localStorage.getItem(
        ROLE_KEY
    );

};


export const removeRole = () => {

    localStorage.removeItem(
        ROLE_KEY
    );

};


export const isLoggedIn = () => {

    return !!getToken();

};