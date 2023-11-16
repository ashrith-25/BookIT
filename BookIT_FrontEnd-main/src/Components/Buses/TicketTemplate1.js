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
import axios from "axios";
let prp = [];
let message = "";
const TicketTemplate1 = ({ bus, p1, source, destination, date }) => {
  const [submitted, setsubmitted] = useState(false);

  //   const submitHandler = () => {
  //     console.log(bus);
  //     let x = Number(bus.no_of_tickets_available);
  //     let y = x / 3;
  //     let seatL = [];
  //     for (var j = 65; j <= 65 + y; j++) {
  //       for (var i = 1; i <= 3; i++) {
  //         var item = String.fromCharCode(j) + i;
  //         seatL.push(item);
  //       }
  //     }
  //     console.log(seatL);
  //     let seatU = [];
  //     for (var k = 65; k <= 65 + y; k++) {
  //       for (var l = 4; l <= 6; l++) {
  //         var stno = String.fromCharCode(k) + l;
  //         seatU.push(stno);
  //       }
  //     }
  //     console.log(seatU);
  //     let seatAvailable = seatL.concat(seatU);
  //     let seats_booked = bus.booked_seats;
  //     seats_booked = ["A1", "A2"];
  //     seats_booked.forEach((x) => {
  //       seatAvailable = seatAvailable.filter((y) => y !== x);
  //     });
  //     console.log(seatAvailable);
  //     console.log(seats_booked);
  //     prp = [seatL, seatU, seatAvailable, seats_booked, bus];
  //     setsubmitted((prevValue) => !prevValue);
  //     // return <Seats myprop1 = {prp}></Seats>
  //   };
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

  const total = p1 * +bus.ticket_cost.slice(0, -2);
  console.log(selected);
  const myfunc = (total, num) => {
    return total + "," + num;
  };
  const SelectedString = selected.reduce(myfunc);
  console.log(SelectedString);

  const initPayment = async (data) => {
    const options = {
      key: "rzp_test_t3WlBN6jKEVvae",
      amount: data.amount,
      currency: data.currency,
      name: bus.name,
      description: "Test Transaction",
      //   image: book.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "https://bookit-backend-nvrc.onrender.com/api/payment/verify";
          const data = await axios.post(verifyUrl, response);
          console.log("------------------------------------------");
          message = data.data.message;
          console.log(message);
          console.log(data);
          if (message === "Payment verified successfully") {
            console.log("i am inside if");
            console.log(selected);
            axios
              .post("https://bookit-backend-nvrc.onrender.com/api/payment/confirm", {
                selectedSeats: selected,
                busid: bus._id,
              })
              .then((res) => {
                console.log(res.data.msg);
              });
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    console.log("i am outside");

    const rzp1 = new window.Razorpay(options);
    await rzp1.open();
    console.log(message);
    // if (message === "Payment verified successfully") {
    //   console.log('i am inside if')
    //   console.log(selected)
    //     axios
    //     .post("https://bookit-backend-nvrc.onrender.com/api/payment/confirm", {
    //       selectedSeats: { selected },
    //       busid: bus._id,
    //     })
    //     .then((res) => {
    //       window.prompt(res.msg);
    //     });
    // }
    // console.log(rzp1.open());
  };

  const handlepayment = async () => {
    try {
      const orderUrl = "https://bookit-backend-nvrc.onrender.com/api/payment/orders";
      console.log("ticket Template" + source, destination, date);
      const { data } = await axios.post(orderUrl, {
        amount: total,
        source: source,
        destination: destination,
        date: date,
      });

      console.log(data);
      //   console.log(data);
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={styles.busBox}
      style={{ width: "105%", marginRight: "200px", marginTop: "40px" }}
    >
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
        {/* <div className={styles.busBoxSection15}>
          <div>
            <StarsIcon />
            <div>{bus.rating}</div>
          </div>
          <div>
            <div>512</div>
          </div>
        </div> */}
        <div className={styles.busBoxSection16}>
          <div>
            <div>INR</div>
            <div>{bus.ticket_cost}</div>
          </div>
          {/* <div>
            <LocalOfferIcon />
            <div>Deal applied</div>
          </div> */}
        </div>
        {/* <div className={styles.busBoxSection17}>
          <div></div>
          <div>
            <div>{bus.no_of_tickets_available}</div>
            <div>Seats Available</div>
          </div>
          <div>
            <div>20</div>
            <div>Window</div>
          </div>
        </div> */}
      </div>
      <div className={styles.busBoxSection2}>
        Cost: {total}
        <br />
        SeatsSelected:{SelectedString}
      </div>
      <div className={styles.busBoxSection3}>
        <button
          className="loginbtn"
          style={{
            borderRadius: "20px",
            border: "1px solid #0173AE",
            backgroundColor: "#0173AE",
            color: "#FFFFFF",
            fontSize: "8px",
            padding: "10px 20px",
            letterSpacing: "1px",
            transition: "transform 80ms ease-in",
          }}
          onClick={(e) => {
            e.preventDefault();
            // submitHandler();
            handlepayment();
          }}
        >
          Book
        </button>
      </div>
      {submitted ? (
        bus.busclass === "Sleeper" ? (
          <Seats myprop1={prp}></Seats>
        ) : bus.busclass === "Seater" ? (
          <SeatsSeat myprop1={prp}></SeatsSeat>
        ) : (
          <SeatsSeatSl myprop1={prp}></SeatsSeatSl>
        )
      ) : null}
    </div>
  );
};

export default TicketTemplate1;
