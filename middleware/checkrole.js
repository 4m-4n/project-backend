import { User } from "../models/users.js";

export const checkrole=async(req,res,next)=>{
   const {email}=req.body;
   const user=await User.findOne({email});
   if(req.user.role!=="admin")return res.status(404).json({
    success:false,
    message:"access denied"
   })
   next();
}