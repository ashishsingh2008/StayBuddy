
const createError=(status,message)=>{
    const err=new Error();
    err.status=status;
    err.message=message;
    return err;
};

module.exports = createError;

// const failed = true;
    // const err=new Error();
    // err.status=404;
    // err.message="sorry not found ";
    // if(failed) return next(err);