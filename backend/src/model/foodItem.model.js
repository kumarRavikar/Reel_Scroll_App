import mongoose from "mongoose";
 

const foodItemSchema = new mongoose.Schema({
  name:{type:String, required:true},
  video:{type:String, required:true},
  description:{type:String},
  foodPartner:{type:mongoose.Schema.Types.ObjectId, ref:"foodpartner"},// this stablish connection between two collection
  likeCount:{type:Number, default:0},
  
})


const foodItemModel = mongoose.model("foodItem",foodItemSchema)
export default foodItemModel;