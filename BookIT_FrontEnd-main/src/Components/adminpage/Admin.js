import React, { useEffect, useRef, useState } from "react";
import "./Admin.css";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import Widget from "./Widget";
import Featured from "./Featured";
import Chart from "./Chart";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  let buses_count = useSelector((state) => state.busesCount);
  let users_count = useSelector((state) => state.usersCount);

  axios
    .get("https://bookit-backend-nvrc.onrender.com/admin/fetch_users_count")
    .then((res) => {
      dispatch({ type: "usersCount", payload: res.data.users_count });
    })
    .catch((err) => {
      console.log(err);
    });

  axios
    .get("https://bookit-backend-nvrc.onrender.com/admin/fetch_buses_count")
    .then((res) => {
      dispatch({ type: "busesCount", payload: res.data.buses_count });
    })
    .catch((err) => {
      console.log(err);
    });

  const verifyUser = (result) => {
    if (result.msg === "Unauthorized") {
      navigate("/");
    } else {
      setUser(result.user);
      //   setData(result.user.recentsearches);
    }
  };

  const getDetails = async () => {
    const token = window.localStorage.getItem("admintoken");

    await fetch("https://bookit-backend-nvrc.onrender.com/user/getadmin", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        verifyUser(result);
      });
  };
  useEffect(() => {
    getDetails();
  }, []);
  return (
    <>
      <div className="AdminHome">
        <AdminSidebar />
        <div className="SidebarHomecont">
          <AdminNavbar />
          <div className="widgets">
            <Widget type="user" count={users_count} />
            <Widget type="Bookings" />
            <Widget type="Busses" count={buses_count} />
          </div>

          <div className="charts">
            <Featured />
            <Chart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;