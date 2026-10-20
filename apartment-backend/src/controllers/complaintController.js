const Apartment=require("../models/Apartment");
const Complaint=require("../models/Complaint");


const createComplaint=async(req,res)=>
{
    try{

        const {title,description,category,phoneNumber}=req.body;

        const phoneRegex=/^[0-9]{10}$/;

        if(!phoneRegex.test(phoneNumber))
        {
            return res.status(400).json({
                message:"Phone number must contain exactly 10 digits"
            });
        }

        const apartment=await Apartment.findOne({owner:req.user.id});


        if(!apartment)
        {
            return res.status(404).json({
                message:"Apartment not found"
            });
        }


        const complaint=new Complaint({

            title,

            description,

            category,

            phoneNumber,

            raisedBy:req.user.id,

            apartment:apartment._id,


            // uploaded image path
            image:req.file ? "/uploads/" + req.file.filename : ""

        });



        await complaint.save();

        res.status(201).json({

            message: "Complaint created successfully",

            complaint

        });


    }
    catch (error) {


        res.status(500).json({

            message: error.message

        });


    }
    
}



const getAllComplaints=async(req,res)=>
{
    try{

        const complaints = await Complaint.find()

        .populate("raisedBy","name email")

        .populate("apartment","flatNumber block floor");



        res.status(200).json(complaints);

    }

    catch(error)

    {

        return res.status(500).json({
            message:error.message
        });

    }
}



const getMyComplaints =async(req,res)=>
{

    try{

        const complaints=await Complaint.find({
            raisedBy:req.user.id
        })

        .populate("apartment","flatNumber block floor");



        res.status(200).json(complaints);

    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }

}





const updateComplaintStatus = async (req, res) => {
    try {
        const { status, resolutionNote } = req.body;
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found"

            });

        }
        
        complaint.status = status;
        if (resolutionNote) {
            complaint.resolutionNote = resolutionNote;
        }
        await complaint.save();

        res.status(200).json({
            message: "Complaint updated successfully",
            complaint
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteComplaint = async(req,res)=>{

    try{


        const complaint = await Complaint.findById(req.params.id);



        if(!complaint){

            return res.status(404).json({

                message:"Complaint not found"

            });

        }



        await complaint.deleteOne();



        res.status(200).json({

            message:"Complaint deleted successfully"

        });



    }

    catch(error){


        res.status(500).json({

            message:error.message

        });


    }

}






module.exports = {

    createComplaint,

    getAllComplaints,

    getMyComplaints,

    updateComplaintStatus,

    deleteComplaint

};