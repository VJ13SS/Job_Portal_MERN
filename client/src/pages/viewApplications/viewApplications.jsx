import { useContext, useEffect, useState } from "react";
import { assets, viewApplicationsPageData } from "../../assets/assets";
import "./viewApplications.css";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/loading/loading";

export default function ViewApplications({ setActiveClass }) {
  const { url, user } = useContext(AppContext);

  const [applicants, setApplicants] = useState([]);

  //function to ftech company job applications data
  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(url + "/api/company/applicants", {
        headers: { token: JSON.parse(localStorage.getItem("userDetails")).token },
      });
      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        alert('hello')
        toast.error(data.message);
        
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //function to update job application status
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        url + "/api/company/change-status",
        { id, status },
        { headers: { token: user.token } }
      );
      if (data.success) {
        fetchCompanyJobApplications(); //to fetch the latest data
      } else {
        toast.error(data.message);
        
      }
    } catch (error) {
      
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setActiveClass("view");
    fetchCompanyJobApplications();
  }, []);

  return applicants ? (
    applicants.length === 0 ? (
      <div className="view-applications"><p>No Applications Available</p></div>
    ) : (
      <div className="view-applications">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>UserName</th>
              <th>Job Title</th>
              <th>Location</th>
              <th>Resume</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants
              .filter((item) => item.jobId && item.userId)
              .map((applicant, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="applicant-name">
                      <img
                        src={`${url}/files/${applicant.userId.image}`}
                        alt=""
                      />
                      <span>{applicant.userId.name}</span>
                    </div>
                  </td>
                  <td>{applicant.jobId.title}</td>
                  <td>{applicant.jobId.location}</td>
                  <td>
                    <a
                      href={`${url}/files/${applicant.userId.resume}`}
                      target="_blank"
                    >
                      Resume <img src={assets.resume_download_icon} />
                    </a>
                  </td>
                  <td>
                    {applicant.status === "Pending" ? (
                      <div className="actions">
                        <button>...</button>
                        <div className="action-options">
                          <button
                            className="accept"
                            onClick={() =>
                              changeJobApplicationStatus(
                                applicant._id,
                                "Accepted"
                              )
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="reject"
                            onClick={() =>
                              changeJobApplicationStatus(
                                applicant._id,
                                "Rejected"
                              )
                            }
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>{applicant.status}</div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )
  ) : (
    <Loading />
  );
}
