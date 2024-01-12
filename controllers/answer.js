import { Question } from "../models/questions.js"
import { User } from "../models/users.js";

export const checkans=async(req,res,next)=>{
const {id}=req.params;
const {answer}=req.body;
const user=req.user;
const ques = await Question.findById(id);

if(user.attemptedques.some(attemptedQuestion => attemptedQuestion?.qid?.equals(id))) return res.status(400).json({
    success:false,
    message:"question already attempted",
})
else{if(answer===ques.correct) {
    user.score+=1;
    user.attemptedques.push({qid:id,status:true,score:1,category:ques.category});
    await user.save();
    return res.status(201).json({
    success:true,
    message:"correct answer",
})
}

res.status(200).json({
    success:false,
    message:"incorrect answer"
})
}
}

export const getnextques=async(req,res,next)=>{
    const user=req.user;
    const attemptedquestions= user.attemptedques.map(attemptedquestion=>attemptedquestion.qid);
    const nextques=await Question.findOne({_id:{$nin:attemptedquestions}});
    if(!nextques)return res.status(404).json({
        success:false,
        message:"you have attempted all questions",
        });
    res.status(200).json({
        success:true,
        question:nextques.description,
        id:nextques._id,
    }) 
 }


