import React, { useEffect, useRef, useState } from "react";
import "../adminpage/widget.css";
import "./UserProfile.css";
import UserSideBar from "./UserSideBar";
import Header from "../Home/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import toast, { Toaster } from "react-hot-toast";
import DataTable from "react-data-table-component";

let edituserdetails = {};

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

const Adminprofile = () => {
  const columns = [
    {
      name: "Source",
      selector: (row) => row.source,
      sortable: true,
    },
    {
        name: "Destination",
        selector: (row) => row.destination,
        sortable: true,
      },
      {
        name: "Date",
        selector: (row) => row.date,
        sortable: true,
      },
    ];
  
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [showEdit, setShowEdit] = useState(false);
  
    const [data, setData] = useState([]);
    const formData = new FormData();
  
    const handleshowEditClose = () => setShowEdit(false);
    const inputRef = useRef(null);
  
    const handleClick = (e) => {
      e.preventDefault();
      inputRef.current.click();
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      console.log(file);
      formData.append("email", user.email);
      fetch("https://bookit-backend-nvrc.onrender.com/user/uploadprofilepicture", {
        method: "POST",
        body: formData,
      });
    };
  
    const [editUserDetails, seteditUserDetails] = useState({
      firstname: "",
      lastname: "",
      phone: "",
      gender: "",
    });
  
    const handleShowEdit = () => {
      setShowEdit(true);
      seteditUserDetails({
        ...editUserDetails,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        gender: user.gender,
      });
    };
  
    const verifyUser = (result) => {
      if (result.msg === "Unauthorized") {
        navigate("/");
      } else {
        setUser(result.user);
        setData(result.user.recentsearches);
      }
    };

    const getDetails = async () => {
      const token = window.localStorage.getItem("admintoken");
  
      await fetch("https://bookit-backend-nvrc.onrender.com/user/getadmin", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          verifyUser(result);
          // setUser(result.user);
        });
    };
  
    const handleUserUpdate = () => {
      handleshowEditClose(false);
      edituserdetails = { ...editUserDetails, id: user._id };
      console.log(editUserDetails);
      fetch("https://bookit-backend-nvrc.onrender.com/user/updateuser", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(edituserdetails),
      })
        .then((response) => response.json())
        .then((res) => {
            if (res.msg === "error") {
                toast.error(res.msg, {
                  position: "top-center",
                  style: {
                    backgroundColor: "red",
                    color: "white",
                  },
                });
              } else {
                toast.success(res.msg, {
                  position: "top-center",
                  style: {
                    backgroundColor: "green",
                    color: "white",
                  },
                });
      
                getDetails();
              }
            });
        };
      
        useEffect(() => {
          getDetails();
        }, []);
      
        return (
          <>
            <div className="AdminHome">
              <div className="AdminHome profileside">
                <UserSideBar />
                </div>
        <div className="SidebarHomecont">
          <Header />
          <div className="userright">
            <span className="profileHeading" style={{ color: "black" }}>
              {" "}
              Admin Profile
            </span>
            <button
              className="editprofilebtn btn"
              style={{ backgroundColor: "#0173ae", color: "white" }}
              onClick={handleShowEdit}
            >
              {" "}
              Edit Profile
            </button>
            <div className="profilebox">
              <div className="profileimgdiv">
                <label htmlFor="fileInput">
                  <img
                    src={user.profileimage}
                    style={{ cursor: "pointer" }}
                    id="output"
                    alt="profileimage"
                    className="profileimg"
                    onClick={handleClick}
                  />
                  <input
                    type="file"
                    id="fileInput"
                    name="profilepicture"
                    ref={inputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div className="contentdiv">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "20px",
                      height: "50px",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <div className="userDetailHeading">FirstName</div>
                    <div className="userDetailInfo">{user.firstname}</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "20px",
                      height: "50px",
                      justifyContent: "space-evenly",
                    }}
                  >
                <div className="userDetailHeading">LastName</div>
                    <div className="userDetailInfo">{user.lastname}</div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "5%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "20px",
                      height: "50px",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <div className="userDetailHeading">Gender</div>
                    <div className="userDetailInfo">{user.gender}</div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "5%",
                }}
              >
                <div className="contactLine"></div>
                <div className="contactDetailsHeading">Contact Details</div>
                <div className="contactLine"></div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "5%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "20px",
                    height: "50px",
                    justifyContent: "space-evenly",
                  }}
                >
                  <div
                    className="userDetailHeading"
                    style={{
                      marginLeft: "20%",
                    }}
                  >
                    email
                  </div>
                  <div className="userDetailInfo">{user.email}</div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "20px",
                      height: "50px",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <div className="userDetailHeading">phone</div>
                    <div className="userDetailInfo">{user.phone}</div>
                  </div>
                </div>

                <Modal show={showEdit} onHide={handleshowEditClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group>
                        <Form.Label>FirstName</Form.Label>
                        <Form.Control
                          type="text"
                          defaultValue={user.firstname}
                          onChange={(e) =>
                            seteditUserDetails({
                              ...editUserDetails,
                              firstname: e.target.value,
                            })
                        }
                        minLength={1}
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>LastName</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={user.lastname}
                        onChange={(e) =>
                          seteditUserDetails({
                            ...editUserDetails,
                            lastname: e.target.value,
                          })
                        }
                        minLength={1}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={user.phone}
                        onChange={(e) =>
                          seteditUserDetails({
                            ...editUserDetails,
                            phone: e.target.value,
                          })
                        }
                        maxLength={10}
                        />
                        </Form.Group>
  
                        <Form.Group>
                          <Form.Label>Gender</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={user.gender}
                            onChange={(e) =>
                              seteditUserDetails({
                                ...editUserDetails,
                                gender: e.target.value,
                              })
                            }
                            minLength={1}
                          />
                        </Form.Group>
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleshowEditClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleUserUpdate}>
                        Update Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
          </div>
        </div>
      </div>

      <Toaster />
    </>
  );
};

export default Adminprofile;          