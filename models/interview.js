import mongoose from "mongoose";
const interviewschema =new mongoose.Schema({
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    timing:String,
    duration:String,
    candidate:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }

});
export const Interview= mongoose.model("Interview",interviewschema);