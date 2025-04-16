import { useContext, useEffect, useState } from "react";
import "./joblisting.css";
import { AppContext } from "../../context/AppContext";
import {
  assets,
  JobCategories,
  JobLocations,
  jobsData,
} from "../../assets/assets";
import JobCard from "../jobcard/jobcard";

export default function JobListing() {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);

  const [showFilter, setShowFilter] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); //state variable to maintain the pagenation
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    //if the category is not present we adds it to the array else we removes it.
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    //if the location is not present we adds it to the array else we removes it.
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location]
    );
  };

  useEffect(() => {
    //one line filter functions
    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category); //return true if no category is selected(selectedCategories.length === 0) else checks if the category is present in the array..if yes it return true else false
    const matchesLocation = (job) =>
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location); //return true if no location is selected(selectedLocations.length === 0) else checks if the location is present in the array..if yes it return true else false

    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase()); //return true if no title is typed on the input field else checks if the title is present in the array..if yes it return true else false

    const matchesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase()); //return true if no location is typed on the input field else checks if the location is present in the array..if yes it return true else false

    //includes() checks if the search string exists anywhere inside the full title string.It dosent requires an exact match,just a substring match
    //Apply the filters to jobs
    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );
      //.slice() creates the copy of the array
      //by using the reverse the latest added jobs appears first
    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);

  return (
    <div className="job-listing">
      {/*SideBar */}
      <div className="sidebar">
        {/*Search Filter from hero component */}
        {isSearched &&
          (searchFilter.location !== "" || searchFilter.title !== "") && (
            <div className="search-filter">
              <h3>Current Search</h3>
              <div className="filters">
                {searchFilter.title !== "" && (
                  <div className="filter title">
                    <span>
                      {searchFilter.title}{" "}
                      <img
                        onClick={() =>
                          setSearchFilter((prev) => ({ ...prev, title: "" }))
                        }
                        src={assets.cross_icon}
                        alt=""
                      />
                    </span>
                  </div>
                )}
                {searchFilter.location != "" && (
                  <div className="filter location">
                    <span>
                      {searchFilter.location}{" "}
                      <img
                        onClick={() =>
                          setSearchFilter((prev) => ({ ...prev, location: "" }))
                        }
                        src={assets.cross_icon}
                        alt=""
                      />
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

        <button
          className="show-filter"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          {showFilter ? "Close" : "Filters"}
        </button>

        {/*Category Filter */}
        <div className={`category-filter ${showFilter ? "" : "hide-filters"}`}>
          <h4>Search By Category</h4>
          <ul>
            {JobCategories.map((category, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                />
                {category}
              </li>
            ))}
          </ul>
        </div>
        {/*Location Filter */}
        <div className={`category-filter ${showFilter ? "" : "hide-filters"}`}>
          <h4>Search By Location</h4>
          <ul>
            {JobLocations.map((location, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  onChange={() => handleLocationChange(location)}
                  checked={selectedLocations.includes(location)}
                />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*Job Listings */}
      <section className="job-section">
        <h3 id="job-list">Latest Jobs</h3>
        <p>Get your desired job from top companies</p>
        <div className="jobs">
          {/*Displays only the 6 jobs with respect to the current page number */}
          {filteredJobs
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
        </div>

        {/*Pagenation */}
        {filteredJobs.length > 0 && (
          <div className="pagenation">
            <a href="#job-list">
              <img
                src={assets.left_arrow_icon}
                alt=""
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              />
            </a>
            {/*Creates the array of pagenation buttons with respect to the length of the jobs array */}
            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map(
              (_, index) => (
                <a href="#job-list" key={index}>
                  <button
                    className={`${
                      currentPage === index + 1 ? "highlight-page" : ""
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </a>
              )
            )}
            <a href="#job-list">
              <img
                src={assets.right_arrow_icon}
                alt=""
                onClick={() =>
                  setCurrentPage(
                    Math.min(
                      currentPage + 1,
                      Math.ceil(filteredJobs.length / 6)
                    )
                  )
                }
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
