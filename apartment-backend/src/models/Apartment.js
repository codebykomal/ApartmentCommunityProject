//MongoDB ke schema aur model banane ke liye Mongoose chahiye.

const mongoose=require("mongoose");

const apartmentSchema = new mongoose.Schema({
    flatNumber:{
        type:String,
        required:true,
        unique:true
    },

    block: {
        type: String,
        required: true
    },

    floor: {
        type: Number,
        required: true
    },
    
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
        /*connection
        Apartment.owner
        |
        ↓
        User._id*/
    }   
},
{
    timestamps:true
}
/*,{
   collection:"myApartments"
}*/
);

const apartment=mongoose.model("Apartment",apartmentSchema);//creates colllection:-apartments(plurization)
/*await apartment.save();
chalate ho.
Us time MongoDB automatically:
apartments
collection bana deta hai (agar pehle se nahi hai).*/

module.exports=apartment;