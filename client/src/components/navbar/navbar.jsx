import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./navbar.css";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function Navbar({
  setShowUserLogin,
  setShowRecruiterLogin,
  url,
}) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);
  const logOut = () => {
    localStorage.removeItem("userDetails");
    navigate("/");
    setUser({});
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <img src={assets.logo} alt="" onClick={() => navigate("/")} />
      </div>
      {user.token && user.userType== "user" ? (
        <div className="nav-right">
          <span>{user.name}</span>

          <div className="profile">
            <img
              src={`${url}/files/${user.userImg}`}
              className="profile-img"
              alt=""
            />
            <div className="profile-options">
              <span onClick={() => navigate("/applications")}>
                Applied Jobs
              </span>
              <span onClick={logOut}>Log Out</span>
            </div>
          </div>
        </div>
      ) : user.token && user.userType== "recruiter" ? (
        <div className="nav-right">
          <span>{user.name}</span>

          <div className="profile">
            <img src={`${url}/files/${user.userImg}`}/>
            <div className="profile-options">
              <span onClick={() => navigate("/dashboard/add-job")}>
                Dashboard
              </span>
              <span onClick={logOut}>Log Out</span>
            </div>
          </div>
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
