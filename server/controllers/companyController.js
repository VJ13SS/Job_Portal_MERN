import companyModel from "../models/company.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import jobsModel from "../models/job.js";
import jobApplicationModel from "../models/jobApplications.js";

const createToken = (id) => {
  return jwt.sign({ id }, "random#secret");
};

//register a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;

  const imageFile = `${req.file.filename}`;

  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    const companyExists = await companyModel.findOne({ email });

    if (companyExists) {
      return res.json({
        success: false,
        message: "Company already registered",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password should be of minimum 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newCompany = new companyModel({
      name: name,
      email: email,
      password: hashedPassword,
      image: imageFile,
    });

    const company = await newCompany.save();
    return res.json({ success: true, message: "Company Created successfully" });
  } catch (error) {
    return res.json({ success: true, message: "Error" });
  }
};

//company login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }

    const company = await companyModel.findOne({ email });

    if (!company) {
      return res.json({ success: false, message: "Company not exists" });
    }

    const isMatch = await bcrypt.compare(password, company.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Password should be of minimum 8 characters length",
      });
    }

    const token = createToken(company._id);
    //to get the logged in user details
    const userDetails = { user: company, token, userType: "recruiter" };

    return res.json({ success: true, userDetails });
  } catch (error) {
    console.log(error);
    return res.json({ success: true, message: error.message });
  }
};

//post a new job
export const postJob = async (req, res) => {
  const { title, description, location, salary, level, category } = req.body;

  const companyId = req.company._id;

  try {
    const newJob = new jobsModel({
      title: title,
      description: description,
      location: location,
      salary: salary,
      companyId: companyId,
      date: Date.now(),
      level: level,
      category: category,
    });

    await newJob.save();

    return res.json({ success: true, newJob });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//get company job applicants
export const getCompanyJobApplicants = async (req, res) => {};

//get company posted jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await jobsModel.find({ companyId });

    //to count the number of applicants
    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        //all the mongoDb queris using mongoose are promises,because its an asynchronous operation
        //here by using Promise.all() , all the db queris will run concurrently making the code faster ..if not it will run sequentially leading to slower operation
        const applicants = await jobApplicationModel.find({ jobId: job._id });

        return { ...job.toObject(), applicants: applicants.length };
      })
    );

    return res.json({ success: true, jobsData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//change job application status
export const changeJobApplicationStatus = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;

    const job = await jobsModel.findById(id);

    if (companyId.toString() === job.companyId.toString()) {
      job.visible = !job.visible;
    }

    await job.save();

    return res.json({ success: true, job });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//change job visisbility
export const changeVisibility = async (req, res) => {};
