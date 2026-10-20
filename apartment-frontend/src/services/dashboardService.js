import api from "../api/axios";


const getDashboardStats = () => {

    return api.get("/dashboard");

};


export default {

    getDashboardStats

};