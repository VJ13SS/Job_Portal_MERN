import { useState } from "react";
import "./applications.css";
import { assets, jobsApplied } from "../../assets/assets";
import moment from "moment";

export default function Applications() {
  const [isEdit, setIsEdit] = useState(false);
  const [resume,setResume] = useState(null)

  return (
    <div className="applications">
      <div className="resume">
        <h2>Your Resume</h2>
        <div className="resume-options">
          {isEdit ? (
            <div className="resume-edit">
                <p>Select Resume</p>
              <label htmlFor="resumeUpload">
                
                <input id='resumeUpload' type="file" accept="application/pdf" onChange={e => setResume(e.target.files[0])} hidden/>
                <img src={assets.profile_upload_icon} alt="" />
              </label>
              <button onClick={()=>setIsEdit(false)}>Save</button>
            </div>
          ) : (
            <div>
              <a href="">Resume</a>
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
                    {jobsApplied.map((job,index) => true ? (<tr key={index}>
                        <td>
                            <img src={job.logo} alt="" />
                            {job.company}
                        </td>
                        <td>{job.title}</td>
                        <td>{job.location}</td>
                        <td>{moment(job.date).format('ll')}</td>
                        <td><span className={`${job.status === 'Pending' ?'Pending': job.status === 'Rejected' ?'Rejected' : 'Accepted'}`}>{job.status}</span></td>
                    </tr>):(null))}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
