import api from "../api/axios";


const getAllApartments = () => {
    return api.get("/apartments");
};


const getApartmentById = (id) => {
    return api.get(`/apartments/${id}`);
};


const getMyApartment = () => {
    return api.get("/apartments/my");
};


const createApartment = (apartment) => {

    console.log("SERVICE DATA:", apartment);

    return api.post("/apartments", apartment);

};


const updateApartment = (id, apartment) => {

    console.log("UPDATE DATA:", apartment);

    return api.put(`/apartments/${id}`, apartment);

};


const deleteApartment = (id) => {
    return api.delete(`/apartments/${id}`);
};


export default {

    getAllApartments,

    getApartmentById,

    getMyApartment,

    createApartment,

    updateApartment,

    deleteApartment

};