import mongoose from "mongoose";
export const connectdb=()=>{
    mongoose.connect(process.env. MONGO_URI, {     
        dbName: "nicstechbackendapi",
    }).then(() => console.log("database connected"));
}