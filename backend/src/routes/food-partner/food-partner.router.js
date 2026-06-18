import express from "express"
import { getFootPartnerById } from "../../controller/food-partner.controller.js"
import { authUserFoodMiddleware } from "../../middlewares/auth.middleware.js"

const router = express.Router()

router.get("/profile/:id",authUserFoodMiddleware,getFootPartnerById)


export default router