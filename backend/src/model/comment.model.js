import mongoose, { mongo } from "mongoose";


const commentSchema = new mongoose.Schema({
    user:{type:mongoose.Types.ObjectId, ref:"Users", required:true},
    food:{type:mongoose.Types.ObjectId, ref:"Food", rrequired:true},
    comment:{type:String},
},{timestamps:true})

const commentModel = mongoose.model("Comment",commentSchema)
 export default commentModel;