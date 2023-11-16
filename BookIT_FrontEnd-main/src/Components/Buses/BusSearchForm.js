import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BusSearchForm.module.css";
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

let user = {}

const BusSearchForm = () => {

  const navigate = useNavigate()

  const [travelDetails, setTravelDetails] = useState({
    source: '',
    destination: '',
    date: ''
  })

  const inputHandler = (e) => {
    setTravelDetails({ ...travelDetails, [e.target.name]: e.target.value })
  }

  const verifyUser = (result) => {
    if (result.msg === "Unauthorized") {
      navigate("/");
    } else {
      user = result.user
    }
  }

  const getTheUser = async () => {

    const token = window.localStorage.getItem("token")

    await fetch("https://bookit-backend-nvrc.onrender.com/user/getuser", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        // verifyUser(result)
        user = result.user
      })
  }

  const submitHandler = async () => {

    if (travelDetails.source === '' || travelDetails.destination === '' || travelDetails.date === '') {
      toast.error("Fill the details completely", {
        position: 'top-center',
        style: {
          backgroundColor: 'red',
          color: 'white'
        }
      })

      return
    }

    if (user) {
      axios.post('https://bookit-backend-nvrc.onrender.com/user/insertrecentsearches', { user, travelDetails })
        .then(res => {
          console.log(res.data)
        })
    }

    navigate(`/displaybuses/${travelDetails.source}/${travelDetails.destination}/${travelDetails.date}`)
  }

  useEffect(() => {
    getTheUser()
  }, [])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.header}>
            <h2 className={`{styles.animation} ${styles.a1}`} style={{ color: 'rgb(1, 115, 174)' }}>
              Welcome to <b>bOOK iT!!</b>
            </h2>
            <h4 className={`${styles.animation} ${styles.a2}`}>
              <b>Book Here! For Cheap and Best Tickets</b>
            </h4>
          </div>
          <div className={styles.form}>
            <input
              type="text"
              className={`${styles.form_field} ${styles.animation} ${styles.a3}`}
              name='source'
              placeholder="Source"
              onChange={inputHandler}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <input
                type="date"
                className={`${styles.form_field} ${styles.animation} ${styles.a4}`}
                name='date'
                placeholder="Password"
                onChange={inputHandler}
              />
              <i className="fa fa-light fa-arrow-up-arrow-down"></i>
            </div>
            <input
              type="text"
              className={`${styles.form_field} ${styles.animation} ${styles.a4}`}
              name='destination'
              placeholder="Destination"
              onChange={inputHandler}
            />

            <button className={`${styles.animation} ${styles.a6}`} onClick={submitHandler}>
              Search
            </button>
          </div>
        </div>
        <div className={styles.right}></div>
      </div>

      <Toaster />
    </>
  );
}

export default BusSearchForm;
