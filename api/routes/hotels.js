const express=require("express");
const router=new express.Router();
const {verifyAdmin}=require("../utils/verifyToken")
const{ createHotel,updateHotel,deleteHotel,getHotelById,getHotels,countByCity,countByType,getAllHotels,getHotelsByCity,getHotelRooms}=require("../controllers/hotel")
//CREATE
router.post("/",verifyAdmin,createHotel)
//UPDATE
router.put("/:id",verifyAdmin,updateHotel)
//DELETE
router.delete("/:id",verifyAdmin,deleteHotel)
//GET
router.get("/find/:id",getHotelById)
//GET ALL
router.get("/findAll",getHotels)
router.get("/city",getHotelsByCity)
router.get("/",getAllHotels)
router.get("/countByCity",countByCity)
router.get("/countByType",countByType)
router.get("/room/:id",getHotelRooms)

module.exports=router;