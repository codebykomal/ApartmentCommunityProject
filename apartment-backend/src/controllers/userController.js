const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");


// Register User
const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;


    const hashedPwd = await bcrypt.hash(password, 10);


    const user = new User({

      name,
      email,
      password: hashedPwd,

    });


    await user.save(); 
    //database operation that may take time so await and sync


    res.status(201).json({

      message: "User Registered Successfully",

    });


  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};




// Login User
const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;


    const user = await User.findOne({ email });


    if (!user) {

      return res.status(404).json({

        message:"User not found"

      });

    }



    const isMatch = await bcrypt.compare(password, user.password);



    if (!isMatch) {

      return res.status(401).json({

        message:"Invalid password"

      });

    }



    const token = generateToken(user);



    // logic before bcrypt
    // if(user.password !== password)
    // {
    //   return res.status(401).json({
    //     message:"Invalid password"
    //   });
    // }


    res.status(200).json({

      message:"Login successful",

      token,

      user

    });



  } catch(error) {


    res.status(500).json({

      message:error.message

    });


  }

};





// Get All Users
// Only ADMIN can access this route
const getAllUsers = async(req,res)=>{

  try{


    const users = await User.find()
    .select("-password");


    res.json(users);


  }
  catch(error){


    res.status(500).json({

      message:error.message

    });


  }

};







// Update Resident Details
const updateUser = async(req,res)=>{


  try{

    const {name,email,role} = req.body;
    const user = await User.findByIdAndUpdate(

      req.params.id,
      {

        name,
        email,
        role

      },

      {
        new:true
      }

    ).select("-password");

    if(!user){

      return res.status(404).json({

        message:"User not found"

      });

    }

    res.json({

      message:"User updated successfully",

      user

    });



  }
  catch(error){


    res.status(500).json({

      message:error.message

    });


  }


};








// Deactivate Resident
// User DB se delete nahi hoga
// Sirf active false hoga
// Apartment aur complaint history safe rahegi

const deactivateUser = async(req,res)=>{


  try{
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        active:false
      },
      {
        new:true
      }
    );

    if(!user){


      return res.status(404).json({

        message:"User not found"

      });


    }

    res.json({

      message:"User deactivated successfully"

    });

  }
  catch(error){


    res.status(500).json({

      message:error.message

    });


  }


};

const getProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user.id)
    .select("-password");
    if(!user)
    {
        return res.status(404).json({

            message:"User not found"

        });

    }

    //req.user.id - JWT payload ka id field
    //user._id - MongoDB document ki actual _id
    // Humne token banate time dono ko connect kiya tha:id: user._id
    //isliye dono same value hain.


    res.json(user);


  } catch (error) {


    res.status(500).json({

      message: error.message

    });


  }

};

const createAdmin = async(req,res)=>{


    try{


        const {name,email,password}=req.body;


        const hashedPwd = await bcrypt.hash(password,10);



        const admin = new User({

        name,

        email,

        password:hashedPwd,

        role:"ADMIN"

        });



        await admin.save();



        res.status(201).json({

          message:"Admin created successfully"

        });



    }
    catch(error){


      res.status(500).json({

        message:error.message

      });


    }


};







module.exports = {

  registerUser,

  loginUser,

  getAllUsers,

  updateUser,

  deactivateUser,

  getProfile,

  createAdmin

};