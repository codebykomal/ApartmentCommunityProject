const express = require("express");

const router = express.Router();

const { createApartment, updateApartment, getAllApartments, deleteApartment, getApartmentById, getMyApartment } = require("../controllers/apartmentController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Create Apartment (Only Admin)

router.post("/", authMiddleware, roleMiddleware("ADMIN"), createApartment);
router.get(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    getAllApartments
);
router.get(
  "/my",
  authMiddleware,
  getMyApartment
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    updateApartment
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    deleteApartment
);
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    getApartmentById
);



module.exports = router;
