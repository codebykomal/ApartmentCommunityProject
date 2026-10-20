const mongoose = require("mongoose");
//Mongoose ka kaam MongoDB se connection aur models handle karna hai → iske methods use karte hain mongoose.connect();
require("dotenv").config();
//.config() Ye dotenv ka method hai.
// Kaam:.env file ko read karo aur uski values ko process.env me daal do.

//mongoose.connect(process.env.MONGO_URI);

//chk whether mongodb connected or not

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongodb connected");
})
.catch((error)=>{
    console.log("MongoDB Connection Failed", error);
});

/*same
async function connectDB(){

    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected");
    }
    catch(error){
        console.log(error);
    }

}*/
