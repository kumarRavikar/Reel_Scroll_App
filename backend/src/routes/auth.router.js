import express from "express"
import { login, registerUser } from "../controller/auth.controller.js"

//creating router 
const router = express.Router()

// router for register user
router.post("/user/register",registerUser)
router.post("/user/login",login)
export default router