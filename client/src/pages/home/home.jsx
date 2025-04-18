import { useState } from 'react'

import './home.css'
import Hero from '../../components/hero/hero'
import JobListing from '../../components/joblistings/joblisting'
import AppDownload from '../../components/appdownload/appDownload'

export default function Home(){
    
    return(
        <div className="home">
           <Hero />
           <JobListing />
           <AppDownload />
        </div>
    )
}