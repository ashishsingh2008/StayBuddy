const jwt =require("jsonwebtoken");
const createError=require("../utils/error")

const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;

    if(!token){
        return next(createError(401,"you are not authentificated"))
    }

    jwt.verify(token,process.env.JWT,(err,user)=>{
         if(err) return next(createError(403,"token is not valid"));
         req.user=user;
         next()
    })
}


// const verifyUser=(req,res,next)=>{
//      verifyToken(req,res, ()=>{
//         if(req.user.id==req.params.id||req.user.isAdmin){
//             next()
//         }else{
//             if(err) return next(createError(403,"you are not authorized"));
//         }
//      })
// }

const verifyUser=(req,res,next)=>{
    verifyToken(req,res, (err)=>{
       if(err) return next(createError(403,"you are not authenticated"));
       if(req.user.id==req.params.id||req.user.isAdmin){
           next()
       }else{
           return next(createError(403,"you are not authorized"));
       }
    })
}


const verifyIsAdmin=(req,res,next)=>{
    verifyToken(req,res, (err)=>{
       if(err) return next(createError(403,"you are not authenticated"));
          if(req.user.isAdmin){
           next()
       }else{
           return next(createError(403,"you are not authorized"));
       }
       
    })
}


module.exports={
    verifyToken,
    verifyUser,
    verifyIsAdmin
}

