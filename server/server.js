import express from "express"
import cors from 'cors'
import connectDB from "./config/db.js"


//initialize express
const app = express()

//connecet to database
await connectDB()

//Middlewares
app.use(cors())
app.use(express.json())

//Routes
app.get('/',(req,res) => res.send('API WORKING'))

//port
const port = 5000

app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`)
})