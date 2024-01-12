import express from "express";
import { config } from "dotenv";
import userrouter from "./routes/user.js";
import adminrouter from "./routes/admin.js"
import cookieparser from "cookie-parser";
import { checkrole } from "./middleware/checkrole.js";
config({
    path: "./data/config.env",
})
export const app = express();
app.use(express.json());
app.use("/api/v1/users", userrouter);
app.use("/api/v1/admin" ,adminrouter);
app.use(cookieparser());


app.get("/", (req, res) => {
    res.send("i am wokring");
});