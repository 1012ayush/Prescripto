import jwt from "jsonwebtoken"

// admin authentication middleware

const authAdmin = async (req , res, next) => {
    try{

        const {atoken} = req.headers
        if(!atoken){
            return res.json({success:false, message:"Not Authorized Login Again"})
        }
        const token_decode = jwt.verify(atoken,process.env.JWT_SECRET)
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success:false, message:"Not Authorized Login Again"}) 
        }
        // if token is matching with the emailId and next password then we use callback function here it is next 
        next()
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message:error.message })
    }
}

export default authAdmin