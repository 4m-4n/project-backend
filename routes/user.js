import express from "express";
import { backendscore, basicscore, frontendscore, getscore, login, logout, myinterview, register, restartquiz } from "../controllers/user.js";
import { isauthenticated } from "../middleware/authenticate.js";
import { checkans, getnextques } from "../controllers/answer.js";
const router = express.Router();
//user routes
router.post("/new", register);
router.post("/login", login);
router.get("/logout", isauthenticated, logout);
router.post("/answer/:id",isauthenticated,checkans);
router.get("/mytotalscore",isauthenticated,getscore);
router.get("/mybasicscore",isauthenticated,basicscore);
router.get("/myfrontendscore",isauthenticated,frontendscore);
router.get("/mybackendscore",isauthenticated,backendscore);
router.post("/restartquiz",isauthenticated,restartquiz);
router.get("/nextques",isauthenticated,getnextques);
router.get("/myinterview",isauthenticated,myinterview);
export default router;