const mongoose=require('mongoose');
const { Schema } = mongoose;


const Roomschema =new mongoose.Schema({
     title:{
       type:String,
       required:true,
    },
    price:{
        type:Number,
        required:true,
     },
    desc:{
       type:String,
       required:true
    },
    isAdmin:{
       type:Boolean,
       default:false,
    },
    roomNumbers:[{number:Number,unavailableDates:{type:[Date]}}],
    
    maxPeople:{
        type:Number,
        required:true,
     },
   } ,{timestamps:true});
   
   module.exports=mongoose.model("Room",Roomschema)