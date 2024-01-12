import { Interview } from "../models/interview.js";
import { User } from "../models/users.js";

export const createinterview=async(req,res,next)=>{
try {
    const {email,timing,duration}=req.body;
    const usr=await User.findOne({email});
    if(!usr)return res.status(404).json({
        success:false,
        message:"user does not exist",
    })
    const inter=await Interview.create({
           admin:req.user,timing,duration,candidate:usr,
    })
    res.status(201).json({
        success:true,
        message:"interview scheduled",
    });
} catch (error) {
    next(error);
}
}

export const assignedinter=async(req,res)=>{
  const i= await Interview.find();
  if(!i) return res.status(404).json({
    success:false,
    message:"no interview assigned yet"
  })
  res.status(200).json({
    success:true,
    interviews:i
  })
}