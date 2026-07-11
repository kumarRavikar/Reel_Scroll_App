import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.router.js"
import dotenv from "dotenv"
import foodRouters from "./routes/food.router.js"
import foodPartnerRouter from "./routes/food-partner/food-partner.router.js"
import cors from "cors";
dotenv.config()
const app = express()
app.use(cors({
    origin:"https://reel-scroll-app.vercel.app",
    credentials:true
}))

app.use(express.json())
 app.use(cookieParser())
app.use("/api",authRouter)
app.use("/api/food",foodRouters)
app.use("/api/food-partner", foodPartnerRouter)
 export default app;