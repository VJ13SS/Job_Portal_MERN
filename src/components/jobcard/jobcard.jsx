import { assets } from '../../assets/assets'
import './jobcard.css'

export default function JobCard({job}){
    return(
        <div className="jobcard">
            <div className='company-icon'>
                <img src={assets.company_icon} alt="" />
            </div>
            <h4>{job.title}</h4>
            <div className='job-info'>
                <span className='location'>{job.location}</span>
                <span className='level'>{job.level}</span>
            </div>
            <p dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}} className='job-description'></p>
            {/* dangerouslySetInnerHTML is used to insert raw html content directly into DOM..Here it displays the first 150 characters */}
            <div className='buttons'>
                <button className='apply'>Apply Now</button>
                <button className='learn-more'>Learn More</button>
            </div>
        </div>
    )
}