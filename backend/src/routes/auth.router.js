import express from "express"
import { foodPartnerRegistration, login, loginFoodPartner, logout, logOutFoodPartner, registerUser } from "../controller/auth.controller.js"

//creating router 
const router = express.Router()

// router for  user
router.post("/user/register",registerUser)
router.post("/user/login",login)
router.post("/user/logout",logout)


//Router for Food Partner
router.post("/food-partner/register", foodPartnerRegistration)
router.post("/food-partner/login",loginFoodPartner)
router.get("/food-partner/logout",logOutFoodPartner)
export default router