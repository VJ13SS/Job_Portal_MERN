import express from "express";
import upload from "../config/multer.js";
import {
  applyForJob,
  getUserJobApplications,
  loginUser,
  registerUser,
  updateUserResume,
} from "../controllers/userController.js";

const userRouter = express.Router();

//sign up
userRouter.post("/sign-up", upload.single("image"), registerUser);

//login
userRouter.post("/login", loginUser);

//apply for a job
userRouter.post("/apply", applyForJob);

//get applied jobs data
userRouter.post("/applications", getUserJobApplications);

//update user profile(resume)
userRouter.post("/update-resume", upload.single("resume"), updateUserResume);

export default userRouter;
