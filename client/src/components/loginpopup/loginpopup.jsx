import { useContext, useState } from "react";
import "./loginpopup.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

export default function LoginPopUp({
  showUserLogin,
  showRecruiterLogin,
  setShowUserLogin,
  setShowRecruiterLogin,
  url,
}) {
  const {setUser} = useContext(AppContext)
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [image, setImage] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currentState == "Sign Up") {
      const formData = new FormData(); //since we need to send images we use form data
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("image", image);

      console.log(formData);
      const response = await axios.post(`${url}/api/user/sign-up`, formData);
      if (response.data.success) {
        alert("Registered new user");
        console.log(response.data.token);
        setCurrentState("Login");
      } else {
        alert(response.data.message);
      }

      return;
    }

    //if the current state is login

    const response = await axios.post(`${url}/api/user/login`, data);
    if (response.data.success) {
      console.log(response.data)
      setUser((prev) => ({
        ...prev,
        token:response.data.userDetails.token,
        name: response.data.userDetails.user.name,
        userImg: response.data.userDetails.user.image,
        userType: response.data.userDetails.userType,
      }));
      localStorage.setItem("userDetails",JSON.stringify(response.data.userDetails))
    } else {
      alert(response.data.message);
      return;
    }

    if (showUserLogin) {
      setShowUserLogin(false);
    }
    if (showRecruiterLogin) {
      setShowRecruiterLogin(false);
    }
  };

  const handleClose = () => {
    if (showUserLogin) {
      
      setShowUserLogin(false);
    }
    if (showRecruiterLogin) {
      
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
          {currentState === "Sign Up" && (
            <>
              {showRecruiterLogin ? (
                <p>Upload Company Icon</p>
              ) : (
                <p>Upload Profile icon</p>
              )}
              <div className="add-img-upload">
                <label htmlFor="company-logo">
                  <img
                    src={
                      image ? URL.createObjectURL(image) : assets.upload_area
                    }
                    alt=""
                  />
                </label>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
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
