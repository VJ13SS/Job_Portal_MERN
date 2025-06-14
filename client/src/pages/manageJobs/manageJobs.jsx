import "./manageJobs.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/loading/loading";

export default function ManageJobs({ setActiveClass }) {
  const navigate = useNavigate();
  const { url, user } = useContext(AppContext);

  const [jobs, setJobs] = useState(false);

  //function to fetch company job applications data
  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(url + "/api/company/list-jobs", {
        headers: { token: user.token },
      });

      if (data.success) {
        setJobs(data.jobsData.reverse()); //to get the new added jobs first
        console.log(data.jobsData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //function to change job visibility
  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        url + "/api/company/change-visibility",
        {
          id,
        },
        { headers: { token: user.token } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchCompanyJobs();
      } else {
        
        toast.error(data.message);
      }
    } catch (error) {
      
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setActiveClass("manage");
    if (user.token) {
      fetchCompanyJobs();
    }
  }, [user.token]);

  return jobs ? jobs.length === 0 ? (<div className="manage-jobs"><p>No Jobs Avalialbe</p></div>):(
    <div className="manage-jobs">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Job Title</th>
            <th>Date</th>
            <th>Location</th>
            <th>Applications</th>
            <th>Visible</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{job.title}</td>
              <td>{moment(job.date).format("ll")}</td>
              <td>{job.location}</td>
              <td>{job.applicants}</td>
              <td>
                <input
                  type="checkbox"
                  onChange={() => changeJobVisibility(job._id)}
                  checked={job.visible}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => navigate("/dashboard/add-job")}>
        Add New Job
      </button>
    </div>
  ):(<Loading />);
}
