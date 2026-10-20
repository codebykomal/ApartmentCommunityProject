import api from "../api/axios";


const getAllResidents = () => {
    return api.get("/users");
};


const getResidentById = (id) => {
    return api.get(`/users/${id}`);
};


const updateResident = (id, user) => {
    return api.put(`/users/${id}`, user);
};


const deleteResident = (id) => {
    return api.delete(`/users/${id}`);
};


export default {
    getAllResidents,
    getResidentById,
    updateResident,
    deleteResident
};