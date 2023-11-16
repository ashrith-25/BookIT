import React, { useEffect, useState, useRef } from "react"
import styles from "./VerifyUser.module.css"
import toast, { Toaster } from "react-hot-toast"
import BusLoader from "../Images/Loading_Bus.gif"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

let final_user = {}

const VerifyUser = () => {

    const codesRef = useRef([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.userdetails)
    const [minutes, setMinutes] = useState(1)
    const [seconds, setSeconds] = useState(30)

    const validateUser = (result) => {
        if (result.msg === "Profile Creation SuccessFul") {
          toast.success(result.msg, {
            position: "top-center",
            style: {
              backgroundColor: "green",
              color: "white",
            },
          });
    
          setLoading(true);
    
          setTimeout(() => {
            setLoading(false);
            dispatch({ type: "id", id: user.id });
            navigate("/login");
          }, 2500)

        } else if (result.msg === "OTP is not valid") {
          toast.error(result.msg, {
            position: "top-center",
            style: {
              backgroundColor: "red",
              color: "white",
            },
          });
        }
      };

      const validateOTP = (result) => {

        if (result.msg === 'OTP sent to your email') {
            toast.success(result.msg, {
                position: 'top-center',
                style: {
                    backgroundColor: 'green',
                    color: 'white',
                }
            })
        }
    
        else {
          toast.error(result.msg, {
            position: "top-center",
            style: {
              backgroundColor: "red",
              color: "white",
            },
          })
        }
      }

    const verifyOTP = async () => {
        const codes = codesRef.current
        let OTP = ""
        codes.forEach(code => {
            OTP += code.value
        })

        final_user = {...user, profileimage: '/Images/Default_Profile_Image.png'}

        await fetch("https://bookit-backend-nvrc.onrender.com/user/signup", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ OTP, final_user })
        })
        .then((response) => response.json())
        .then((result) => {
            validateUser(result)
        })
    }

    const resendOTP = async () => {
        
        await fetch('https://bookit-backend-nvrc.onrender.com/user/sendOTP',{
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(user)
        })
        .then((response) => response.json())
        .then((result) => {
            validateOTP(result)
        })

        setMinutes(1)
        setSeconds(30)
    }

    useEffect(() => {
        
        const codes = codesRef.current

        codes[0].focus()
            codes.forEach((code, idx) => {
                code.addEventListener("keydown", (e) => {
                    if (e.key >= 0 && e.key <= 9) {
                        codes[idx].value = "";
                        setTimeout(() => codes[idx + 1].focus(), 10)
                    } else if (e.key === "Backspace") {
                        setTimeout(() => codes[idx - 1].focus(), 10)
                    }
                })
            })
    }, [])


    useEffect(() => {
        const interval = setInterval(() => {
          if (seconds > 0) {
            setSeconds(seconds - 1)
          }
      
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(interval)
            } else {
              setSeconds(59);
              setMinutes(minutes - 1)
            }
          }
        }, 1000)
      
        return () => {
          clearInterval(interval)
        }
      }, [seconds, minutes])

    return (
        <>
        <div className={loading ? `${styles.verifypage}` : ""}>
            <div className={styles.container}>
                <h2>Verify Your Account</h2>
                <p>
                    We Emailed you the six digit code to your email <br />
                    Enter the code below to confirm your email address
                </p>

                <div className={styles["code-container"]}>

                    <input
                        type="number"
                        className={styles.code}
                        ref={(el) => (codesRef.current[0] = el)}
                        placeholder="0"
                        min="0"
                        max="9"
                        required
                    />
                    <input
                        type="number"
                        className={styles.code}
                        ref={(el) => (codesRef.current[1] = el)}
                        placeholder="0"
                        min="0"
                        max="9"
                        required
                    />
                    <input
                        type="number"
                        className={styles.code}
                        ref={(el) => (codesRef.current[2] = el)}
                        placeholder="0"
                        min="0"
                        max="9"
                        required
                    />
                    <input
                        type="number"
                        className={styles.code}
                        ref={(el) => (codesRef.current[3] = el)}
                        placeholder="0"
                        min="0"
                        max="9"
                        required
                    />
                    <input
                        type="number"
                        className={styles.code}
                        ref={(el) => (codesRef.current[4] = el)}
                        placeholder="0"
                        min="0"
                        max="9"
                        required
                    />
                    <input
                        type="number"
                        className={styles.code}
                        ref={(el) => (codesRef.current[5] = el)}
                        placeholder="0"
                        min="0"
                        max="9"
                        required
                    />
                </div>
                <div>
                    <button
                        type="button"
                        className={`${styles.btn} ${styles["btn-primary"]}`}
                        onClick={verifyOTP}
                        disabled={seconds > 0 || minutes > 0 ? false : true}
                    >
                        Verify
                    </button>
                </div>

                <div className="container row" style={{marginLeft: '25%'}}>
                    <div className="col-md-4 countdown-text" style={{display: 'flex', }}>
                        {seconds > 0 || minutes > 0 ? (
                            <p>
                                Time Remaining: <b>{minutes < 10 ? `0${minutes}` : minutes}:
                                {seconds < 10 ? `0${seconds}` : seconds}</b>
                            </p>
                        ) : (
                            <p>Didn't recieve code?</p>
                        )}
                    </div>
                    <div className="col-md-2">
                        <button
                            disabled={seconds > 0 || minutes > 0}
                            style={{
                            color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
                            border: "none",
                            backgroundColor: 'white',
                            marginTop:'5%'
                            }}
                            onClick={resendOTP}
                        >
                            Resend OTP
                        </button>
                    </div>
                </div>
            </div>
        </div>

                <div className="loadingmaindiv">
                    {loading && (
                    <div className={styles.loadingdiv}>
                        <img src={BusLoader} alt="loader" />
                    </div>
                    )}
                </div>
            <Toaster/>
        </>
    );
};

export default VerifyUser;  