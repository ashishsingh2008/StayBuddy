const express=require('express');
const { register, login } = require('../controllers/auth.js');

const router=express.Router();


router.get("/",(req,res)=>{
    res.send("auth endpoint")
})
router.post("/register",register)
router.post("/login",login)


module.exports = router