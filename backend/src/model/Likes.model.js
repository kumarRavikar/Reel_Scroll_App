import mongoose from "mongoose";


const LikeSchema = new mongoose.Schema({
    user:{type:mongoose.Types.ObjectId, ref:"Users", required:true}, // store user who like the food
    food:{type:mongoose.Types.ObjectId, ref:"Food", required:true}  // store food  liked by the user 
},{timestamps:true})


export const LikeModel = mongoose.model("Like",LikeSchema);