import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import { sendcookie } from "../features/features.js";
import { Interview } from "../models/interview.js";

export const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await User.findOne({ email });
        if (user) return res.status(201).json({
            success: false,
            message: "user already exists",
        })
        const hashedpass = await bcrypt.hash(password, 10);
        const userr = await User.create({
            name, email, password: hashedpass, role
        })
        sendcookie(res, userr, "registered successfully", 200);
    } catch (error) {
        next(error);
    }
}
    
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({
            success: false,
            message: "invalid email or password"
        })
        const ismatch = await bcrypt.compare(password, user.password);
        if (!ismatch) return res.status(400).json({
            success: false,
            message: "invalid email or password"
        })
        sendcookie(res, user, "login successfully", 200);

    } catch (error) {
        next(error);
    }
}
export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "logged out",
    })
}

export const getscore = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    res.status(200).json({
        success: true,
        score: user?.score,
    })
}
export const basicscore = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const attemptedquestions = user.attemptedques.filter(attemptedquestion => attemptedquestion.category === "basic").map(attemptedquestion => attemptedquestion.qid);
    const l = attemptedquestions.length;
    res.status(200).json({
        success: true,
        score: l
    })
}
export const frontendscore = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const attemptedquestions = user.attemptedques.filter(attemptedquestion => attemptedquestion.category === "frontend").map(attemptedquestion => attemptedquestion.qid);
    const l = attemptedquestions.length;
    res.status(200).json({
        success: true,
        score: l
    })
}
export const backendscore = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const attemptedquestions = user.attemptedques.filter(attemptedquestion => attemptedquestion.category === "backend").map(attemptedquestion => attemptedquestion.qid);
    const l = attemptedquestions.length;
    res.status(200).json({
        success: true,
        score: l
    })
}
export const restartquiz = async (req, res) => {
    const user = req.user;
    user.score = 0;
    const l = user.attemptedques.length;
    user.attemptedques.splice(0, l);
    user.save();
    res.status(200).json({
        success: true,
        message: "you can now restart the quiz",
    })
}
export const myinterview=async(req,res)=>{
    const usr=req.user;
    
    const i= await Interview.findOne({candidate:usr._id});
    if(!i) return res.status(404).json({
        success:false,
        message:"no interview scheduled yet !"
    }) 
    res.status(200).json({
        success:true,
        message:`your interview is scheduled at ${i.timing} and duration is ${i.duration} `
    })

}


