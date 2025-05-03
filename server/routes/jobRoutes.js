import express from "express"
import { getJobById, getJobs } from "../controllers/jobController.js"

const jobRouter = express.Router()

//route to get all jobs data
jobRouter.get('/',getJobs)

//route to get a single job by id
jobRouter.get('/:id',getJobById)


export default jobRouter