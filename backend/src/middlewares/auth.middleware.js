import jwt from "jsonwebtoken";
import foodPartnerModel from "../model/foodPartner.model.js";
import UserModel from "../model/user.model.js";

 export async function authFoodPartnerMiddleware(req, res, next) {
     const token = req.cookies.token    //stroing token from cookies
     if(!token){
        return res.status(401).json({
            message:"Please login first!!"
        })
     }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)  // verify token
        const foodPartner = await foodPartnerModel.findById(decoded._id) // find foodPartner from db by _id
         req.foodPartner = foodPartner // creating new foodPartner field in request 
         next() // passing data to  next middleware
    } catch (error) {
        res.status(401).json({
            message:"Invalide token"
        })
    }
}
 export async function authUserFoodMiddleware(req, res, next) {
     const token = req.cookies.token;
     if(!token){
        return res.status(401).json({
            message:"User Need to Login First!!"
        })
     }
     try {
         const decoded = await jwt.verify(token,process.env.JWT_SECRET);
         const user = await UserModel.findById(decoded._id)
         req.user = user
         next()
     } catch (error) {
        return res.status(401).json({
           message:"invalide Token"
        })
     }
 }