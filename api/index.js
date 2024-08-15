const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const app=express();
const authRoute=require("./routes/auth");
const usersRoute=require("./routes/users");
const hotelsRoute=require("./routes/hotels");
const roomsRoute=require("./routes/rooms");
dotenv.config()


mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Connection Sucessfull"))
.catch((err)=>console.log(err))

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);

app.use((err,req,res,next)=>{
const errStatus=err.status || 500
const errMessage=err.message || "Something went wrong!"
return res.status(errStatus).json({
    success:false,
    status:errStatus,
    message:errMessage,
    stack:err.stack
})
})

app.listen(8000,()=>{
    console.log("Backend server is running");
})