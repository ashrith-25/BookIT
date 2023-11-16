import React, { useState } from "react";
import styles from "./TicketTemplate.module.css";
import Tooltip from "@mui/material/Tooltip";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import StarsIcon from "@mui/icons-material/Stars";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PowerIcon from "@mui/icons-material/Power";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import WbIncandescentIcon from "@mui/icons-material/WbIncandescent";
import Seats from "../Seats/seats";
import SeatsSeat from "../Seats/Seats_seater";
import SeatsSeatSl from "../Seats/Seats_stsl";
let prp = [];
const TicketTemplate = ({ bus, source, destination, date }) => {
  const [submitted, setsubmitted] = useState(false);
  const submitHandler = () => {
    console.log(bus);
    let x = Number(bus.no_of_tickets_available);
    let y = x / 3;
    let seatL = [];
    for (var j = 65; j <= 65 + y; j++) {
      for (var i = 1; i <= 3; i++) {
        var item = String.fromCharCode(j) + i;
        seatL.push(item);
      }
    }
    console.log(seatL);
    let seatU = [];
    for (var k = 65; k <= 65 + y; k++) {
      for (var l = 4; l <= 6; l++) {
        var stno = String.fromCharCode(k) + l;
        seatU.push(stno);
      }
    }
    console.log(seatU);
    let seatAvailable = seatL.concat(seatU);
    let seats_booked = bus.booked_seats;
    // seats_booked = ["A1", "A2"];
    seats_booked.forEach((x) => {
      seatAvailable = seatAvailable.filter((y) => y !== x);
    });
    console.log(seatAvailable);
    console.log(seats_booked);
    prp = [seatL, seatU, seatAvailable, seats_booked, bus];
    setsubmitted((prevValue) => !prevValue);
    // return <Seats myprop1 = {prp}></Seats>
  };

  return (
    <div className={styles.busBox}>
      <div className={styles.busBoxSection1}>
        <div className={styles.busBoxSection11}>
          <div>{bus.name}</div>
          <div>{bus.bustype + " " + bus.busclass}</div>
        </div>
        <div className={styles.busBoxSection12}>
          <div>{bus.starttime}</div>
          <div>{bus.source}</div>
        </div>
        <div className={styles.busBoxSection13}>
          <div>{bus.traveltime}</div>
        </div>
        <div className={styles.busBoxSection14}>
          <div>{bus.endtime}</div>
          <div>{bus.destination}</div>
        </div>
        <div className={styles.busBoxSection15}>
          <div>
            <StarsIcon />
            <div>{bus.rating}</div>
          </div>
          <div>
            <div>512</div>
          </div>
        </div>
        <div className={styles.busBoxSection16}>
          <div>
            <div>INR</div>
            <div>{bus.ticket_cost}</div>
          </div>
          <div>
            <LocalOfferIcon />
            <div>Deal applied</div>
          </div>
        </div>
        <div className={styles.busBoxSection17}>
          <div></div>
          <div>
            <div>{bus.no_of_tickets_available}</div>
            <div>Seats Available</div>
          </div>
          <div>
            <div>20</div>
            <div>Window</div>
          </div>
        </div>
      </div>
      <div className={styles.busBoxSection2}>
        <div className={styles.busBoxSection21}>
          <Tooltip title="Charging Point" arrow>
            <PowerIcon
              style={{
                fontWeight: "50",
                fontSize: "20px",
                marginRight: "9px",
                color: "grey",
              }}
            />
          </Tooltip>
          <Tooltip title="Movie" arrow>
            <MovieFilterIcon
              style={{
                fontWeight: "50",
                fontSize: "20px",
                marginRight: "9px",
                color: "grey",
              }}
            />
          </Tooltip>
          <Tooltip title="Reading Light" arrow>
            <WbIncandescentIcon
              style={{
                fontWeight: "50",
                fontSize: "20px",
                marginRight: "9px",
                color: "grey",
              }}
            />
          </Tooltip>
          <Tooltip title="Track My Bus" arrow>
            <DirectionsBusIcon
              style={{
                fontWeight: "50",
                fontSize: "20px",
                marginRight: "9px",
                color: "grey",
              }}
            />
          </Tooltip>
        </div>
      </div>
      <div className={styles.busBoxSection3}>
        <button className={styles.viewseats} onClick={submitHandler}>
          ViewSeats
        </button>
      </div>
      {submitted ? (
        bus.busclass === "Sleeper" ? (
          <Seats
            myprop1={prp}
            source={source}
            destination={destination}
            date={date}
          ></Seats>
        ) : bus.busclass === "Seater" ? (
          <SeatsSeat
            myprop1={prp}
            source={source}
            destination={destination}
            date={date}
          ></SeatsSeat>
        ) : (
          <SeatsSeatSl
            myprop1={prp}
            source={source}
            destination={destination}
            date={date}
          ></SeatsSeatSl>
        )
      ) : null}
    </div>
  );
};

export default TicketTemplate;
