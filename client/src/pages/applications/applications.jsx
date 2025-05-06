import { useContext, useEffect, useState } from "react";
import "./applications.css";
import { assets, jobsApplied } from "../../assets/assets";
import moment from "moment";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function Applications() {
  const { url, user, setUser,userApplications,getUserApplicationsData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(user.userResume !== ""?false:true);
  const [resume, setResume] = useState(null);
  
  const [userDetails,setUserDetails] = useState(JSON.parse(localStorage.getItem('userDetails')))

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append("id", user.id);
      formData.append("resume", resume);

      const { data } = await axios.post(
        url + "/api/user/update-resume",
        formData
      );

      if (data.success) {
        toast.success("Resume Updated Successfully");
        console.log(data, "success");
        setUser((prev) => ({ ...prev, resume: data.userData.resume }));
        
        setUserDetails((prev) => ({...prev,user:{...prev.user,resume:data.userData.resume}}));
        localStorage.setItem('userDetails',JSON.stringify(userDetails))

        setIsEdit(false);
        setResume(false)
      } else {
        toast.error(data.message);
      }

      //setResume(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    if (user) {
      getUserApplicationsData()
    }
  },[user])

  return (
    <div className="applications">
      <div className="resume">
        <h2>Your Resume</h2>
        <div className="resume-options">
          {isEdit || (user && user.userResume === "") ? (
            <div className="resume-edit">
              <p>{resume ? resume.name : "Select Resume"}</p>
              <label htmlFor="resumeUpload">
                <input
                  id="resumeUpload"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  hidden
                />
                <img src={assets.profile_upload_icon} alt="" />
              </label>
              <button onClick={updateResume}>Save</button>
            </div>
          ) : (
            <div>
              <a href={`${url}/files/${user.userResume}`}>{user.userResume ? user.userResume : "Resume"}</a>
              <button onClick={() => setIsEdit(true)}>Edit</button>
            </div>
          )}
          <div className="applications-table">
            <h2>Jobs Applied</h2>
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Job Title</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {userApplications.map((job, index) =>
                  true ? (
                    <tr key={index}>
                      <td>
                        <img src={`${url}/files/${job.companyId.image}`} alt="" />
                        {job.companyId.name}
                      </td>
                      <td>{job.jobId.title}</td>
                      <td>{job.jobId.location}</td>
                      <td>{moment(job.date).format("ll")}</td>
                      <td>
                        <span
                          className={`${
                            job.status === "Pending"
                              ? "Pending"
                              : job.status === "Rejected"
                              ? "Rejected"
                              : "Accepted"
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
