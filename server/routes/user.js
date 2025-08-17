const express=require('express');
const usercontollers = require('../controllers/user');
const router=express.Router();
const {verifyToken,verifyUser,verifyIsAdmin}=require("../utils/verifyToken")

router.get("/checkauthentification",verifyToken,(req,res,next)=>{
    res.send("hello user,you are logged in")
})
router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
    res.send("hello user,you are logged in and u can delete your account")
})
router.get("/checkadmin/:id",verifyIsAdmin,(req,res,next)=>{
  res.send("hello Admin,you are logged in and u can delete all accounts")
})
router.get("/findusername", usercontollers.userByusername);
router.get("/findemail", usercontollers.userByemail);

//update
router.put("/:id",verifyUser,usercontollers.updateUser)
//get
router.get("/:id",verifyUser,usercontollers.getUser)
//delete
router.delete("/:id",verifyUser,usercontollers.deleteUser)
  // //get all
  
  router.get("/",verifyIsAdmin,usercontollers.getallUsers)
  // router.get("/",usercontollers.getallUsers)
 

module.exports = router