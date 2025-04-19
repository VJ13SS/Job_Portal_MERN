import { useState } from "react";
import "./loginpopup.css";
import { assets } from "../../assets/assets";

export default function LoginPopUp({
  showUserLogin,
  showRecruiterLogin,
  setShowUserLogin,
  setShowRecruiterLogin,
  setRecruiterLoggedIn,
  setUserLoggedIn,
  setUserName,
}) {
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [companyLogo, setCompanyLogo] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (showUserLogin) {
      setUserName(data.name);
      setUserLoggedIn(true);
      setShowUserLogin(false);
    }
    if (showRecruiterLogin) {
      setUserName(data.name);
      setRecruiterLoggedIn(true);
      setShowRecruiterLogin(false);
    }

    setData({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleClose = () => {
    if (showUserLogin) {
      setUserLoggedIn(false);
      setShowUserLogin(false);
    }
    if (showRecruiterLogin) {
      setRecruiterLoggedIn(false);
      setShowRecruiterLogin(false);
    }
  };

  return (
    <div className="login-popup">
      <form action="" className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>
            {showUserLogin ? "User's" : "Recruiter's"} {currentState}
          </h2>

          <img src={assets.cross_icon} alt="" onClick={handleClose} />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder={showUserLogin ? "Your Name" : "Company Name"}
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}
          <input
            type="email"
            placeholder={showUserLogin ? "Your Email" : "Company Email"}
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
          {currentState === "Sign Up" && showRecruiterLogin && (
            <>
              <p>Upload Company Icon</p>
              <div className="add-img-upload">
                <label htmlFor="company-logo">
                  <img
                    src={
                      companyLogo
                        ? URL.createObjectURL(companyLogo)
                        : assets.upload_area
                    }
                    alt=""
                  />
                </label>
                <input
                  type="file"
                  onChange={(e) => setCompanyLogo(e.target.files[0])}
                  id="company-logo"
                  hidden
                  required
                />
              </div>
            </>
          )}
          <button>
            {currentState == "Login" ? "Login" : "Create new Account"}
          </button>
          <div className="login-popup-condition">
            <input type="checkbox" name="" required />
            <p>By Continuing,i agree to all terms and conditions</p>
          </div>
        </div>
        {currentState === "Login" ? (
          <p onClick={() => setCurrentState("Sign Up")}>
            Create new Account? <span>Click Here</span>
          </p>
        ) : (
          <p onClick={() => setCurrentState("Login")}>
            Already have an Account? <span>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
}
