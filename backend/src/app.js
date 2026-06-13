import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.router.js"
import dotenv from "dotenv"
import foodRouters from "./routes/food.router.js"
import cors from "cors";
dotenv.config()
const app = express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())
 app.use(cookieParser())
app.use("/api",authRouter)
app.use("/api/food",foodRouters)
 export default app;