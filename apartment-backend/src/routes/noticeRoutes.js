const express = require("express");

const router = express.Router();


const {

    createNotice,
    getAllNotices,
    deleteNotice,
    updateNotice
} = require("../controllers/noticeController");


const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");



// Create Notice - Only Admin
router.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    createNotice
);



// Get All Notices - Admin + Resident
router.get(
    "/",
    authMiddleware,
    getAllNotices
);



// Delete Notice - Only Admin
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    deleteNotice
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    updateNotice
);



module.exports = router;