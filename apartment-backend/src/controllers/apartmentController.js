const Apartment = require("../models/Apartment");
const User = require("../models/User");


// CREATE APARTMENT
const createApartment = async (req, res) => {
    //console.log("CREATE APARTMENT API HIT");
    try {

        const { flatNumber, block, floor, owner } = req.body;


        // Check duplicate apartment
        const existingApartment = await Apartment.findOne({
            flatNumber
        });


        if (existingApartment) {
            return res.status(400).json({
                message: "Apartment already exists"
            });
        }


        // Check owner exists
        const ownerExists = await User.findById(owner);


        if (!ownerExists) {
            return res.status(404).json({
                message: "Owner not found"
            });
        }


        const apartment = new Apartment({//model se obj banaya
            flatNumber,
            block,
            floor,
            owner
        });


        await apartment.save();


        res.status(201).json({
            message: "Apartment created successfully",
            apartment
        });


    } 
    catch(error) {

    console.log("CREATE APARTMENT ERROR =====>", error);

    return res.status(500).json({
        message: error.message,
        error: error
    });

}

};



// READ ALL APARTMENTS
const getAllApartments = async (req, res) => {

    try {

        const apartments = await Apartment.find()
            .populate("owner", "name email role");
        /*populate() MongoDB ki do collections ke beech jo reference hai usko 
        follow karke related document ka data laata hai.
        Matlab:ID ko actual object/data se replace kar deta hai.*/

        res.status(200).json(apartments);


    }
    catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// READ SINGLE APARTMENT
const getApartmentById = async (req, res) => {

    try {


        const apartment = await Apartment.findById(req.params.id)
            .populate("owner", "name email role");


        if(!apartment) {

            return res.status(404).json({
                message:"Apartment not found"
            });

        }


        res.status(200).json(apartment);


    }
    catch(error) {

        res.status(500).json({
            message:error.message
        });

    }

};



// UPDATE APARTMENT
const updateApartment = async (req, res) => {

    try {


        const apartment = await Apartment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true
            }
        );


        if(!apartment) {

            return res.status(404).json({
                message:"Apartment not found"
            });

        }


        res.status(200).json({
            message:"Apartment updated successfully",
            apartment
        });


    }
    catch(error) {

        res.status(500).json({
            message:error.message
        });

    }

};



// DELETE APARTMENT
const deleteApartment = async (req, res) => {

    try {


        const apartment = await Apartment.findByIdAndDelete(
            req.params.id
        );


        if(!apartment) {

            return res.status(404).json({
                message:"Apartment not found"
            });

        }


        res.status(200).json({
            message:"Apartment deleted successfully"
        });


    }
    catch(error) {

        res.status(500).json({
            message:error.message
        });

    }

};

const getMyApartment=async(req,res)=>
{
    try{
        //Mujhe wo apartment do jiske owner field me ye user ID hai.
        const apartment=await Apartment.findOne({owner:req.user.id}).populate("owner","name email role");

        if(!apartment)
        {
            return res.status(404).json({message:"Apartment not found"});
        }

        res.status(200).json(apartment);
    }catch(error)
    {
        res.status(500).json({
            message:error.message
        });
    }
}

module.exports = {
    createApartment,
    getAllApartments,
    getApartmentById,
    updateApartment,
    deleteApartment,
    getMyApartment
};
/*
findById()
↓
Mere paas document ki _id hai


findOne()
↓
Mujhe kisi field ke basis pe document dhundhna hai*/