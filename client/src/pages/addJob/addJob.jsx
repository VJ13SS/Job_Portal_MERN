import { useState, useRef, useEffect, useContext } from "react";
import "./addJob.css";
import Quill from "quill";
import { JobCategories, JobLocations } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function AddJob({ setActiveClass }) {
  {
    /*For the rescruiters to add rich text(to make the text bold,add it as points,etc we use a pacakage called quill) */
  }
  const { url } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner");
  const [salary, setSalary] = useState(0);
  const { user } = useContext(AppContext);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const description = quillRef.current.root.innerHTML;

      const { data } = await axios.post(
        url + "/api/company/post-job",
        {
          title,
          description,
          location,
          salary,
          category,
          level,
        },
        { headers: { token: user.token } }
      );
    
      if (data.success) {
        toast.success('Added Successfully');
        setTitle("");
        setSalary(0);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    //Initiate Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
    setActiveClass("add");
  }, []);
  return (
    <div className="add-job">
      <form action="" onSubmit={onSubmitHandler}>
        <div className="add-job-title">
          <p>Job Title</p>
          <input
            type="text"
            name=""
            id=""
            placeholder="Type here"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>
        <div className="add-job-description">
          <p>Job Description</p>
          <div ref={editorRef}>{/*To use the quill editor */}</div>
        </div>
        <div className="add-job-labels">
          <div className="add-job-label">
            <p>Job Category</p>
            <select name="" id="" onChange={(e) => setCategory(e.target.value)}>
              {JobCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="add-job-label">
            <p>Job Location</p>
            <select name="" id="" onChange={(e) => setLocation(e.target.value)}>
              {JobLocations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="add-job-label">
            <p>Job Level</p>
            <select name="" id="" onChange={(e) => setLevel(e.target.value)}>
              <option value="Beginner level">Beginner level</option>
              <option value="Intermediate level">Intermediate level</option>
              <option value="Senior level">Senior level</option>
            </select>
          </div>
        </div>
        <div className="add-job-salary">
          <p>Job Salary</p>
          <input
            min={0}
            type="number"
            name=""
            id=""
            placeholder="2500"
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <button>Add</button>
      </form>
    </div>
  );
}
