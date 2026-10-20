//Model = database me data ka blueprint/structure
//MongoDB me ye "User collection" banayega.
//Mongoose = Node.js ka library/tool jo Node ko MongoDB ke sath easily kaam karne deta hai.

const mongoose=require("mongoose");


//this line is blueprint
const userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },


    email:{
        type:String,
        required:true,
        unique:true
    },


    password:{
        type:String,
        required:true
    },


    role:
    {
        type:String,
        default:"RESIDENT"
    },


    //User ko delete karne ke bajaye hum deactivate karenge.
    //Agar active false hai to resident system use nahi kar payega.
    //Apartment aur complaint history safe rahegi.
    active:
    {
        type:Boolean,
        default:true
    }

});





/*
mongoose.model() ek function hai jo 2 cheeze leta hai:

1)Model ka naam
2)Kaunsa schema use karna hai
*/


const user=mongoose.model("User",userSchema);


//creating actual model


/*
module.exports Node.js ka built-in feature hai.

work:
Ek file ka code dusri file me available karwana.
*/


module.exports=user;