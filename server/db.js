const mongoose=require('mongoose');

module.exports= async ()=>{       
    try {
        await mongoose.connect(process.env.DB)
        console.log("Successfully connected to Database")
    } catch (error) {
        throw error;
    }
};
 
mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected!")
})
mongoose.connection.on("connected",()=>{
    console.log("mongoDB connected!")
})  