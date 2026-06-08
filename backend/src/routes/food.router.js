import express from "express"
import { createFood } from "../controller/food.controller.js"
import { authFoodPartnerMiddleware } from "../middlewares/auth.middleware.js"
import multer from "multer"
const foodRouters = express.Router()
 const upload = multer({dest:"uploads/"})
foodRouters.post("/",authFoodPartnerMiddleware,upload.single("video"),createFood) //only authroized food partner is able to create a food 
export default foodRouters