const express=require('express');
const Roomcontollers=require("../controllers/rooms")
const router=express.Router();
const { verifyIsAdmin} =require("../utils/verifyToken")

// router.get("/",(req,res)=>{
//     res.send("hello this is rooms end point")
// })


//create
router.post("/:hotelId",verifyIsAdmin,Roomcontollers.createRoom);


//update
router.put("/:id",verifyIsAdmin ,Roomcontollers.updateRoom)
router.put("/availability/:id" ,Roomcontollers.updateRoomAvailability)
//get
router.get("/:id",Roomcontollers.getRoom)
//delete
router.delete("/:id/:hotelId",verifyIsAdmin,Roomcontollers.deleteRoom)
  //get all
  router.get("/",Roomcontollers.getallRoom)

module.exports = router