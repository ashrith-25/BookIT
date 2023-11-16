import React, { useState } from "react";
import { useParams } from "react-router-dom";

// import "./Busticket.css";
import Footer from "../Home/Footer";
import Header from "../Home/Header";
import TicketTemplate1 from "./TicketTemplate1";
import styles from "./Busticket.module.css";

// const [bus, setBus] = useState({})
// let [selected, setSelected] = useState([])
// let selected = [1, 2, 3];
// let bus = {
//   name: "Chennai travels",
//   source: "hyderabad",
//   destination: "chennai",
//   startdate: "19-03-23",
//   starttime: "00:00",
//   endtime: "6:00",
//   bustype: "Non-AC",
//   busclass: "seater",
//   traveltime: "6hr",
//   no_of_tickets_available: "150",
//   rating: "4.7",
//   ticket_cost: "350/-",
//   __v: 0,
// };
const Busticket = () => {
  const { source, destination, date } = useParams();
  let bus = JSON.parse(localStorage.getItem("Bus"));
  console.log(bus);
  let selected = localStorage.getItem("selected").split(",");

  console.log(selected);
  let p = selected.map((x) => {
    return {
      id: x,
      age: "",
      name: "",
      gender: "M",
    };
  });
  const [numb, setNumb] = useState(p);
  const [email, setEmail] = useState("");
  const [no, setNo] = useState("");

  const handlerName = (e, k) => {
    let newArr = [...numb];

    newArr[k].name = e.target.value;

    setNumb(newArr);
  };

  const handlerAge = (e, k) => {
    let newArr = [...numb];

    newArr[k].age = e.target.value;

    setNumb(newArr);
  };

  const handlerGender = (e, k) => {
    let newArr = [...numb];

    newArr[k].gender = e.target.value;

    setNumb(newArr);
  };
  const validateFeilds = () => {
    let flag = true;
    numb.forEach((x) => {
      if (x.name === "" || x.age === "") {
        flag = false;
      }
    });
    if (email === "" || no === "") {
      flag = false;
    }
    return flag;
  };
  const validateEmail = () => {
    let flag = true;
    if (!email.includes("@")) {
      flag = false;
    }
    return flag;
  };
  const validatePhoneNo = () => {
    let flag = true;
    if (no.length !== 10) {
      flag = false;
    }
    return flag;
  };
  let data = [email, no, numb];
  const submitHandler = () => {
    let flag = validateFeilds();
    if (!flag) {
      alert("Please fill all the feilds");
      return;
    }

    flag = validatePhoneNo();
    if (!flag) {
      alert("Please enter a valid phone number");
      return;
    }
    flag = validateEmail();
    if (!flag) {
      alert("Please enter a valid email");
      return;
    }
    console.log(data);
  };

  // return (
  //   <>
  //     <Header />
  //     <div className="row_sec">
  //       <div className="col_sec">
  //         <TicketTemplate bus={bus} />
  //       </div>
  //       <div className="fullform">
  //         <form>
  //           <div className="formup">
  //             <b>E-mail :</b>
  //             <input
  //               type="email"
  //               value={email}
  //               onChange={(e) => setEmail(e.target.value)}
  //               placeholder="Enter your email"
  //               className="inp"
  //             />
  //             &nbsp; &nbsp;
  //             <b>Phone Number :</b>
  //             <input
  //               type="number"
  //               value={no}
  //               onChange={(e) => setNo(e.target.value)}
  //               placeholder="Enter your phone number"
  //               className="inp"
  //             />
  //           </div>
  //           {p.map((x, k) => {
  //             return (
  //               <div className="forminside_pas" key={x}>
  //                 <input
  //                   type="text"
  //                   placeholder="Enter your name"
  //                   onChange={(e) => handlerName(e, k)}
  //                   className="inp"
  //                 />
  //                 &nbsp; &nbsp;
  //                 <input
  //                   type="text"
  //                   placeholder="Enter your age"
  //                   onChange={(e) => handlerAge(e, k)}
  //                   className="inp"
  //                 />
  //                 &nbsp; &nbsp;
  //                 <select onChange={(e) => handlerGender(e, k)} className="inp">
  //                   <option value="M">Male</option>
  //                   <option value="F">Female</option>
  //                 </select>
  //               </div>
  //             );
  //           })}

  //           <button
  //             onClick={(e) => {
  //               e.preventDefault();
  //               submitHandler();
  //             }}
  //             className="btn_fsub"
  //           >
  //             Submit
  //           </button>
  //         </form>
  //       </div>
  //     </div>
  //     <Footer />
  //   </>
  // );

  return (
    <>
      <Header />
      <div className={styles.row_sec}>
        <div className={styles.col_sec}>
          <TicketTemplate1
            bus={bus}
            p1={selected.length}
            source={source}
            destination={destination}
            date={date}
          />
          {/* <br />
          <br />

          <div>
            Bus Name: {bus.name}
            <br />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>From: {bus.source}</p>
              &nbsp; &nbsp; &nbsp;
              <p>To: {bus.destination}</p>
              <br />
            </div>
            Seats Selected:{bus.booked_seats}
            <br />
            Bus Price:{bus.ticket_cost}
          </div> */}
        </div>
        <div className={styles.fullform}>
          <form>
            <div className={styles.formup}>
              <b>E-mail :</b>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={styles.inp}
              />
              &nbsp; &nbsp;
              <b>Phone Number :</b>
              <input
                type="number"
                value={no}
                onChange={(e) => setNo(e.target.value)}
                placeholder="Enter your phone number"
                className={styles.inp}
              />
            </div>
            {p.map((x, k) => {
              return (
                <div className={styles.forminside_pas} key={x}>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    onChange={(e) => handlerName(e, k)}
                    className={styles.inp}
                  />
                  &nbsp; &nbsp;
                  <input
                    type="text"
                    placeholder="Enter your age"
                    onChange={(e) => handlerAge(e, k)}
                    className={styles.inp}
                  />
                  &nbsp; &nbsp;
                  <select
                    onChange={(e) => handlerGender(e, k)}
                    className={styles.inp}
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
              );
            })}

            {/* <button
              onClick={(e) => {
                e.preventDefault();
                submitHandler();
              }}
              className={styles.btn_fsub}
            >
              Submit
            </button> */}
          </form>
        </div>
      </div>
      {/* <Footer />   */}
    </>
  );
};

export default Busticket;
