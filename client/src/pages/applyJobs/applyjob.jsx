import { useParams } from "react-router-dom";
import "./applyjob.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/loading/loading";
import { assets } from "../../assets/assets";
import kconvert from "k-convert";
import moment from "moment";

export default function ApplyJob() {
  const { id } = useParams(); //to obtail the parameters from the URL

  const [jobData, setJobData] = useState(null);

  const { jobs } = useContext(AppContext);

  const fetchJob = async () => {
    const data = jobs.filter((job) => job._id === id);

    if (data.length != 0) {
      setJobData(data[0]);
      console.log(data[0]);
    }
  };

  useEffect(() => {
    //for the job details to be appeared on reloading the page
    if (jobs.length > 0) {
      fetchJob();
    }
  }, [id, jobs]);

  return jobData ? (
    <div className="applyjob">
      <div className="applyjob-job-hero">
        <div className="applyjob-job-hero-left">
          <div className="applyjob-company-icon">
            <img src={jobData.companyId.image} alt="" />
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
          <button>Apply Now</button>
          <p>Posted {moment(jobData.date).fromNow()}</p>
        </div>
      </div>
      <div>
        <div>
          <div className="applyjob-job-description">
            <h2>Job Description</h2>
            <div className="rich-text"
              dangerouslySetInnerHTML={{ __html: jobData.description }}
            ></div>
            <button>Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="loading-screen">
      <Loading />
    </div>
  );
}
