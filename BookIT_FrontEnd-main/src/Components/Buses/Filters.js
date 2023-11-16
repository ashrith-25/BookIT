// import React, { useEffect, useState } from "react";
// import styles from "./Filters.module.css";
// import AvTimerIcon from '@mui/icons-material/AvTimer';
// import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
// import AirlineSeatLegroomExtraIcon from '@mui/icons-material/AirlineSeatLegroomExtra';
// import AirlineSeatIndividualSuiteIcon from '@mui/icons-material/AirlineSeatIndividualSuite';
// import WeekendIcon from '@mui/icons-material/Weekend';
// import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
// import { useDispatch, useSelector } from "react-redux";

// let filters = []

// const Filters = () => {

//   const filteredBuses = []
//   let uniquebuses = []
//   const dispatch = useDispatch()

//   const [flag, setFlag] = useState(0)
//   const originalbuses = useSelector(state => state.originalbuses)

//   const checkFilters = (e) => {
//     if (e.target.checked) {
//       filters.push(e.target.labels[0].innerText.toLowerCase())
//       dispatch({ type: "filters", payload: filters })
//       setFlag(prev => prev + 1)
//     }
//     else {
//       let arr = [...filters]
//       let index = arr.indexOf(e.target.labels[0].innerText.toLowerCase())
//       if (index !== -1) {
//         arr.splice(index, 1);
//         filters = [...arr]
//         dispatch({ type: "filters", payload: filters })
//         setFlag(prev => prev - 1)
//       }
//     }
//   }

//   const filterBuses = () => {

//     if (originalbuses !== 'No buses found') {

//       originalbuses.forEach(bus => {
//         if (filters.includes(bus.bustype.toLowerCase()) || filters.includes(bus.busclass.toLowerCase())) {
//           filteredBuses.push(bus)
//           uniquebuses = filteredBuses.filter((item, index) => filteredBuses.indexOf(item) === index);
//         }

//         let ticket_cost = bus.ticket_cost.slice(0, bus.ticket_cost.indexOf('/'))
//         if ((filters.includes('<=500') && +ticket_cost <= 500) ||
//           (filters.includes('500-1000') && (+ticket_cost > 500 && +ticket_cost < 1000)) ||
//           (filters.includes('>=1000') && +ticket_cost >= 1000)) {
//           filteredBuses.push(bus)
//           uniquebuses = filteredBuses.filter((item, index) => filteredBuses.indexOf(item) === index);
//         }
//       });

//     }

//     dispatch({ type: "filteredbuses", payload: uniquebuses })
//   }

//   useEffect(() => {
//     filterBuses()
//   }, [flag])

//   return (
//     <>
//       <div className={styles.Left}>
//         <div className={styles.Left_filters}>
//           <p>PRICE</p>
//           <ul>
//             <li
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 height: "30px",
//               }}
//             >
//               <input
//                 type="checkbox"
//                 name="<500"
//                 id="<500"
//                 onClick={checkFilters}
//               />
//               &nbsp;&nbsp;

//               &nbsp;&nbsp;
//               <label htmlFor="<500">{"<="}500</label>
//             </li>
//             <li
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 height: "30px",
//               }}
//             >
//               <input
//                 type="checkbox"
//                 name="500-1000"
//                 id=">500<1000"
//                 onClick={checkFilters}
//               />
//               &nbsp;&nbsp;

//               &nbsp;&nbsp;
//               <label htmlFor=">500<1000">500-1000</label>
//             </li>
//             <li
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 height: "30px",
//               }}
//             >
//               <input
//                 type="checkbox"
//                 name="1000-2000"
//                 id=">1000"
//                 onClick={checkFilters}
//               />
//               &nbsp;&nbsp;

