import jwt from "jsonwebtoken";
import { User } from "../models/users.js";
export const isauthenticated=async(req,res,next)=>{
    const token =req.headers?.authorization;  //barrier token
  if(!token) return res.status(404).json({ 
    success:false,
    message:"Login First",
  })
  const decoded= await jwt.verify(token,process.env.SECRET_KEY);
   req.user=await User.findById(decoded._id);
   next();
}