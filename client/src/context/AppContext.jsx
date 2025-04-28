import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);

  const [jobs,setJobs] = useState([])
  const [user, setUser] = useState({});

  //function to fetch job data
  const fetchJobs = async () => {
    setJobs(jobsData)
  }

  useEffect(() => {
    fetchJobs()
    if(localStorage.getItem("userDetails")){
      console.log('hello')
      console.log(JSON.parse(localStorage.getItem("userDetails")))
      setUser((prev) => ({
        ...prev,
        token:JSON.parse(localStorage.getItem("userDetails")).token,
        name: JSON.parse(localStorage.getItem("userDetails")).user.name,
        userImg: JSON.parse(localStorage.getItem("userDetails")).user.image,
        userType: JSON.parse(localStorage.getItem("userDetails")).userType,
      }));
    }
  },[])


  const value = {
    searchFilter,
    setSearchFilter,
    setIsSearched,
    isSearched,
    jobs,
    setJobs,
    user,
    setUser
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
