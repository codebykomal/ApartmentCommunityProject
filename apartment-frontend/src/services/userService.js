import api from "../api/axios";


const login = (credentials) => {
    return api.post("/users/login", credentials);
};

const register = (user) => {
    return api.post("/users/register", user);
};

const getProfile = () => {
    return api.get("/users/profile");
};

const getAllUsers = () => {
    return api.get("/users");
};

const updateProfile = (user) => {
    return api.put("/users/profile", user);
};


// Get Single Resident By Id
// Admin edit karte time specific resident ka data lene ke liye
const getResidentById = (id) => {
    return api.get(`/users/${id}`);
};


// Update Resident Details
// Admin resident ka name,email,role update kar sakta hai
const updateResident = (id, user) => {
    return api.put(`/users/${id}`, user);
};


// Deactivate Resident
// Database se delete nahi hoga
// Sirf active false hoga
const deleteResident = (id) => {
    return api.delete(`/users/${id}`);
};


export default {
    login,
    register,
    getProfile,
    updateProfile,
    getAllUsers,
    getResidentById,
    updateResident,
    deleteResident
};
/*userService.js → API call banata hai
Login.jsx → user ka data leta hai aur service ko deta hai
axios.js → request ko backend tak bhejta hai*/