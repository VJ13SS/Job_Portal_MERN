import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./jobcard.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function JobCard({ job }) {
  const navigate = useNavigate();
  const {url} = useContext(AppContext)

  return (
    <div className="jobcard">
      <div className="company-icon">
        <img src={`${url}/images/${job.companyId.image}`} alt="" />
      </div>
      <h4>{job.title}</h4>
      <div className="job-info">
        <span className="location">{job.location}</span>
        <span className="level">{job.level}</span>
      </div>
      <p
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
        className="job-description"
      ></p>
      {/* dangerouslySetInnerHTML is used to insert raw html content directly into DOM..Here it displays the first 150 characters */}
      <div className="buttons">
        <button
          className="apply"
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
        >
          Apply Now
        </button>
        {/*scrollTo() will scroll to the top of the webpage */}
        <button
          className="learn-more"
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
        >
          Learn More
        </button>
      </div>
    </div>
  );
}
