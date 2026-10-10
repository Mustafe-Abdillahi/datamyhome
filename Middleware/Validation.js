export const validate =(schema)=>{
    return (req,res,next)=>{
    const result= schema.safeParse(req.body);
    console.log("result:", result);
    if(!result.success){
        const formated=result.error.format();
        
        console.log("formated:",formated);
        console.log("formated keys: ", Object.keys(formated))
        return res.status(400).json({
            success:false,
            message:"validation error",
            error:Object.keys(formated).map(key=>({
                key,
                message: formated[key]?._errors?.[0] || 'invalid input'
            }))
        })
    }
     next();
}
}