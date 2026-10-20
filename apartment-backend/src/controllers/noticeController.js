const Notice = require("../models/Notice");


const createNotice = async(req,res)=>{

    try{

        const {title,message}=req.body;


        const notice = new Notice({

            title,
            message,

            // JWT se aaya admin id
            createdBy:req.user.id

        });


        await notice.save();


        res.status(201).json({

            message:"Notice created successfully",
            notice

        });


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};



const getAllNotices = async(req,res)=>{

    try{

        const notices = await Notice.find()
        .populate("createdBy","name email");


        res.status(200).json(notices);


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

const deleteNotice = async(req,res)=>{

    try{

        const notice = await Notice.findById(req.params.id);


        if(!notice){

            return res.status(404).json({
                message:"Notice not found"
            });

        }


        await notice.deleteOne();


        res.status(200).json({

            message:"Notice deleted successfully"

        });


    }
    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

const updateNotice = async (req, res) => {

    try {

        const { title, message } = req.body;

        const notice = await Notice.findById(req.params.id);

        if (!notice) {
            return res.status(404).json({
                message: "Notice not found"
            });
        }

        notice.title = title;
        notice.message = message;

        await notice.save();

        res.status(200).json({
            message: "Notice updated successfully",
            notice
        });

    }
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {

    createNotice,
    getAllNotices,
    deleteNotice,
    updateNotice
};