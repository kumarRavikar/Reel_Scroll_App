import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.router.js"
import dotenv from "dotenv"
dotenv.config()
const app = express()

app.use(express.json())
 app.use(cookieParser())
app.use("/api",authRouter)
 export default app;