//               &nbsp;&nbsp;
//               <label htmlFor=">1000">{">="}1000</label>
//             </li>
//           </ul>
//         </div>
//         <div className={styles.Left_filters}>
//           <p>DEPARTURE TIME</p>
//           <ul>
//             <li
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 height: "30px",
//               }}
//             >
//               <input
//                 type="checkbox"
//                 name="before6am"
//               />
//               &nbsp;&nbsp;
//               <AvTimerIcon />
//               &nbsp;&nbsp;
//               <p>Before 6 am </p>
//             </li>
//             <li
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 height: "30px",
//               }}
//             >
//               <input
//                 type="checkbox"
//                 name="6amto12pm"
//               />
//               &nbsp;&nbsp;
//               <AvTimerIcon />
//               &nbsp;&nbsp;
//               <p>6 am to 12 pm </p>
//             </li>
//             <li
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 height: "30px",
//               }}
//             >
//               <input
//                 type="checkbox"
//                 name="12pmto6pm"
//               />
//               &nbsp;&nbsp;
//               <AccessAlarmIcon />
//               &nbsp;&nbsp;
//               <p>12pm to 6 pm </p>
//             </li>
//             <li
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 height: "10px",
//               }}
//             >
//               <input
//                 type="checkbox"
//                 name="after6pm"
//               />
//               &nbsp;&nbsp;
//               <AccessAlarmIcon />
//               &nbsp;&nbsp;
//               <p>After 6 pm </p>
//             </li>
//           </ul>
//         </div>

//         <div className={styles.Left_filters}>
//           <p>BUS TYPES</p>
//           <ul>
//             <li
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 height: "10px",
//               }}
//             >
//               <input
//                 type="checkbox"
//                 name="seater"
//                 id="seater"
//                 onClick={checkFilters}
//               />
//               &nbsp;&nbsp;
//               <AirlineSeatLegroomExtraIcon />
//               &nbsp;&nbsp;
//               <label htmlFor="seater">SEATER</label>
//             </li>
//             <li
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 height: "10px",
//               }}
//             >
//               <input
//                 type="checkbox"
//                 name="sleeper"
//                 id="sleeper"
//                 onClick={checkFilters}
//               />
//               &nbsp;&nbsp;
//               <AirlineSeatIndividualSuiteIcon />
//               &nbsp;&nbsp;
//               <label htmlFor="sleeper">SLEEPER</label>
//             </li>
//             <li
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 height: "10px",
//               }}
//             >
//               <input
//                 type="checkbox"
//                 name="ac"
//                 id="ac"
//                 onClick={checkFilters}
//               />
//               &nbsp;&nbsp;
//               <WeekendIcon />
//               &nbsp;&nbsp;
//               <label htmlFor="ac">AC</label>
//             </li>
//             <li
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 height: "10px",
//               }}
//             >
//               <input
//                 type="checkbox"
//                 name="nonac"
//                 id="non-ac"
//                 onClick={checkFilters}
//               />
//               &nbsp;&nbsp;
//               <DirectionsBusIcon />
//               &nbsp;&nbsp;
//               <label htmlFor="non-ac">NON-AC</label>
//             </li>
//           </ul>
//         </div>
//         <div className={styles.Left_filters}>
//           <p>ARRIVAL TIME</p>
//           <ul>
//             <li
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 height: "30px",
//               }}
//             >
//               <input
//                 type="checkbox"
//                 name="before6am"
//               />
//               &nbsp;&nbsp;
//               <AvTimerIcon />
//               &nbsp;&nbsp;
//               <p>Before 6 am</p>
//             </li>
//             <li
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 height: "30px",
//               }}
//             >
//               <input
//                 type="checkbox"
//                 name="6amto12pm"

//               />
//               &nbsp;&nbsp;
//               <AvTimerIcon />
//               &nbsp;&nbsp;
//               <p>6 am to 12 pm</p>
//             </li>
//             <li
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 height: "30px",
//               }}
//             >
//               <input
//                 type="checkbox"
//                 name="12pmto6pm"
//               />
//               &nbsp;&nbsp;
//               <AccessAlarmIcon />
//               &nbsp;&nbsp;
//               <p>12pm to 6 pm </p>
//             </li>
//             <li
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-start",
//                 alignItems: "center",
//                 height: "30px",
//               }}
//             >
//               <input
//                 type="checkbox"
//                 name="after6pm"
//               />
//               &nbsp;&nbsp;
//               <AccessAlarmIcon />
//               &nbsp;&nbsp;
//               <p>After 6 pm</p>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Filters;

import React, { useEffect, useState } from "react";
import styles from "./Filters.module.css";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AirlineSeatLegroomExtraIcon from "@mui/icons-material/AirlineSeatLegroomExtra";
import AirlineSeatIndividualSuiteIcon from "@mui/icons-material/AirlineSeatIndividualSuite";
import WeekendIcon from "@mui/icons-material/Weekend";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { useDispatch, useSelector } from "react-redux";

