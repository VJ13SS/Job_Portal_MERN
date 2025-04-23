import express from "express"
import upload from "../config/multer.js"
import { loginUser, registerUser } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post('/sign-in',upload.single("image"),registerUser)
userRouter.post('/login',loginUser)

export default userRouter