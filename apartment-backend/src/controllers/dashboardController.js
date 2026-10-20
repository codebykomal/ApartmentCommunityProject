// const User = require("../models/User");
// const Apartment = require("../models/Apartment");
// const Complaint = require("../models/Complaint");


// const getDashboardStats = async(req,res)=>{

//     try{

//         const totalUsers = await User.countDocuments();

//         const totalApartments = await Apartment.countDocuments();

//         const totalComplaints = await Complaint.countDocuments();


//         const pendingComplaints = await Complaint.countDocuments({
//             status:"OPEN"
//         });


//         const resolvedComplaints = await Complaint.countDocuments({
//             status:"RESOLVED"
//         });


//         res.status(200).json({

//             totalUsers,
//             totalApartments,
//             totalComplaints,
//             pendingComplaints,
//             resolvedComplaints

//         });


//     }
//     catch(error){

//         res.status(500).json({

//             message:error.message

//         });

//     }

// };



// module.exports = {
//     getDashboardStats
// };

const User = require("../models/User");
const Apartment = require("../models/Apartment");
const Complaint = require("../models/Complaint");
const Notice = require("../models/Notice");



// ADMIN DASHBOARD

const getDashboardStats = async(req,res)=>{

    try{


        const totalUsers = await User.countDocuments();


        const totalApartments = await Apartment.countDocuments();


        const totalComplaints = await Complaint.countDocuments();



        const pendingComplaints = await Complaint.countDocuments({
            status:"OPEN"
        });



        const resolvedComplaints = await Complaint.countDocuments({
            status:"RESOLVED"
        });



        const totalNotices = await Notice.countDocuments();




        res.status(200).json({


            totalUsers,

            totalApartments,

            totalComplaints,

            pendingComplaints,

            resolvedComplaints,

            totalNotices


        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







// RESIDENT DASHBOARD

const getResidentDashboard = async(req,res)=>{

    try{


        const userId = req.user.id;



        const apartment = await Apartment.findOne({
            owner:userId
        });



        const complaints = await Complaint.find({
            raisedBy:userId
        });




        res.status(200).json({


            apartment,

            complaints


        });



    }
    catch(error){


        res.status(500).json({

            message:error.message

        });


    }


};







module.exports = {


    getDashboardStats,

    getResidentDashboard


};