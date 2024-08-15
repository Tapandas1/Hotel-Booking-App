const express=require("express");
const router=new express.Router();
const {verifyUser,verifyAdmin}=require("../utils/verifyToken")

const{updateUser,deleteUser,getUserById,getAllUser}=require("../controllers/user")

/*//AUTHENTICATION
router.get("/checkauthentication",verifyToken,(req,res,next)=>{
    res.send("hello user you are logged in")
})
//AUTHENTICATE USER
router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
    res.send("hello user you are logged in and you can delete your account")
})
//AUTHENTICATE ADMIN
router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
    res.send("hello admin you are logged in and you can delete all account")
})*/
//UPDATE
router.put("/:id",verifyUser,updateUser)
//DELETE
router.delete("/:id",verifyUser,deleteUser)
//GET
router.get("/:id",verifyUser,getUserById)
//GET ALL
router.get("/",verifyAdmin,getAllUser)

module.exports=router;