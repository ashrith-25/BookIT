import React from "react";
import "./widget.css";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";
import { NavLink } from "react-bootstrap";

const Widget = ({ type, count }) => {
  let data;

  const percent = 40;
  switch (type) {
    case "user":
      data = {
        widgetTitle: "USERS",
        isMoney: false,
        widgetLink: "See all users",
        link: "/userlist",
        widgeticon: (
          <PersonOutlinedIcon
            className="widgeticon"
            style={{
              fontSize: "35px",
              color: "crimson",
              backgroundColor: "rgba(255,0,0,0.2)",
            }}
          />
        ),
      };
      break;
    case "Bookings":
      data = {
        widgetTitle: "Bookings",
        isMoney: false,
        widgetLink: "See all Bookings",
        link: "/bookinglist",
        widgeticon: (
          <ConfirmationNumberIcon
            className="widgeticon"
            style={{
              fontSize: "35px",
              color: "green",
              backgroundColor: "rgba(0,128,0,0.2)",
            }}
          />
        ),
      };
      break;
    case "Busses":
      data = {
        widgetTitle: "BUSSES",
        isMoney: false,
        widgetLink: "See all Busses",
        link: "/busseslist",
        widgeticon: (
          <DirectionsBusFilledOutlinedIcon
            className="widgeticon"
            style={{
              fontSize: "35px",
              color: "purple",
              backgroundColor: "rgba(128,0,128,0.2)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="widgetTitle">{data.widgetTitle}</span>
        <span className="widgetCounter">{count}</span>
        <span className="widgetLink">
          <NavLink
            to={data.link}
            href={data.link}
            className="widgetLinkactive"
            style={{ "font-size": "0.8rem" }}
          >
            {data.widgetLink}
          </NavLink>
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <TrendingUpOutlinedIcon className="percenticon" />
          {percent} %
        </div>
        {data.widgeticon}
      </div>
    </div>
  );
};
export default Widget;
