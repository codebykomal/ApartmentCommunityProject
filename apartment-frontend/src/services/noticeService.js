import api from "../api/axios";

const getAllNotices = () => {
    return api.get("/notices");
};

const createNotice = (notice) => {
    return api.post("/notices", notice);
};

const updateNotice = (id, notice) => {
    return api.put(`/notices/${id}`, notice);
};

const deleteNotice = (id) => {
    return api.delete(`/notices/${id}`);
};

export default {
    getAllNotices,
    createNotice,
    updateNotice,
    deleteNotice
};