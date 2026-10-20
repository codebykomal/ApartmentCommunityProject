const express = require("express");
const router = express.Router();

const {
    createComplaint,
    getAllComplaints,
    getMyComplaints,
    updateComplaintStatus,
    deleteComplaint
} = require("../controllers/complaintController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const upload = require("../middleware/upload");


router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    createComplaint
);


router.get(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    getAllComplaints
);


router.get(
    "/my",
    authMiddleware,
    roleMiddleware("RESIDENT"),
    getMyComplaints
);


router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    deleteComplaint
);


router.put(
    "/:id/status",
    authMiddleware,
    roleMiddleware("ADMIN"),
    updateComplaintStatus
);

module.exports = router;