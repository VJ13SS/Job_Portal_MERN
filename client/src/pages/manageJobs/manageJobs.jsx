import './manageJobs.css'
import { manageJobsData } from "../../assets/assets";
import moment from "moment"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function ManageJobs({setActiveClass}){

    const navigate = useNavigate()

    useEffect(()=>{
        setActiveClass('manage')
    },[])
    return(
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
        {manageJobsData.map((job,index)=> (<tr key={index}>
            <td>{index + 1}</td>
            <td>{job.title}</td>
            <td>{moment(job.date).format('ll')}</td>
            <td>{job.location}</td>
            <td>{job.applicants}</td>
            <td>
                <input type="checkbox"  />
            </td>
        </tr>))}
            </tbody>
        </table>

        <button onClick={()=>navigate('/dashboard/add-job')}>Add New Job</button>
    </div>
    )
    
}