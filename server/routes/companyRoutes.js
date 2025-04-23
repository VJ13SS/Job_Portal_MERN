import express from 'express'
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'

const companyRouter = express.Router()

//Register a company
companyRouter.post('/register',upload.single("image"),    registerCompany)

//company login
companyRouter.post('/login',loginCompany)

//get company data
companyRouter.get('/company',getCompanyData)

//post a job
companyRouter.post('/post-job',postJob)

//get applicants data of company
companyRouter.get('/applicants',getCompanyJobApplicants)

//get company job list
companyRouter.get('/list-jobs',getCompanyPostedJobs)

//change application status
companyRouter.post('/change-status',changeJobApplicationStatus)

//change application visibility
companyRouter.post('/change-visibility',changeVisibility)

export default companyRouter