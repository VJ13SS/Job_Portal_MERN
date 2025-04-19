import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./dashboard.css";
import { assets } from "../../assets/assets";
import { useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeClass,setActiveClass] = useState("add")

  return (
    <div className="dashboard">
      <div className="dashboard-left">
        {/*Left side bar with options to add , manage jobs and view applications */}
        <ul>
          <NavLink to={"/dashboard/add-job"} onClick={() => setActiveClass('add')} className={`dashboard-icon ${activeClass === 'add' ? 'active-icon' :'' }`}>
            <img src={assets.add_icon} alt="" />
            <p>Add Job</p>
          </NavLink>
          <NavLink to={"/dashboard/manage-jobs"} onClick={()=>setActiveClass('manage')} className={`dashboard-icon ${activeClass === 'manage' ? 'active-icon' :'' }`}>
            <img src={assets.home_icon} alt="" />
            <p>Manage Jobs</p>
          </NavLink>
          <NavLink to={"/dashboard/view-applications"} onClick={()=> setActiveClass('view')} className={`dashboard-icon ${activeClass === 'view' ? 'active-icon' :'' }`}>
            <img src={assets.person_tick_icon} alt="" />
            <p>View Applications</p>
          </NavLink>
        </ul>
      </div>
      <div>{/* To render the routes inside the nested dasboard route*/}
        <Outlet />
      </div>
    </div>
  );
}
