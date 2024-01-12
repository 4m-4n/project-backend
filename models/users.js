import mongoose from "mongoose";
const schema = new mongoose.Schema({     //schema creation 
    name: {
        type:String,
        required:true,
    },
     email:{ 
        type: String,
        required:true,
        unique:true,
     },
  
    createdate:{
        type:Date,
        default:Date.now,
    },
    password:{
        type:String,
        required:true,
       } ,
       role:{
        type:String,
        default:'USER',
       },
       score:{
        type:Number,
        default:0,
       },
       attemptedques:[{qid:{"type":mongoose.Schema.Types.ObjectId,ref:"Question"},
        status:{
            type:Boolean,
            default:false
        },
        score:{
         type:Number   
        },
        category:{
            type:String
        }
    }
    ]

});
 
export const User = mongoose.model("User", schema);