import express from "express"
import cors from 'cors'
import connectDB from "./config/db.js"
import companyRouter from "./routes/companyRoutes.js"
import userRouter from "./routes/userRoutes.js"
import jobRouter from "./routes/jobRoutes.js"


//initialize express
const app = express()

//connecet to database
await connectDB()

//Middlewares
app.use(cors())
app.use(express.json())

//Routes
app.get('/',(req,res) => res.send('API WORKING'))
app.use('/api/company',companyRouter)
app.use('/api/user',userRouter)
app.use('/api/jobs',jobRouter)
app.use('/files',express.static('uploads'))//to use the images in the uploads folder

//port
const port = 5000

app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`)
})