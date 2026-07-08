import mongoose from "mongoose";



const savedSchema = new mongoose.Schema({
    user:{type:mongoose.Types.ObjectId, ref:"Users", required: true},
    food:{type: mongoose.Types.ObjectId, ref:"Food", required:true}
},{timestamps:true});



 const saveModel = mongoose.model("Save",savedSchema);
 export default saveModel;