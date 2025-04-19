import { Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/home";
import Applications from "./pages/applications/applications";
import Navbar from "./components/navbar/navbar";
import LoginPopUp from "./components/loginpopup/loginpopup";
import { useState } from "react";
import Footer from "./components/footer/footer";
import ApplyJob from "./pages/applyJobs/applyjob";
import Dashboard from "./pages/dashboard/dashboard";
import AddJob from "./pages/addJob/addJob";
import ManageJobs from "./pages/manageJobs/manageJobs";
import ViewApplications from "./pages/viewApplications/viewApplications";
import 'quill/dist/quill.snow.css'

export default function App() {
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [recruiterLoggedIn, setRecruiterLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

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
            <Route path="/dashboard" element={<Dashboard />}>
              {/*Nested Routes */}
              <Route path="add-job" element={<AddJob />} />
              <Route path="manage-jobs" element={<ManageJobs />} />
              <Route path="view-applications" element={<ViewApplications />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      )}
    </>
  );
}
