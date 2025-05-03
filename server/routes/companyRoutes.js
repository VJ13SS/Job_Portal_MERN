import express from 'express'
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const companyRouter = express.Router()

//Register a company
companyRouter.post('/register',upload.single("image"),    registerCompany)

//company login
companyRouter.post('/login',loginCompany)

//post a job
companyRouter.post('/post-job',authMiddleware,postJob)

//get applicants data of company
companyRouter.get('/applicants',authMiddleware,getCompanyJobApplicants)

//get company job list
companyRouter.get('/list-jobs',authMiddleware,getCompanyPostedJobs)

//change application status
companyRouter.post('/change-status',authMiddleware,changeJobApplicationStatus)

//change application visibility
companyRouter.post('/change-visibility',authMiddleware,changeVisibility)

export default companyRouter