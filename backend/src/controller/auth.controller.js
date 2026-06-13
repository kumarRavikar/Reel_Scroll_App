import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import foodPartnerModel from "../model/foodPartner.model.js";


// register user API
export async function registerUser(req, res){
    try {
        const {fullName, email, password} = req.body;
        const isUserAlreadyExist = await userModel.findOne({email})
        if(isUserAlreadyExist){
            return res.status(400).json({
                message:"User Already Registered"
            })
        }
        const hasPassword = await bcrypt.hash(password,10); //hasing password 
           const user = await userModel.create({
            fullName,
            email,
            password:hasPassword
           })
           const token = jwt.sign({_id:user._id},process.env.JWT_SECRET) // creating token that track user
           res.cookie("token",token) // store token in a cookie
           res.status(201).json({
            message:"User Registered successfully",
            user:{
                _id:user._id,
                email:user.email,
                fullName:user.fullName
            }
           })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

//Login user API
export async function login(req,res) {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"Invalid Email and Password"
            })
        }
        const isPassword =await bcrypt.compare(password,user.password) // compair password with hashed password 
        if(!isPassword){
           return res.status(400).json({
                message:"Invalid Email and Password"
            })
        }
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET) 
        res.cookie("token",token)
         res.status(200).json({
            message:"User Logged in Successfully",
            user:{
                _id:user._id,
                email:user.email,
                fullName:user.fullName
            }
         })
    } catch (error) {
        res.status(500).json({
            message:`Error in Login: ${error.message}`
        })
    }
}

//logout user API
export async function logout(rerq, res){
    try {
        res.clearCookie("token")  // for clearing cookie 
        res.status(200).json({
            message:"User Logout Successfully"
        })
    } catch (error) {
         res.status(500).json({
            message:`Internal server Error in logout : ${error.message}`
         })
    }
}

//Food partner registration field ---------------------//
export async function foodPartnerRegistration(req, res){
   try {
     const {businessName, email, password, contactName, phoneNo, address} = req.body;
     const isPartnerAlreadyReg = await foodPartnerModel.findOne({email})
     if(isPartnerAlreadyReg){
        return res.status(400).json({
             message:"Food Partner Already registered"
         })
     }
     const hashedPassword = await bcrypt.hash(password,10)
     const foodPartner = await foodPartnerModel.create({
         businessName,
         email,
         password:hashedPassword,
         contactName,
         phoneNo,
         address
     })
    const token = jwt.sign({_id:foodPartner._id},process.env.JWT_SECRET);
    res.cookie("token",token)
    res.status(201).json({
     message:"Food Partner Registered successfully",
     foodPartner:{
         _id:foodPartner._id,
         businessName:foodPartner.businessName,
         email:foodPartner.email,
         address:foodPartner.address,
         contactName:foodPartner.contactName
     }
    })
   } catch (error) {
       res.status(500).json({
        message : `error in regoster food partner ${error.message}`
       })
   }

} 
 
// login food partner 
export async function loginFoodPartner(req, res){
    try {
         const {email, password} = req.body
         const foodPartnerExixt = await foodPartnerModel.findOne({email})
         if(!foodPartnerExixt){
            return res.status(400).json({
                message:"Invalide email and password"
            })
         }
         const isPasswordValid = await bcrypt.compare(password,foodPartnerExixt.password);
         if(!isPasswordValid){
            return res.status(400).json({
                message:"Invalide email and password"
            })
         }
         const token = jwt.sign({_id:foodPartnerExixt._id},process.env.JWT_SECRET)
         res.cookie("token",token)
         res.status(200).json({
            message:"Food partner logged in successfully",
            foodPartnerExixt:{
                _id:foodPartnerExixt._id,
                name:foodPartnerExixt.name,
                email:foodPartnerExixt.email
            }
         })
    } catch (error) {
        res.status(500).json({
            message:`Internal server error in login Food Partner ${error.message}`,
            
        })
    }
}

// logout food partner 
export async function logOutFoodPartner(req, res){
    try {
        res.clearCookie("token")
        res.status(200).json({
            message:"Food Partner logOut successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:`Internal server error in logout: ${error.message}`
        })
    }
    
}