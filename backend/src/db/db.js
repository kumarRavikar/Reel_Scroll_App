import mongoose from "mongoose";

export default function connectDB(){
    mongoose.connect("mongodb://localhost:27017/food-view").then(()=>{
        console.log("Database connected")
    })
    .catch((err)=>{
        console.log(`DataBase connection failed ${err}`)
    })
}