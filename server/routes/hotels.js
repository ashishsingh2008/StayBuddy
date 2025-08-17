const express=require('express');
const Hotel=require("../models/Hotels");
const hotelcontollers = require('../controllers/hotels');
const { verifyIsAdmin } = require('../utils/verifyToken');
const router=express.Router();


//create
router.post("/",verifyIsAdmin,hotelcontollers.createHotel);


//update
router.put("/:id",verifyIsAdmin ,hotelcontollers.updateHotel)
//get
router.get("/find/:id",hotelcontollers.getHotel)
//delete
router.delete("/:id",verifyIsAdmin,hotelcontollers.deleteHotel)
  //get all
  router.get("/",hotelcontollers.getallHotel)

  router.get("/rooms/:id",hotelcontollers.getHotelRooms)

  
router.get("/countByCity",hotelcontollers.countByCity)

router.get("/countByType",hotelcontollers.countByType)

module.exports = router