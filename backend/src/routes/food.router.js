import express from "express"
import { addComment, createFood, deleteComment, getAllComment, getAllSavedFood, getCurrentUser, getFoodItems, likeFood, saveFood } from "../controller/food.controller.js"
import { authFoodPartnerMiddleware, authUserFoodMiddleware } from "../middlewares/auth.middleware.js"
import multer from "multer"
const foodRouters = express.Router()
 const upload = multer({dest:"uploads/"}) 
foodRouters.post("/",authFoodPartnerMiddleware,upload.single("video"),createFood) //only authroized food partner is able to create a food 
foodRouters.get("/",authUserFoodMiddleware,getFoodItems)  // get all foods only for authorized users
foodRouters.post("/like",authUserFoodMiddleware,likeFood)
foodRouters.post("/save", authUserFoodMiddleware, saveFood)
foodRouters.get("/saved",authUserFoodMiddleware,getAllSavedFood)
foodRouters.post("/comment",authUserFoodMiddleware,addComment)
foodRouters.get("/comment/:foodId",authUserFoodMiddleware,getAllComment)
foodRouters.delete("/comment/:id",authUserFoodMiddleware,deleteComment)
foodRouters.get("/me",authUserFoodMiddleware,getCurrentUser)
export default foodRouters