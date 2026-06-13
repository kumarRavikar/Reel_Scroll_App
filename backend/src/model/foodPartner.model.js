import mongoose from "mongoose";

const foodPartnerSchema = new mongoose.Schema({
  businessName:{type:String, required:true},
  contactName:{type:String, required:true},
  phoneNo : {type:String , required:true},
  address:{type:String, required:true},
  email:{type:String, required:true, unique:true},
  password:{type:String, required:true}
})


 const foodPartnerModel = mongoose.model("foodpartner",foodPartnerSchema);
 export default foodPartnerModel;