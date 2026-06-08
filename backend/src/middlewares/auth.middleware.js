import jwt from "jsonwebtoken";
import foodPartnerModel from "../model/foodPartner.model.js";

 export async function authFoodPartnerMiddleware(req, res, next) {
     const token = req.cookies.token    //stroing token from cookies
     if(!token){
        return res.status(401).json({
            message:"User needs to login first!!"
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