import React from "react";
import "./AdminNavbar.css";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import SearchIcon from "@mui/icons-material/Search";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
const AdminNavbar = () => {
  const navigate = useNavigate();
  let admintoken = window.localStorage.getItem("admintoken");

  const logoutHandler = () => {
    window.localStorage.removeItem("admintoken");
    navigate("/");
  };

  const handlelogout = () => {
    window.localStorage.removeItem("admintoken");
    navigate("/");
  };

  return (
    <div className="AdminNavbar">
      <div className="Adminwrapper">
        <div className="dashboard">
          {/* <input type='text' placeholder='Search...' className="Navinput"/>
                    <SearchIcon/> */}
          <h1>DashBoard</h1>
        </div>
        <div className="items">
          {/* <div className='item'>
                    <LanguageOutlinedIcon className='AdminNavicon'/>
                    English
                    </div> */}

          <div className="item">
            <LogoutIcon className="AdminNavicon" />
            <a className="Adminlogout" onClick={logoutHandler}>
              Logout
            </a>
          </div>
          {/* <div className="item">
            <img
              src="data:image/jpeg;base64,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"
              alt=""
              className="avatar"
            />
          </div> */}
          <ul className="navbar-nav ms-auto">
            {/* <li className="nav-item ">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Help/ContactUs
              </NavLink>
            </li> */}
            {/* {token && (
              <li className="nav-item">
                <FaRegUserCircle
                  size={30}
                  style={{
                    color: "white",
                    marginTop: "15%",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/profile")}
                />
              </li>
            )} */}
            {/* {admintoken && (
              <li className="nav-item">
                <FaRegUserCircle
                  size={30}
                  style={{
                    color: "black",
                    marginTop: "15%",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/adminprofile")}
                />
              </li>
            )} */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
