import "./hero.css";
import { assets } from "../../assets/assets";
import { useContext, useRef } from "react";
import { AppContext } from "../../context/AppContext";

export default function Hero() {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });

    setIsSearched(true);
  };

  return (
    <div className="container">
      <div className="hero">
        <h1>Over 10,000+ jobs to apply</h1>
        <p>
          Your Next Big Career Move Starts Here - Explore the Best Job
          Opportunities
        </p>
        <div className="search-box">
          <div className="search">
            <img src={assets.search_icon} alt="" />
            <input type="text" placeholder="Search For Jobs" ref={titleRef} />
          </div>
          <div className="search">
            <img src={assets.location_icon} alt="" />
            <input type="text" placeholder="Location" ref={locationRef} />
          </div>
          <button onClick={onSearch}>Search</button>
        </div>
      </div>
      <div className="trusted-by">
        <p>Trusted By : </p>
        <img src={assets.microsoft_logo} alt="" />
        <img src={assets.walmart_logo} alt="" />
        <img src={assets.accenture_logo} alt="" />
        <img src={assets.amazon_logo} alt="" />
        <img src={assets.samsung_logo} alt="" />
        <img src={assets.adobe_logo} alt="" />
      </div>
    </div>
  );
}
