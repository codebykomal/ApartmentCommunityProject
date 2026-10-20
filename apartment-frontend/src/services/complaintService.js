import api from "../api/axios";



const getAllComplaints = () => {

    return api.get("/complaints");

};



const getMyComplaints = () => {

    return api.get("/complaints/my");

};



const getComplaintById = (id) => {

    return api.get(`/complaints/${id}`);

};



const createComplaint = (complaint) => {

    return api.post(

        "/complaints",

        complaint,

        {
            headers:{

                "Content-Type":"multipart/form-data"

            }
        }

    );

};




const updateComplaint = (id, complaint) => {
    
    return api.put(

        `/complaints/${id}/status`,

        complaint

    );

};



const deleteComplaint = (id) => {

    return api.delete(`/complaints/${id}`);

};



export default {

    getAllComplaints,

    getMyComplaints,

    getComplaintById,

    createComplaint,

    updateComplaint,

    deleteComplaint

};