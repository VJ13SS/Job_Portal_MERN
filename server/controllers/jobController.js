import jobsModel from "../models/job.js";

//get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await jobsModel
      .find({ visible: true })
      .populate({ path: "companyId", select: "-password" }); //we will get the company id from which we populate to get the company data ,the password in the company data is removed using the select statement

      return res.json({success:true,jobs})
  } catch (error) {
    console.log(error)
    return res.json({success:false,message:error.message})
  }
};

//get job by id
export const getJobById = async (req, res) => {
    try {
        const {id} = req.params

        const job = await jobsModel.findById(id).populate({path:"companyId",select:'-password'})

        if(!job){
            return res.json({success:false,message:"Job not found"})
        }

        return res.json({success:true,job})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
};
