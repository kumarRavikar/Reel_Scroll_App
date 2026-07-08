import  app  from "./src/app.js";
import connectDB from "./src/db/db.js";


const PORT = process.env.PORT || 3000
 connectDB()
app.listen(PORT,()=>{
    console.log(`server is listening on port ${process.env.PORT}`)
})