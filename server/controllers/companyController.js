import company from "../models/company.js"


//register a new company
export const registerCompany = async (req,res) => {
    const {name,email,password} = req.body

    const imageFile = req.file

    if (!name || !email || !password ||!imageFile) {
        return res.json({success:false,message:'Missing details'})
    }

    try {
        const companyExists = await company.findOne({email})

        if(companyExists){
            return res.json({success:false,message:"Company already registered"})
        }
    } catch (error) {
        
    }
    
}

//company login
export const loginCompany = async (req,res) => {

}

//get company data
export const getCompanyData = async (req,res) => {

}

//post a new job
export const postJob = async (req,res) => {

}

//get company job applicants
export const getCompanyJobApplicants = async (req,res) => {

}

//get company posted jobs
export const getCompanyPostedJobs = async (req,res) => {

}

//change job application status
export const changeJobApplicationStatus = async (req,res) => {

}

//change job visisbility 
export const changeVisibility = async (req,res) =>{

}