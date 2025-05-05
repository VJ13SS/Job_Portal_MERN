import { useNavigate, useParams } from "react-router-dom";
import "./applyjob.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/loading/loading";
import { assets } from "../../assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import JobCard from "../../components/jobcard/jobcard";
import axios from "axios";
import { toast } from "react-toastify";

export default function ApplyJob() {
  const { id } = useParams(); //to obtail the parameters from the URL
  const navigate = useNavigate()

  const [jobData, setJobData] = useState(null);

  const { jobs,url,user } = useContext(AppContext);

  const fetchJob = async () => {
    
    try {
      const {data} = await axios.get(url + `/api/jobs/${id}`)
      if (data.success) {
        setJobData(data.job)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    
  };

  const applyHandler = async () => {
    try {
      if(!user.token){
        toast.error('Login to apply for jobs')
      }

      if(!user.resume){
        navigate('/applications')
        toast.error('Upload Resume to apply')
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    //for the job details to be appeared on reloading the page
      fetchJob();
    
  }, [id]);

  return jobData ? (
    <div className="applyjob">
      <div className="applyjob-job-hero">
        <div className="applyjob-job-hero-left">
          <div className="applyjob-company-icon">
          <img src={`${url}/images/${jobData.companyId.image}`} alt="" />
          </div>

          <div className="applyjob-job-info">
            <h1>{jobData.title}</h1>
            <div className="applyjob-job-info-icons">
              <span>
                <img src={assets.suitcase_icon} alt="" />
                {jobData.companyId.name}
              </span>
              <span>
                <img src={assets.location_icon} alt="" />
                {jobData.location}
              </span>
              <span>
                <img src={assets.person_icon} alt="" />
                {jobData.level}
              </span>
              <span>
                <img src={assets.money_icon} alt="" />
                CTC: {kconvert.convertTo(jobData.salary)}
              </span>
            </div>
          </div>
        </div>
        <div className="applyjob-job-hero-right">
          <button onClick={applyHandler}>Apply Now</button>
          <p>Posted {moment(jobData.date).fromNow()}</p>
        </div>
      </div>
      
        <div className="apply-job-content">
          <div className="applyjob-job-description">
            <h2>Job Description</h2>
            <div
              className="rich-text"
              dangerouslySetInnerHTML={{ __html: jobData.description }}
            ></div>
            <button onClick={applyHandler}>Apply Now</button>
          </div>
          <div className="apply-job-sidebar">
            <h2>More Jobs from {jobData.companyId.name}</h2>
            {jobs.filter(job => job._id !== jobData._id && job.companyId._id === jobData.companyId._id).filter(job => true).slice(0,4).map((job,index) => <JobCard key={index} job={job} />)}
          </div>
        </div>
      
    </div>
  ) : (
    <div className="loading-screen">
      <Loading />
    </div>
  );
}
