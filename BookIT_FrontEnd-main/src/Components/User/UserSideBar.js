import React from 'react'
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "../adminpage/AdminSidebar";
import AdminNavbar from "../adminpage/AdminNavbar";
import './UserSideBar.css'

const UserSideBar = () => {

  const navigate = useNavigate()

  const logoutHandler = () => {
    window.localStorage.removeItem("token")
    navigate('/')
  }

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <div className="AdminSidebar1">
      <div className="top1">
        <span className="Adminlogo1">Bookit</span>
      </div>
      <hr />
      <div className="center1">
        <ul className="centerlist1">
          <p className="admintitle1">USER</p>

          <NavLink
            href="/profile"
            className={splitLocation[1] === "profile" ? "active-btn" : ""}
          >
            <li className="sidebarlist1">
              <PersonOutlineOutlinedIcon className="Adminicon1" />
              <span className="Adminspan1">Your Profile</span>
            </li>
          </NavLink>

          <NavLink
            href="/"
            className={splitLocation[1] === "bookinglist" ? "active-btn" : ""}
          >
            <li className="sidebarlist1">
              <ConfirmationNumberIcon className="Adminicon1" />
              <span className="Adminspan1">Your Bookings</span>
            </li>
          </NavLink>
          <NavLink onClick={logoutHandler}>
            <li className="sidebarlist1">
              <LogoutIcon className="Adminicon1" />
              <span className="Adminspan1">Logout</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>

  )
}

export default UserSideBar