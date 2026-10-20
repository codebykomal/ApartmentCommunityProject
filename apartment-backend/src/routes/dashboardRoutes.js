const express = require("express");

const router = express.Router();


const { 
    getDashboardStats,
    getResidentDashboard
} = require("../controllers/dashboardController");


const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");



// ADMIN DASHBOARD

router.get(

    "/",

    authMiddleware,

    roleMiddleware("ADMIN"),

    getDashboardStats

);




// RESIDENT DASHBOARD

router.get(

    "/resident",

    authMiddleware,

    roleMiddleware("RESIDENT"),

    getResidentDashboard

);



module.exports = router;