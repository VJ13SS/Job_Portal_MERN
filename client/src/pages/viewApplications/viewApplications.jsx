import { useEffect } from "react";
import { assets, viewApplicationsPageData } from "../../assets/assets";
import "./viewApplications.css";

export default function ViewApplications({setActiveClass}) {

  useEffect(()=>{
    setActiveClass('view')
  },[])
  
  return (
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
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                    <div className="applicant-name">
                    <img src={applicant.imgSrc} alt="" />
                    <span>{applicant.name}</span>
                    </div>
                  
                </td>
                <td>{applicant.jobTitle}</td>
                <td>{applicant.location}</td>
                <td>
                  <a href="" target="_blank">
                    Resume <img src={assets.resume_download_icon} />
                  </a>
                </td>
                <td>
                  <div className="actions">
                    <button>...</button>
                    <div className="action-options">
                      <button className="accept">Accept</button>
                      <button className="reject">Reject</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
    </div>
  );
}
