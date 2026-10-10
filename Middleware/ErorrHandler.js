

const ErorrHandler = (err,req,res,next) => {
    const status= err.statusCode || 500;
    res.status(status).json({
        success: false,
        message:err.message || 'internal server error',
        status
    })

}

export default ErorrHandler
