import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./navbar.css";

export default function Navbar({
  setShowUserLogin,
  setShowRecruiterLogin,
  userLoggedIn,
  recruiterLoggedIn,
  userName,
}) {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="nav-left">
        <img src={assets.logo} alt="" onClick={() => navigate("/")} />
      </div>
      {userLoggedIn ? (
        <div className="nav-right">
          <span>Hai {userName}</span>
          <span onClick={() => navigate('/applications')}>Applied Jobs</span>
        </div>
      ) : recruiterLoggedIn ? (
        <div className="nav-right">
          <span>Hai {userName}</span>
          <span>Job Requests</span>
        </div>
      ) : (
        <div className="nav-right">
          <button
            className="recruiter"
            onClick={() => setShowRecruiterLogin(true)}
          >
            Recruiter Login
          </button>
          <button className="user" onClick={() => setShowUserLogin(true)}>
            Login
          </button>
        </div>
      )}
    </div>
  );
}
