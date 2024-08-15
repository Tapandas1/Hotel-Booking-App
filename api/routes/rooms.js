const express=require("express");
const router=new express.Router();
const {createRoom,getAllRooms,getRoomById,deleteRoom,updateRoom,updateRoomAvailability}=require("../controllers/room");
const { verifyAdmin } = require("../utils/verifyToken");

//CREATE
router.post("/:hotelid",verifyAdmin,createRoom);
//UPDATE
router.put("/:id",verifyAdmin,updateRoom);
router.put("/availability/:id",updateRoomAvailability);
//DELETE
router.delete("/:id/:hotelid",verifyAdmin,deleteRoom);
//GET 
router.get("/:id",getRoomById);
//GET ALL
router.get("/",getAllRooms);

module.exports=router;