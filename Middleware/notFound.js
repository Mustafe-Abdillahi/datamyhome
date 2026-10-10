

const notFound = (req,res,next) => {
    const error= new Error(`route: ${req.originalUrl} is not found}`);
    error.status= 404;
    next(error);

}

export default notFound
