const mongoose=require('mongoose');
const { Schema } = mongoose;


const Userschema =new mongoose.Schema({
    username:{
       type:String,
       required:true,
       unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
     },
    country:{
      type: String,
    },
    img:{
      type:String,
    },
    city:{
      type:String,
    },
    phone:{
      type:String,
      required:true,
    },
    password:{
       type:String,
       required:true
    },
    isAdmin:{
       type:Boolean,
       default:false,
    },
   },{timestamps:true});

   module.exports=mongoose.model("User",Userschema)