import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const url = "http://localhost:5000"; //base url for backend
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState({});

  //function to fetch job data
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(url + "/api/jobs");

      if (data.success) {
        setJobs(data.jobs);
        console.log(data.jobs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
    if (localStorage.getItem("userDetails")) {
      setUser((prev) => ({
        ...prev,
        token: JSON.parse(localStorage.getItem("userDetails")).token,
        id: JSON.parse(localStorage.getItem("userDetails")).user._id,
        name: JSON.parse(localStorage.getItem("userDetails")).user.name,
        userImg: JSON.parse(localStorage.getItem("userDetails")).user.image,
        userType: JSON.parse(localStorage.getItem("userDetails")).userType,
        userResume: JSON.parse(localStorage.getItem("userDetails")).user.resume
          ? JSON.parse(localStorage.getItem("userDetails")).user.resume
          : "",//for applicants not for recruiters
      }));
    }
  }, [localStorage.getItem("userDetails")]);

  const value = {
    url,
    searchFilter,
    setSearchFilter,
    setIsSearched,
    isSearched,
    jobs,
    setJobs,
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
