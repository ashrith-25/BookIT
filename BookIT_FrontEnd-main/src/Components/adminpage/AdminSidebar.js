import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./AdminSidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-bootstrap";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const logoutHandler = () => {
    window.localStorage.removeItem("admintoken");
    navigate("/");
  };

  return (
    <div className="AdminSidebar">
      <div className="top">
        <span className="Adminlogo">Bookit</span>
      </div>
      <hr />
      <div className="center">
        <ul class="centerlist">
          <p className="admintitle">MAIN</p>
          <NavLink
            href="/admin"
            className={splitLocation[1] === "admin" ? "active-btn" : ""}
          >
            <li className="sidebarlist" id="sidebarlist">
              <DashboardIcon className="Adminicon" />
              <span className="Adminspan">DashBoard</span>
            </li>
          </NavLink>
          <p className="admintitle">LISTS</p>

          <NavLink
            href="/userlist"
            className={splitLocation[1] === "userlist" ? "active-btn" : ""}
          >
            <li className="sidebarlist" id="sidebarlist1">
              <PersonOutlineOutlinedIcon className="Adminicon" />
              <span className="Adminspan">Users</span>
            </li>
          </NavLink>

          <NavLink
            href="busseslist"
            className={splitLocation[1] === "busseslist" ? "active-btn" : ""}
          >
            <li className="sidebarlist" id="sidebarlist2">
              <DirectionsBusFilledOutlinedIcon className="Adminicon" />
              <span className="Adminspan">Busses</span>
            </li>
          </NavLink>

          <NavLink
            href="bookinglist"
            className={splitLocation[1] === "bookinglist" ? "active-btn" : ""}
          >
            <li className="sidebarlist" id="sidebarlist3">
              <ConfirmationNumberIcon className="Adminicon" />
              <span className="Adminspan">Bookings</span>
            </li>
          </NavLink>

          <p className="admintitle">USER</p>

          <NavLink href="" onClick={logoutHandler}>
            <li className="sidebarlist">
              <LogoutIcon className="Adminicon" />
              <span className="Adminspan">Logout</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
