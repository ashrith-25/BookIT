import React, { useEffect } from "react";
import styles from "./Right.module.css";
import TicketTemplate from "./TicketTemplate";
import SortingBar from "./SortingBar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import No_Buses from "../Images/No_Buses.png";

const Right = () => {
  const { source, destination, date } = useParams();
  const dispatch = useDispatch();
  const filteredbuses = useSelector((state) => state.filteredbuses);
  const originalbuses = useSelector((state) => state.originalbuses);
  const filters = useSelector((state) => state.filters);

  const searchbuses = () => {
    fetch("https://bookit-backend-nvrc.onrender.com/buses/search", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        source,
        destination,
        date,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.msg);
        dispatch({ type: "originalbuses", payload: result.msg });
      });
  };

  useEffect(() => {
    searchbuses();
  }, []);

  return (
    <div className={styles.example}>
      <div className={styles.Right}>
        <SortingBar />

        {filteredbuses.length === 0 && filters.length === 0 ? (
          originalbuses === "No buses found" ? (
            <div style={{ marginLeft: "33%", marginTop: "15%" }}>
              <img
                src={No_Buses}
                alt="no buses"
                style={{ borderRadius: "10px", marginBottom: "2%" }}
              />
              <h3 style={{ color: "#0173ae", marginLeft: "11%" }}>
                No Buses Found
              </h3>
            </div>
          ) : (
            originalbuses.map((bus) => (
              <TicketTemplate
                bus={bus}
                source={source}
                destination={destination}
                date={date}
                key={bus._id}
              />
            ))
          )
        ) : filters.length !== 0 && filteredbuses.length === 0 ? (
          <div style={{ marginLeft: "33%", marginTop: "15%" }}>
            <img
              src={No_Buses}
              alt="no buses"
              height="200px"
              width="400px"
              style={{ borderRadius: "10px", marginBottom: "2%" }}
            />
            <h2 style={{ color: "#0173ae", marginLeft: "11%" }}>
              No Buses Found
            </h2>
          </div>
        ) : (
          filteredbuses.map((bus) => (
            <TicketTemplate
              bus={bus}
              source={source}
              destination={destination}
              date={date}
              key={bus._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Right;
