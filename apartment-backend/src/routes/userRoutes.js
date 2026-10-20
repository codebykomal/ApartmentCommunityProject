const express=require("express");


// Importing all controller functions
const { 
    registerUser, 
    loginUser, 
    getAllUsers, 
    getProfile, 
    createAdmin,
    updateUser,
    deactivateUser

} = require("../controllers/userController");


// Middleware for checking JWT token
const authMiddleware = require("../middleware/authMiddleware");


// Middleware for checking user role (ADMIN/RESIDENT)
const roleMiddleware = require("../middleware/roleMiddleware");


const router=express.Router();



// Register User
// Public route because user login se pehle register karega

router.post("/register",registerUser);

// Login User
// Public route because token login ke baad generate hota hai

router.post("/login",loginUser);
// Get All Users
// router.get("/",getAllUsers); no security,


// will protect it bcz after login token is generated it gives all users


// Only ADMIN can see all users

router.get("/",

    authMiddleware,

    roleMiddleware("ADMIN"),

    getAllUsers

);

// Get Logged In User Profile

router.get("/profile",

    authMiddleware,

    getProfile

);





// Create Admin
// Only existing ADMIN can create another ADMIN

router.post("/create-admin",

    authMiddleware,

    roleMiddleware("ADMIN"),

    createAdmin

);







// Update Resident Details
// Admin resident ka name,email,role update kar sakta hai

// PUT /users/:id

router.put("/:id",

    authMiddleware,

    roleMiddleware("ADMIN"),

    updateUser

);







// Deactivate Resident
// User ko database se delete nahi karenge
// Sirf active field false hogi
// Isse apartment aur complaint history safe rahegi

// DELETE /users/:id

router.delete("/:id",

    authMiddleware,

    roleMiddleware("ADMIN"),

    deactivateUser

);



module.exports=router;