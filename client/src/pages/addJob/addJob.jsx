import { useState,useRef, useEffect } from 'react'
import './addJob.css'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../../assets/assets'

export default function AddJob(){

    {/*For the rescruiters to add rich text(to make the text bold,add it as points,etc we use a pacakage called quill) */}

    const [title,setTitle] = useState('')
    const [location,setLocation] = useState('Bangalore')
    const [category,setCategory] = useState('Programming')
    const [level,setLevel] = useState('Beginner')
    const [salary,setSalary] = useState(0)

    const editorRef = useRef(null)
    const quillRef = useRef(null)

    useEffect(()=>{
        //Initiate Quill only once
        if(!quillRef.current && editorRef.current){
            quillRef.current = new Quill(editorRef.current,{
                theme:'snow',
            })
        }
    },[])

    return(
        <div className="add-job">
            <form action="">
                <div>
                    <p>Job Title</p>
                    <input type="text" name="" id="" placeholder='Type here' onChange={(e) => setTitle(e.target.value)} value={title} required/>
                </div>
                <div>
                    <p>Job Description</p>
                    <div ref={editorRef}>
                        {/*To use the quill editor */}
                    </div>
                </div>
                <div>
                    <div>
                        <p>Job Category</p>
                        <select name="" id="" onChange={(e) => setCategory(e.target.value)}>
                            {JobCategories.map((category,index)=>(<option key={index} value={category}>{category}</option>))}
                        </select>
                    </div>
                    <div>
                        <p>Job Location</p>
                        <select name="" id="" onChange={(e) => setLocation(e.target.value)}>
                            {JobLocations.map((location,index)=>(<option key={index} value={location}>{location}</option>))}
                        </select>
                    </div>
                    <div>
                        <p>Job Level</p>
                        <select name="" id="" onChange={(e) => setLevel(e.target.value)}>
                            <option value="Beginner level">Beginner level</option>
                            <option value="Intermediate level">Intermediate level</option>
                            <option value="Senior level">Senior level</option>
                        </select>
                    </div>
                </div>
                <div>
                    <p>Job Salary</p>
                    <input type="number" name="" id="" placeholder='2500' onChange={(e) => setSalary(e.target.value)} />
                </div>
                <button>Add</button>
            </form>
        </div>
    )
}