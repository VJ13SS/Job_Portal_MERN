import { useContext } from "react";
import "./joblisting.css";
import { AppContext } from "../../context/AppContext";
import { assets, JobCategories, JobLocations, jobsData } from "../../assets/assets";
import JobCard from "../jobcard/jobcard";

export default function JobListing() {
  const { isSearched, searchFilter, setSearchFilter,jobs } = useContext(AppContext);

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

        {/*Category Filter */}
        <div className="category-filter">
          <h4>Search By Category</h4>
          <ul>
            {JobCategories.map((category, index) => (
              <li key={index}>
                <input type="checkbox" name="" id="" />
                {category}
              </li>
            ))}
          </ul>
        </div>
        {/*Location Filter */}
        <div className="category-filter">
          <h4>Search By Location</h4>
          <ul>
            {JobLocations.map((location, index) => (
              <li key={index}>
                <input type="checkbox" name="" id="" />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*Job Listings */}
      <section className="job-section">
        <h3>Latest Jobs</h3>
        <p>Get your desired job from top companies</p>
        <div className="jobs">
          {jobs.map((job,index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
}
