import { Question } from "../models/questions.js";

export const createques = async (req, res, next) => {
    try {
        const { description,correct, category,alternatives } = req.body;
        const question = await Question.create({
            description,correct,category,alternatives,
            user: req.user
        })
        res.status(201).json(question);
    } catch (error) {
        next(error);
    }
}
export const getques = async (req, res, next) => {
    try {
        const questions = await Question.find();
        res.status(201).json(questions);
    } catch (error) {
        next(error);
    }
}
export const get1ques = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ques = await Question.findById(id);
        console.log(ques.correct);
        if (!ques) return res.status(404).json({
            success: false,
            message: "question not found"
        });
        res.status(200).json(ques);
        
    } catch (error) {
        next(error);
    }
}
export const updateques = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { description, correct, category, alternatives } = req.body;
        const ques = await Question.findById(id);
        if (!ques) return res.status(404).json({
            success: false,
            message: "question not found"
        });
        ques.description = description;
        ques.alternatives = alternatives;
        ques.category=category;
        ques.correct=correct;
        await ques.save();
        res.status(201).json(ques);
    } catch (error) {
        next(error);
    }
}
export const deleteone = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ques = await Question.findById(id);
        if (!ques) return res.status(404).json({
            success: false,
            message: "question not found"
        });
        await Question.deleteOne(ques);
        res.status(200).json({
            success: true,
            message: "question deleted successfully"
        })
    } catch (error) {
        next(error);
    }
}