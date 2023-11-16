import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useDispatch } from "react-redux";
import Header from "../Home/Header";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import toast, { Toaster } from "react-hot-toast";
import BusLoader from "../Images/Loading_Bus.gif";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    phone: 0,
    email: "",
    password: "",
    confirmpassword: "",
  });

  const validateUser = (result) => {
    if (result.msg === "OTP sent to your email") {
      toast.success(result.msg, {
        position: "top-center",
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
      dispatch({ type: "userdetails", payload: user });
      setTimeout(() => {
        setLoading(false);
        navigate("/verify");
      }, 1000);
    } else {
      toast.error(result.msg, {
        position: "top-center",
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });

      setLoading(false);
    }
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    await fetch("https://bookit-backend-nvrc.onrender.com/user/sendOTP", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => {
        validateUser(result);
      });
  };

  useEffect(() => {
    document.body.classList.add("signupbody");

    return () => {
      document.body.classList.remove("signupbody");
    };
  }, []);

  return (
    <>
      <div className={loading && "signuppage"}>
        <Header />
        <div className="container" id="container">
          <div className="form-container sign-up-container" id="form-container">
            <form id="signupform">
              <h1 className="signupheading">Sign Up</h1>
              <div className="social-container">
                <a href="/" className="social" id="signupsocial">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="/" className="social" id="signupsocial">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="/" className="social" id="signupsocial">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>

              <div className="formcontrol">
                <input
                  type="text"
                  placeholder="firstname"
                  id="firstname"
                  name="firstname"
                  className="signupinput"
                  onChange={(e) =>
                    setUser({ ...user, firstname: e.target.value })
                  }
                />
              </div>
              <br />

              <div className="formcontrol">
                <input
                  type="text"
                  placeholder="lastname"
                  id="lastname"
                  name="lastname"
                  className="signupinput"
                  onChange={(e) =>
                    setUser({ ...user, lastname: e.target.value })
                  }
                />
              </div>
              <br />

              <div>
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="IN"
                  value={user.phone}
                  onChange={(value) => setUser({ ...user, phone: value })}
                />
              </div>
            </form>
          </div>

          <div className="overlay-container">
            <div className="form-right">
              <div className="formcontrol">
                <input
                  type="text"
                  placeholder="gender"
                  id="gender"
                  name="gender"
                  className="signupinput"
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                />
              </div>
              <br />
              <div className="formcontrol">
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  className="signupinput"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <br />

              <div className="formcontrol">
                <input
                  type="password"
                  placeholder="Password"
                  id="signuppassword"
                  name="password"
                  className="signupinput"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
              <br />

              <div className="formcontrol">
                <input
                  type="password"
                  placeholder="ConfirmPassword"
                  id="confirmpassword"
                  name="confirmpassword"
                  className="signupinput"
                  onChange={(e) =>
                    setUser({ ...user, confirmpassword: e.target.value })
                  }
                />
              </div>
              <br />
            </div>

            <button id="signupbtn" onClick={SubmitHandler}>
              Sign Up
            </button>
          </div>
        </div>
      </div>

      <div className="loadingmaindiv">
        {loading && (
          <div className="loadingdiv">
            <img src={BusLoader} alt="loader" />
          </div>
        )}
      </div>

      <Toaster />
    </>
  );
};

export default SignUp;
