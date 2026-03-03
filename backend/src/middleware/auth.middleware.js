import jwt from "jsonwebtoken";
import User from "../models/User.js";


const protectedroute=async(req,res,next)=>{
    try {
        //get token
        const token=req.header("Authorization").replace("Bearer ","");
        if(!token) return res.status(401).json({message:"no token is there"})

        //verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        // token payload may use `id` instead of `userId`
        const userId = decode.userId || decode.id;
        if (!userId) {
            return res.status(401).json({ message: "invalid token payload" });
        }

        const user = await User.findById(userId).select("-password");
        if (!user) return res.status(401).json({ message: "user not found" });

        req.user = user;
        next();
    } catch (error) {
        console.error("auth error in protection",error.message);
         res.status(401).json({message:"protection route error"})
    }
}
export default protectedroute