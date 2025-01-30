import jwt from 'jsonwebtoken'

const userAuth = async (req,res,next)=>{
    const {token} = req.headers;

    if(!token){
        return res.status(400).json({success:false, message: "Not authorized. Login again"})
    }

    try {
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
        }else{
            return res.status(400).json({success:false, message: "Not authorized. Login again"})
        }

        next();

    } catch (error) {
        console.log(error.message)
        return res.status(400).json({success:false, message : error.message})
    }
}

export default userAuth;