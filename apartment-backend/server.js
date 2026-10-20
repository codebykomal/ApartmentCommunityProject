// const express=require("express");
// const cors = require("cors");
// require("./src/config/db");
// const userRoutes=require("./src/routes/userRoutes");
// const apartmentRoutes=require("./src/routes/apartmentRoutes")
// const complaintRoutes=require("./src/routes/complaintRoutes")
// const noticeRoutes = require("./src/routes/noticeRoutes");
// const dashboardRoutes = require("./src/routes/dashboardRoutes");

// /*app ek Express Application Object hai.
// Matlab is object ke andar Express ne bahut saare 
// methods/properties diye hain jinke through hum backend bana sakte hain.*/
// const app=express();

// app.use(cors({
//     origin:"http://localhost:3000"
// }));

// app.use(express.json());//middleware:JSON ko JavaScript object banana.
// app.use("/api/users",userRoutes);
// //req.body,req.headers
// // app.get("/:id",(req,res)=>
// // {   
// //     //console.log(req.params.id);
// //     //const id=req.params.id;  
// //     res.send(req.params.id);
// // });

// app.use("/api/apartments", apartmentRoutes);

// app.use("/api/complaints",complaintRoutes);

// app.use("/api/notices", noticeRoutes);

// app.use("/api/dashboard", dashboardRoutes);

// app.listen(5000,()=>
// {
//     console.log("Server running on port 5000");
// });//listen() starts the server and tells the port

// /*Note - for connection between backend and frontend 
// npm install cors
// import 
// use
// */

const express=require("express");
const cors = require("cors");

require("./src/config/db");

const userRoutes=require("./src/routes/userRoutes");
const apartmentRoutes=require("./src/routes/apartmentRoutes");
const complaintRoutes=require("./src/routes/complaintRoutes");
const noticeRoutes = require("./src/routes/noticeRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");

const app=express();


app.use(cors({
    origin:"http://localhost:3000"
}));


app.use(express.json());


// IMAGE ACCESS KE LIYE ADD KARO
app.use("/uploads",express.static("uploads"));

app.use("/api/users",userRoutes);

app.use("/api/apartments", apartmentRoutes);

app.use("/api/complaints",complaintRoutes);

app.use("/api/notices", noticeRoutes);

app.use("/api/dashboard", dashboardRoutes);



app.listen(5000,()=>{

    console.log("Server running on port 5000");

});