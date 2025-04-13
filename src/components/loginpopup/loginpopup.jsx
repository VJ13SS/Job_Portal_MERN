import { useState } from "react";
import "./loginpopup.css";

export default function LoginPopUp({
  showUserLogin,
  showRecruiterLogin,
  setShowUserLogin,
  setShowRecruiterLogin,
}) {
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login-popup">
      <form action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>
            {showUserLogin ? "User's" : "Recruiter's"} {currentState}
          </h2>
          <span
            onClick={() =>
              showUserLogin
                ? setShowUserLogin(false)
                : setShowRecruiterLogin(false)
            }
          >
            X
          </span>
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
          <button type="submit">
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
