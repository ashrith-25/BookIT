import React, { useState, useRef, useEffect } from "react";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../Home/Header";
import toast, { Toaster } from "react-hot-toast";
import BusLoader from "../Images/Loading_Bus.gif";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [adminloading, setAdminloading] = useState(false);

  const email = useRef("");
  const password = useRef("");

  const validateUser = (result) => {
    if (result.msg === "admin login sucessful") {
      console.log(result);
      toast.success(result.msg, {
        position: "top-center",
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });

      setAdminloading(true);

      setTimeout(() => {
        setAdminloading(false);
        window.localStorage.setItem("admintoken", result.token);
        navigate("/admin");
      }, 1500);
    } else if (result.msg === "Login SuccessFul") {
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
        window.localStorage.setItem("token", result.token);
        navigate("/");
      }, 1500);
    } else {
      toast.error(result.msg, {
        position: "top-center",
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();

    await fetch("https://bookit-backend-nvrc.onrender.com/user/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        validateUser(result);
      });
  };

  useEffect(() => {
    document.body.classList.add("loginbody");

    return () => {
      document.body.classList.remove("loginbody");
    };
  }, []);

  return (
    <>
      <div className={loading && "loginpage"}>
        <Header />
        <div className="container cont" id="container">
          <div className="form-container sign-up-container form-cont"></div>

          <div className="form-container sign-in-container loginform form-cont sign-in-cont">
            <form className="signinform">
              <h1 id="signinheading">Sign in</h1>

              <div className="social-container">
                <a href="/" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="/" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="/" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>

              <span>or use your account</span>

              <input
                type="email"
                placeholder="Email"
                name="loginemail"
                className="logininput"
                ref={email}
              />
              <input
                type="password"
                placeholder="password"
                name="loginpassword"
                className="logininput"
                ref={password}
              />
              <p
                style={{ cursor: "pointer" }}
                className="social"
                onClick={() => navigate("/forgotpassword")}
              >
                Forgot your password?
              </p>
              <button
                className="loginbtn"
                id="signinbtn"
                onClick={SubmitHandler}
              >
                Sign In
              </button>
              <p className="signinpara">
                Don't have an acocunt?{" "}
                <NavLink to="/signup" className="signuptext">
                  SignUp
                </NavLink>
              </p>
            </form>
          </div>

          <div className="overlay-container second-cont"></div>
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

export default Login;