let filters = [];

const Filters = () => {
  const filteredBuses = [];
  let uniquebuses = [];
  const dispatch = useDispatch();

  const [flag, setFlag] = useState(0);
  const originalbuses = useSelector((state) => state.originalbuses);

  // console.log(
  //   typeof e.target.name +
  //     " " +
  //     typeof e.target.labels[0].innerText.toLowerCase()
  // );
  // filters.push(e.target.labels[0].innerText.toLowerCase());
  // let index = arr.indexOf(e.target.labels[0].innerText.toLowerCase());
  const checkFilters = (e) => {
    if (e.target.checked) {
      filters.push(e.target.name);

      dispatch({ type: "filters", payload: filters });
      setFlag((prev) => prev + 1);
    } else {
      let arr = [...filters];
      let index = arr.indexOf(e.target.name);

      if (index !== -1) {
        arr.splice(index, 1);
        filters = [...arr];
        dispatch({ type: "filters", payload: filters });
        setFlag((prev) => prev - 1);
      }
    }
    // console.log(filters);
  };

  const filterBuses = () => {
    if (originalbuses !== "No buses found") {
      originalbuses.forEach((bus) => {
        // console.log(bus);
        if (
          filters.includes(bus.bustype.toLowerCase()) ||
          filters.includes(bus.busclass.toLowerCase())
        ) {
          filteredBuses.push(bus);
          uniquebuses = filteredBuses.filter(
            (item, index) => filteredBuses.indexOf(item) === index
          );
        }

        let ticket_cost = bus.ticket_cost.slice(
          0,
          bus.ticket_cost.indexOf("/")
        );
        if (
          (filters.includes("<=500") && +ticket_cost <= 500) ||
          (filters.includes("500-1000") &&
            +ticket_cost > 500 &&
            +ticket_cost < 1000) ||
          (filters.includes(">=1000") && +ticket_cost >= 1000)
        ) {
          filteredBuses.push(bus);
          uniquebuses = filteredBuses.filter(
            (item, index) => filteredBuses.indexOf(item) === index
          );
        }

        let depttime = bus.endtime;
        // console.log(depttime);
        let endtimeslice = bus.endtime.slice(0, bus.endtime.indexOf(":"));

        if (
          (filters.includes("0-6") && +endtimeslice < 6) ||
          (filters.includes("6-12") &&
            +endtimeslice >= 6 &&
            +endtimeslice < 12) ||
          (filters.includes("12-18") &&
            +endtimeslice >= 12 &&
            +endtimeslice < 18) ||
          (filters.includes("18-24") &&
            +endtimeslice >= 18 &&
            +endtimeslice < 24)
        ) {
          filteredBuses.push(bus);
          uniquebuses = filteredBuses.filter(
            (item, index) => filteredBuses.indexOf(item) === index
          );
        }

        let starttime = bus.starttime;
        let starttimeslice = bus.starttime.slice(0, bus.starttime.indexOf(":"));
        // console.log(starttimeslice);

        if (
          (filters.includes("0to6") && +starttimeslice < 6) ||
          (filters.includes("6to12") &&
            +starttimeslice >= 6 &&
            +starttimeslice < 12) ||
          (filters.includes("12to18") &&
            +starttimeslice >= 12 &&
            +starttimeslice < 18) ||
          (filters.includes("18to24") &&
            +starttimeslice >= 18 &&
            +starttimeslice < 24)
        ) {
          filteredBuses.push(bus);
          uniquebuses = filteredBuses.filter(
            (item, index) => filteredBuses.indexOf(item) === index
          );
        }
      });
    }

    dispatch({ type: "filteredbuses", payload: uniquebuses });
  };

  useEffect(() => {
    filterBuses();
  }, [flag]);

  return (
    <>
      <div className={styles.Left}>
        <div className={styles.Left_filters}>
          <p>PRICE</p>
          <ul>
            <li
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "30px",
              }}
            >
              <input
                type="checkbox"
                name="<=500"
                id="<500"
                onClick={checkFilters}
              />
              &nbsp;&nbsp; &nbsp;&nbsp;
              <label htmlFor="<500">{"<="}500</label>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "30px",
              }}
            >
              <input
                type="checkbox"
                name="500-1000"
                id=">500<1000"
                onClick={checkFilters}
              />
              &nbsp;&nbsp; &nbsp;&nbsp;
              <label htmlFor=">500<1000">500-1000</label>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "30px",
              }}
            >
              <input
                type="checkbox"
                name=">=1000"
                id=">1000"
                onClick={checkFilters}
              />
              &nbsp;&nbsp; &nbsp;&nbsp;
              <label htmlFor=">1000">{">="}1000</label>
            </li>
          </ul>
        </div>
        <div className={styles.Left_filters}>
          <p>DEPARTURE TIME</p>
          <ul>
            <li
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "30px",
              }}
            >
              <input type="checkbox" name="0-6" onClick={checkFilters} />
              &nbsp;&nbsp;
              <AvTimerIcon />
              &nbsp;&nbsp;
              <p>Before 6 am </p>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "30px",
              }}
            >
              <input type="checkbox" name="6-12" onClick={checkFilters} />
              &nbsp;&nbsp;
              <AvTimerIcon />
              &nbsp;&nbsp;
              <p>6 am to 12 pm </p>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "30px",
              }}
            >
              <input type="checkbox" name="12-18" onClick={checkFilters} />
              &nbsp;&nbsp;
              <AccessAlarmIcon />
              &nbsp;&nbsp;
              <p>12pm to 6 pm </p>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "10px",
              }}
            >
              <input type="checkbox" name="18-24" onClick={checkFilters} />
              &nbsp;&nbsp;
              <AccessAlarmIcon />
              &nbsp;&nbsp;
              <p>After 6 pm </p>
            </li>
          </ul>
        </div>

        <div className={styles.Left_filters}>
          <p>BUS TYPES</p>
          <ul>
            <li
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "10px",
              }}
            >
              <input
                type="checkbox"
                name="seater"
                id="seater"
                onClick={checkFilters}
              />
              &nbsp;&nbsp;
              <AirlineSeatLegroomExtraIcon />
              &nbsp;&nbsp;
              <label htmlFor="seater">SEATER</label>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "10px",
              }}
            >
              <input
                type="checkbox"
                name="sleeper"
                id="sleeper"
                onClick={checkFilters}
              />
              &nbsp;&nbsp;
              <AirlineSeatIndividualSuiteIcon />
              &nbsp;&nbsp;
              <label htmlFor="sleeper">SLEEPER</label>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "10px",
              }}
            >
              <input type="checkbox" name="ac" id="ac" onClick={checkFilters} />
              &nbsp;&nbsp;
              <WeekendIcon />
              &nbsp;&nbsp;
              <label htmlFor="ac">AC</label>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "10px",
              }}
            >
              <input
                type="checkbox"
                name="non-ac"
                id="non-ac"
                onClick={checkFilters}
              />
              &nbsp;&nbsp;
              <DirectionsBusIcon />
              &nbsp;&nbsp;
              <label htmlFor="non-ac">NON-AC</label>
            </li>
          </ul>
        </div>
        <div className={styles.Left_filters}>
          <p>ARRIVAL TIME</p>
          <ul>
            <li
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "30px",
              }}
            >
              <input type="checkbox" name="0to6" onClick={checkFilters} />
              &nbsp;&nbsp;
              <AvTimerIcon />
              &nbsp;&nbsp;
              <p>Before 6 am</p>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "30px",
              }}
            >
              <input type="checkbox" name="6to12" onClick={checkFilters} />
              &nbsp;&nbsp;
              <AvTimerIcon />
              &nbsp;&nbsp;
              <p>6 am to 12 pm</p>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "30px",
              }}
            >
              <input type="checkbox" name="12to18" onClick={checkFilters} />
              &nbsp;&nbsp;
              <AccessAlarmIcon />
              &nbsp;&nbsp;
              <p>12pm to 6 pm </p>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "30px",
              }}
            >
              <input type="checkbox" name="18to24" onClick={checkFilters} />
              &nbsp;&nbsp;
              <AccessAlarmIcon />
              &nbsp;&nbsp;
              <p>After 6 pm</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Filters;
