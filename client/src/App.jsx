import { Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/home";
import Applications from "./pages/applications/applications";

import Navbar from "./components/navbar/navbar";
import LoginPopUp from "./components/loginpopup/loginpopup";
import { useState } from "react";
import Footer from "./components/footer/footer";
import ApplyJob from "./pages/applyJobs/applyjob";

export default function App() {
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [recruiterLoggedIn, setRecruiterLoggedIn] = useState(false);
  const [userName,setUserName] = useState('')

  return (
    <>
      {showUserLogin || showRecruiterLogin ? (
        <LoginPopUp
          showUserLogin={showUserLogin}
          showRecruiterLogin={showRecruiterLogin}
          setShowUserLogin={setShowUserLogin}
          setShowRecruiterLogin={setShowRecruiterLogin}
          setRecruiterLoggedIn={setRecruiterLoggedIn}
          setUserLoggedIn={setUserLoggedIn}
          setUserName={setUserName}
        />
      ) : (
        <div className="app">
          <Navbar
            setShowUserLogin={setShowUserLogin}
            setShowRecruiterLogin={setShowRecruiterLogin}
            userLoggedIn={userLoggedIn}
            recruiterLoggedIn={recruiterLoggedIn}
            userName={userName}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/apply-job/:id" element={<ApplyJob />} />
          </Routes>
          <Footer />
        </div>
      )}
    </>
  );
}
