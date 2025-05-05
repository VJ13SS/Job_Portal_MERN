import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/user.js";
import jobApplicationModel from "../models/jobApplications.js";
import jobsModel from "../models/job.js";

//to create a token for each user
const createToken = (id) => {
  return jwt.sign({ id }, "random#secret");
};

export const registerUser = async (req, res) => {
  let img_filename = `${req.file.filename}`;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    //checking if user already exists in the database
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({ success: false, message: "User Already exists" });
    }

    //validating the email format and password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be of minimum 8 letters",
      });
    }

    //hashing or encrypting the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //adding new user to the database
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
      resume: " ",
      image: img_filename,
    });

    const user = await newUser.save();

    return res.json({ success: true, message: "User Created successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: true, message: "Error" });
  }
};

//user login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User dosent exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Password dosent Match" });
    }

    const token = createToken(user._id);
    //to get the details of the logged in user
    const userDetails = { user, token, userType: "user" };

    return res.json({ success: true, userDetails });
  } catch (error) {
    console.log(error);
    return res.json({ success: true, message: "Error" });
  }
};

//apply for a job
export const applyForJob = async (req, res) => {
  const { jobId, userId } = req.body;

  try {
    //getting the jobs applied by the user(checking if user has alredy applied fro that job)
    const isAlreadyApplied = await jobApplicationModel.find({ jobId, userId });

    if (isAlreadyApplied.length > 0) {
      return res.json({ success: false, message: "Already Applied" });
    }

    const jobData = await jobsModel.findById(jobId);

    if (!jobData) {
      //if user hasn't applied for that job
      return res.json({ success: false, message: "Job Not Found" });
    }

    await jobApplicationModel.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    return res.json({ success: true, message: "Applied successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//get user applied applications
export const getUserJobApplications = async (req, res) => {
  try {
    const { userId } = req.body;

    const applications = await jobApplicationModel
      .find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    //.populate("companyId", "name email image") goes to the company model via the company collection and fetches the name email and image from there
    //.exec executes the operations

    if (!applications) {
      return res.json({
        success: false,
        message: "No Job applications found for this user",
      });
    }

    return res.json({ success: true, applications });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//update user profile(resume)
export const updateUserResume = async (req, res) => {
  try {
    const { userId } = req.body.id;

    const resumeFile = `${req.file.filename}`;
    console.log(req.body,userId,resumeFile)

    /*const userData = await userModel.findById(userId);
    userData.resume = resumeFile;
    await userData.save();*/
    const userData = {}

    return res.json({ success: true, userData });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
