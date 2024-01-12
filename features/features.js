import jwt from "jsonwebtoken";
export const sendcookie=async(res,userr,message,statuscode)=>{
    const token=jwt.sign({_id:userr._id},process.env.SECRET_KEY);
 res.status(statuscode).cookie("token",token,{
    httpOnly:true,
    maxAge:25*60*1000,
 }).json({
    success:true,
    message:message,
 })
} 