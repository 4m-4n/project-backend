import mongoose from "mongoose";
const questionschema=new mongoose.Schema({
    description: String,
    correct: String,
    category:String,
    alternatives:[
        {
            text:{
                type:String,
                required:true
            },   
        }
    ],
    createdate:{
        type:Date,
        default:Date.now,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
   
})
export const Question = mongoose.model("Question",questionschema);