const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },
        phoneNumber:{
            type:String,
            required:true,
            match:/^[0-9]{10}$/
        },
        raisedBy: {
            type: mongoose.Schema.Types.ObjectId,//_id stored
            ref: "User",//tells mongoose that this objectid is users's model
            required: true
            /*this ref creates relationship,
            if u wannt to access the fields,use populate in controller*/
        },

        apartment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Apartment",
            required: true
        },

        status: {
            type: String,
            enum: ["OPEN", "IN_PROGRESS", "RESOLVED"],
            default: "OPEN"
        },
        
        resolutionNote: {
            type: String,
            default: ""
        },
        image:{
            type:String,
            default:""
        }

    },
    {
        //likhte hain, to Mongoose automatically do fields add kar deta hai:createdAt and updatedAt
        timestamps: true
    }
);


const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;