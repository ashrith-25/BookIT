import React, { useEffect, useRef, useState } from 'react'
import styles from './ForgotPassword.module.css'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'

let user = {
    email: '',
    password: '',
    confirmpassword: ''
}

const ForgotPassword = () => {

    const email = useRef('')
    const password = useRef('')
    const confirmpassword = useRef('')
    const [result, setResult] = useState('')
    const [minutes, setMinutes] = useState(1)
    const [seconds, setSeconds] = useState(30)
    const [loading, setLoading] = useState(false)
    const codesRef = useRef([])
    const navigate = useNavigate()

    const SubmitHandler = (e) => {
        
        e.preventDefault()

        setLoading(true)

        user = { ...user, password: password.current.value }
        user = { ...user, confirmpassword: confirmpassword.current.value }

        fetch('https://bookit-backend-nvrc.onrender.com/user/changepassword', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(result => {
                if (result.msg === 'Password Update SuccessFul') {

                    setTimeout(() => {
                        setLoading(false)
                        toast.success(result.msg, {
                            position: 'top-center',
                            style: {
                                backgroundColor: 'green',
                                color: 'white'
                            }
                        })
                    }, 1000)

                    setTimeout(() => {
                        navigate('/login')
                    }, 500)
                }

                else {
                    setTimeout(() => {
                        setLoading(false)
                        toast.error(result.msg, {
                            position: 'top-center',
                            style: {
                                backgroundColor: 'red',
                                color: 'white'
                            }
                        })
                    }, 1000)
                }
            })
    }

    const verifyEmail = (result) => {
        if (result.msg === 'No user present with this email' || result.msg === 'error') {
            setLoading(false)
            toast.error(result.msg, {
                position: 'top-center',
                style: {
                    backgroundColor: 'red',
                    color: 'white'
                }
            })
        }

        else {
            setLoading(false)
            toast.success(result.msg, {
                position: 'top-center',
                style: {
                    backgroundColor: 'green',
                    color: 'white'
                }
            })
        }
    }
    const handleSendOtp = async (e) => {

        e.preventDefault()

        setLoading(true)

        user = { ...user, email: email.current.value }

        await fetch('https://bookit-backend-nvrc.onrender.com/user/sendOTPforpasswordchange', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(result => {
                setResult(result.msg) 
                setLoading(true)
                verifyEmail(result)  
            })
    }

    const verifyOTP = async () => {
        setLoading(true)
        const codes = codesRef.current
        let OTP = ""
        codes.forEach(code => {
            OTP += code.value
        })

        await fetch("https://bookit-backend-nvrc.onrender.com/user//verifyOTPforpasswordchange", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ OTP })
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.msg === 'OTP verification SuccessFul') {
                    setTimeout(() => {
                        setLoading(false)
                        toast.success(result.msg, {
                            position: 'top-center',
                            style: {
                                backgroundColor: 'green',
                                color: 'white'
                            }
                        })
                        setResult(result.msg)
                    }, 1000)
                }

                else {
                    setTimeout(() => {
                        setLoading(false)
                        toast.error(result.msg, {
                            position: 'top-center',
                            style: {
                                backgroundColor: 'red',
                                color: 'white'
                            }
                        })
                    }, 1000)
                }
            })
    }


    const resendOTP = async () => {

        setLoading(true)

        await fetch('https://bookit-backend-nvrc.onrender.com/user/sendOTPforpasswordchange', {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(user)
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.msg === 'OTP sent to your email') {
                    setLoading(false)
                    toast.success(result.msg, {
                        position: 'top-center',
                        style: {
                            backgroundColor: 'green',
                            color: 'white',
                        }
                    })
                }

                else {
                    setLoading(false)
                    toast.error(result.msg, {
                        position: "top-center",
                        style: {
                            backgroundColor: "red",
                            color: "white",
                        },
                    })
                }
            })

        setMinutes(1)
        setSeconds(30)
    }

    useEffect(() => {

        if (result === 'OTP sent to your email') {
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
        }

    }, [result])


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
            {
                (result === '' || result === 'No user present with this email') &&
                <div className={loading && styles.blur}>
                    <div className={`${styles.form_cont} ${styles.sign_in_cont} ${styles.sign_in_container} "form-container loginform"`}>
                        <form className={`${styles.sign_in_form}`}>
                            <h2 className={`${styles.sign_in_heading}`}>Enter Your email to change your password</h2>

                            <input type="email" placeholder="Email" name="loginemail" className={`${styles.login_input}`} ref={email} />
                            <button className='loginbtn' id='signinbtn' onClick={handleSendOtp}
                            >Send otp</button>
                        </form>
                    </div>
                </div>
            }

            {
                result === 'OTP sent to your email' &&
                <div className={loading && styles.blur}>
                    <div>
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

                            <div className="container row" style={{ marginLeft: '25%' }}>
                                <div className="col-md-4 countdown-text" style={{ display: 'flex', }}>
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
                                            marginTop: '5%'
                                        }}
                                        onClick={resendOTP}
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {
                result === 'OTP verification SuccessFul' &&

                <div className={loading && styles.blur}>
                    <div className={`${styles.form_cont} ${styles.sign_in_cont} ${styles.sign_in_container} "form-container loginform"`}>
                        <form className={`${styles.password_form}`}>
                            <h2 className={`${styles.sign_in_heading}`}>Update Password</h2>

                            <input
                                type="password"
                                placeholder="Enter New Password"
                                id="signuppassword"
                                name="password"
                                className={`${styles.password_input}`}
                                ref={password}
                            />
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                id="confirmpassword"
                                name="confirmpassword"
                                className={`${styles.password_input}`}
                                ref={confirmpassword}
                            />
                            <button className='loginbtn' id='signinbtn' onClick={SubmitHandler}

                            >change password</button>
                        </form>
                    </div>
                </div>
            }

            <div>
                { loading && <BeatLoader size={30} color="#0060f3" speedMultiplier={0.8} cssOverride={{position:'absolute',display:'flex',alignItems:'center',justifyContent:'center',top:'43%',marginLeft:'47%'}} /> }
            </div>

            <Toaster />
        </>
    )
}
export default ForgotPassword