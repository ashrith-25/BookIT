// import React, { useEffect, useState } from "react";
// import "./Busses.css";
// import AdminSidebar from "./AdminSidebar";
// import AdminNavbar from "./AdminNavbar";
// import DataTable from "react-data-table-component";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { Button } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
// import Modal from "react-bootstrap/Modal";
// import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";

// const ExpandedComponent = ({ data }) => (
//   <pre>{JSON.stringify(data, null, 2)}</pre>
// );

// const BussesList = () => {
//   const columns = [
//     {
//       name: "BusName",
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: "From",
//       selector: (row) => row.source,
//       sortable: true,
//     },
//     {
//       name: "To",
//       selector: (row) => row.destination,
//       sortable: true,
//     },
//     {
//       name: "Type",
//       selector: (row) => row.bustype,
//       sortable: true,
//     },
//     {
//       name: "class",
//       selector: (row) => row.busclass,
//       sortable: true,
//     },
//     {
//       name: "Actions",
//       cell: (row) => (
//         <button
//           className="btn btn-primary"
//           onClick={() => handleshowEditShow(row)}
//         >
//           Edit
//         </button>
//       ),
//     },
//     {
//       name: "Delete",
//       cell: (row) => (
//         <button className="btn btn-danger" onClick={() => delete_bus(row)}>
//           <DeleteIcon />
//         </button>
//       ),
//     },
//   ];

//   const [pending, setPending] = useState(true);
//   const [rows, setRows] = useState([]);
//   const [show, setShow] = useState(false);
//   const [data, setData] = useState([]);
//   const [msg, setMsg] = useState("");
//   const [busDetails, setBusDetails] = useState({
//     name: "",
//     source: "",
//     destination: "",
//     startdate: "",
//     starttime: "",
//     endtime: "",
//     bustype: "",
//     busclass: "",
//     traveltime: "",
//     no_of_tickets_available: "",
//     rating: "",
//     ticket_cost: "",
//   });

//   const [editBusDetails, seteditBusDetails] = useState({
//     _id: "",
//     name: "",
//     source: "",
//     destination: "",
//     startdate: "",
//     starttime: "",
//     endtime: "",
//     bustype: "",
//     busclass: "",
//     traveltime: "",
//     no_of_tickets_available: "",
//     rating: "",
//     ticket_cost: "",
//   });

//   const [showEdit, setshowEdit] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const handleshowEditClose = () => {
//     setshowEdit(false);
//   };

//   const handleshowEditShow = (row) => {
//     setshowEdit(true);

//     console.log(row._id);
//     console.log(row);

//     seteditBusDetails({
//       ...editBusDetails,
//       _id: row._id,
//       name: row.name,
//       destination: row.destination,
//       source: row.source,
//       startdate: row.startdate,
//       starttime: row.starttime,
//       endtime: row.endtime,

//       bustype: row.bustype,
//       busclass: row.busclass,
//       traveltime: row.traveltime,
//       no_of_tickets_available: row.no_of_tickets_available,
//       rating: row.rating,
//       ticket_cost: row.ticket_cost,
//     });
//   };

//   const add_bus = () => {
//     fetch("https://bookit-backend-nvrc.onrender.com/buses/insert", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(busDetails),
//     })
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.msg !== "error") {
//           handleClose();
//           setMsg(res.msg);
//           toast.success(res.msg, {
//             position: "top-center",
//             style: {
//               backgroundColor: "green",
//               color: "white",
//             },
//           });
//         } else {
//           toast.error(res.msg, {
//             position: "top-center",
//             style: {
//               backgroundColor: "red",
//               color: "white",
//             },
//           });
//         }
//       });
//   };

//   const delete_bus = (row) => {
//     fetch("https://bookit-backend-nvrc.onrender.com/admin/delete_bus", {
//       method: "POST",
//       mode: "cors",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ busname: row.name }),
//     })
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.msg === " ") {
//           toast.error("Unable to delete", {
//             position: "top-center",
//             style: {
//               backgroundColor: "red",
//               color: "white",
//             },
//           });
//         } else {
//           setMsg(msg);
//           toast.success(res.msg, {
//             position: "top-center",
//             style: {
//               backgroundColor: "green",
//               color: "white",
//             },
//           });
//         }
//       });
//   };

//   const edit_bus = () => {
//     axios
//       .post(`https://bookit-backend-nvrc.onrender.com/admin/edit_bus`, {
//         editBusDetails: editBusDetails,
//       })
//       .then((res) => {
//         console.log(res);
//         if (res.data.msg === " ") {
//           toast.error("Unable to update", {
//             position: "top-center",
//             style: {
//               backgroundColor: "red",
//               color: "white",
//             },
//           });
//         } else {
//           setMsg(res.data.msg);
//           handleshowEditClose(false)
//           toast.success(res.data.msg, {
//             position: "top-center",
//             style: {
//               backgroundColor: "green",
//               color: "white",
//             },
//           });
//         }
//       });
//   };

//   const fetchBusses = () => {
//     fetch("https://bookit-backend-nvrc.onrender.com/admin/fetch_busses", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setData(data);
//       });
//   };

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       fetchBusses();
//       setRows(data);
//       setPending(false);
//     }, 700);
//     return () => clearTimeout(timeout);
//   }, [msg]);

//   return (
//     <>
//       <div className="userlist">
//         <AdminSidebar />

//         <div className="userlistContainer">
//           <AdminNavbar />
//           <div className="busseslisttitle">
//             <h1 className="bussesusertitle">Busses</h1>
//             <button className="addbusbtn btn btn-primary" onClick={handleShow}>
//               {" "}
//               Add a bus
//             </button>
//           </div>
//           <hr
//             style={{
//               marginLeft: "49%",
//               marginRight: "46%",
//               marginTop: "0",
//               fontWeight: "bold",
//               opacity: "3",
//               color: "black",
//             }}
//           />
//           <div>
//             <DataTable
//               className="data"
//               selectableRows
//               highlightOnHover
//               progressPending={pending}
//               expandableRowsComponent={ExpandedComponent}
//               pagination
//               columns={columns}
//               data={data}
//             />
//             <Modal show={show} onHide={handleClose}>
//               <Modal.Header closeButton>
//                 <Modal.Title>Add a bus</Modal.Title>
//               </Modal.Header>
//               <Modal.Body>
//                 <Form>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Bus Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter Source city"
//                       onChange={(e) =>
//                         setBusDetails({ ...busDetails, name: e.target.value })
//                       }
//                       autoFocus
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Source city</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter Source city"
//                       onChange={(e) =>
//                         setBusDetails({ ...busDetails, source: e.target.value })
//                       }
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Destination City</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter Destination City"
//                       onChange={(e) =>
//                         setBusDetails({
//                           ...busDetails,
//                           destination: e.target.value,
//                         })
//                       }
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>StartDate</Form.Label>
//                     <Form.Control
//                       type="date"
//                       placeholder="Enter StartDate"
//                       onChange={(e) =>
//                         setBusDetails({
//                           ...busDetails,
//                           startdate: e.target.value,
//                         })
//                       }
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>StartTime</Form.Label>
//                     <Form.Control
//                       type="time"
//                       placeholder="Enter Start Time"
//                       onChange={(e) =>
//                         setBusDetails({
//                           ...busDetails,
//                           starttime: e.target.value,
//                         })
//                       }
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>EndTime</Form.Label>
//                     <Form.Control
//                       type="time"
//                       placeholder="Enter end time"
//                       onChange={(e) =>
//                         setBusDetails({
//                           ...busDetails,
//                           endtime: e.target.value,
//                         })
//                       }
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>BusType</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter bus type"
//                       onChange={(e) =>
//                         setBusDetails({
//                           ...busDetails,
//                           bustype: e.target.value,
//                         })
//                       }
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>BusClass</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter bus class"
//                       onChange={(e) =>
//                         setBusDetails({
//                           ...busDetails,
//                           busclass: e.target.value,
//                         })
//                       }
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>no_of_tickets_available</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter tickets available"
//                       onChange={(e) =>
//                         setBusDetails({
//                           ...busDetails,
//                           no_of_tickets_available: e.target.value,
//                         })
//                       }
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Rating</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter Rating"
//                       onChange={(e) =>
//                         setBusDetails({ ...busDetails, rating: e.target.value })
//                       }
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>TicketCost</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter Ticket Cost"
//                       onChange={(e) =>
//                         setBusDetails({
//                           ...busDetails,
//                           ticket_cost: e.target.value,
//                         })
//                       }
//                     />
//                   </Form.Group>
//                 </Form>
//               </Modal.Body>
//               <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>
//                   Close
//                 </Button>
//                 <Button variant="primary" onClick={add_bus}>
//                   Add Bus
//                 </Button>
//               </Modal.Footer>
//             </Modal>

//             <Modal show={showEdit} onHide={handleshowEditClose}>
//               <Modal.Header closeButton>
//                 <Modal.Title>Edit a bus</Modal.Title>
//               </Modal.Header>
//               <Modal.Body>
//                 <Form>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Bus Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={editBusDetails.name}
//                       onChange={(e) =>
//                         seteditBusDetails({
//                           ...editBusDetails,
//                           name: e.target.value,
//                         })
//                       }
//                       autoFocus
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Source city</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={editBusDetails.source}
//                       onChange={(e) =>
//                         seteditBusDetails({
//                           ...editBusDetails,
//                           source: e.target.value,
//                         })
//                       }
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Destination City</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={editBusDetails.destination}
//                       onChange={(e) =>
//                         seteditBusDetails({
//                           ...editBusDetails,
//                           destination: e.target.value,
//                         })
//                       }
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>StartDate</Form.Label>
//                     <Form.Control
//                       type="date"
//                       placeholder="Edit StartDate"
//                       value={editBusDetails.startdate}
//                       onChange={(e) =>
//                         seteditBusDetails({
//                           ...editBusDetails,
//                           startdate: e.target.value,
//                         })
//                       }
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>StartTime</Form.Label>
//                     <Form.Control
//                       type="time"
//                       placeholder="Edit Start Time"
//                       value={editBusDetails.starttime}
//                       onChange={(e) =>
//                         seteditBusDetails({
//                           ...editBusDetails,
//                           starttime: e.target.value,
//                         })
//                       }
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>EndTime</Form.Label>
//                     <Form.Control
//                       type="time"
//                       placeholder="Edit end time"
//                       value={editBusDetails.endtime}
//                       onChange={(e) =>
//                         seteditBusDetails({
//                           ...editBusDetails,
//                           endtime: e.target.value,
//                         })
//                       }
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>BusType</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Edit bus type"
//                       value={editBusDetails.bustype}
//                       onChange={(e) =>
//                         seteditBusDetails({
//                           ...editBusDetails,
//                           bustype: e.target.value,
//                         })
//                       }
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>BusClass</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Edit bus class"
//                       value={editBusDetails.busclass}
//                       onChange={(e) =>
//                         seteditBusDetails({
//                           ...editBusDetails,
//                           busclass: e.target.value,
//                         })
//                       }
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>no_of_tickets_available</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Edit tickets available"
//                       value={editBusDetails.no_of_tickets_available}
//                       onChange={(e) =>
//                         seteditBusDetails({
//                           ...editBusDetails,
//                           no_of_tickets_available: e.target.value,
//                         })
//                       }
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Rating</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Edit Rating"
//                       value={editBusDetails.rating}
//                       onChange={(e) =>
//                         seteditBusDetails({
//                           ...editBusDetails,
//                           rating: e.target.value,
//                         })
//                       }
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>TicketCost</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Edit Ticket Cost"
//                       value={editBusDetails.ticket_cost}
//                       onChange={(e) =>
//                         seteditBusDetails({
//                           ...editBusDetails,
//                           ticket_cost: e.target.value,
//                         })
//                       }
//                     />
//                   </Form.Group>
//                 </Form>
//               </Modal.Body>
//               <Modal.Footer>
//                 <Button variant="secondary" onClick={handleshowEditClose}>
//                   Close
//                 </Button>
//                 <Button variant="primary" onClick={edit_bus}>
//                   Save Changes
//                 </Button>
//               </Modal.Footer>
//             </Modal>
//           </div>
//         </div>

//         <Toaster />
//       </div>
//     </>
//   );
// };
// export default BussesList;
import React, { useEffect, useState } from "react";
import "./Busses.css";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import DataTable from "react-data-table-component";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

const BussesList = () => {
  const columns = [
    {
      name: "BusName",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "From",
      selector: (row) => row.source,
      sortable: true,
    },
    {
      name: "To",
      selector: (row) => row.destination,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.bustype,
      sortable: true,
    },
    {
      name: "class",
      selector: (row) => row.busclass,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="btn btn-primary"
          onClick={() => handleshowEditShow(row)}
        >
          Edit
        </button>
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <button className="btn btn-danger" onClick={() => delete_bus(row)}>
          <DeleteIcon />
        </button>
      ),
    },
  ];

  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState("");
  const [busDetails, setBusDetails] = useState({
    name: "",
    source: "",
    destination: "",
    startdate: "",
    starttime: "",
    endtime: "",
    bustype: "",
    busclass: "",
    traveltime: "",
    no_of_tickets_available: "",
    rating: "",
    ticket_cost: "",
    via_list: "",
  });

  const [editBusDetails, seteditBusDetails] = useState({
    _id: "",
    name: "",
    source: "",
    destination: "",
    startdate: "",
    starttime: "",
    endtime: "",
    bustype: "",
    busclass: "",
    traveltime: "",
    no_of_tickets_available: "",
    rating: "",
    ticket_cost: "",
    via: "",
  });

  const [showEdit, setshowEdit] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleshowEditClose = () => {
    setshowEdit(false);
  };

  const handleshowEditShow = (row) => {
    setshowEdit(true);

    // console.log(row._id);
    console.log(row);

    seteditBusDetails({
      ...editBusDetails,
      _id: row._id,
      name: row.name,
      destination: row.destination,
      source: row.source,
      startdate: row.startdate,
      starttime: row.starttime,
      endtime: row.endtime,

      bustype: row.bustype,
      busclass: row.busclass,
      traveltime: row.traveltime,
      no_of_tickets_available: row.no_of_tickets_available,
      rating: row.rating,
      ticket_cost: row.ticket_cost,
      via: row.via,
    });
  };

  const add_bus = () => {
    console.log(busDetails);
    fetch("https://bookit-backend-nvrc.onrender.com/buses/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(busDetails),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.msg !== "error") {
          handleClose();
          setMsg(res.msg);
          toast.success(res.msg, {
            position: "top-center",
            style: {
              backgroundColor: "green",
              color: "white",
            },
          });
        } else {
          toast.error(res.msg, {
            position: "top-center",
            style: {
              backgroundColor: "red",
              color: "white",
            },
          });
        }
      });
  };

  const delete_bus = (row) => {
    fetch("https://bookit-backend-nvrc.onrender.com/admin/delete_bus", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ busname: row.name }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.msg === " ") {
          toast.error("Unable to delete", {
            position: "top-center",
            style: {
              backgroundColor: "red",
              color: "white",
            },
          });
        } else {
          setMsg(msg);
          toast.success(res.msg, {
            position: "top-center",
            style: {
              backgroundColor: "green",
              color: "white",
            },
          });
        }
      });
  };

  const edit_bus = () => {
    axios
      .put(`https://bookit-backend-nvrc.onrender.com/admin/edit_bus/${editBusDetails._id}`, {
        editBusDetails: editBusDetails,
      })
      .then((res) => {
        console.log(res);
        if (res.data.msg === " ") {
          toast.error("Unable to update", {
            position: "top-center",
            style: {
              backgroundColor: "red",
              color: "white",
            },
          });
        } else {
          setMsg(res.data.msg);
          toast.success(res.data.msg, {
            position: "top-center",
            style: {
              backgroundColor: "green",
              color: "white",
            },
          });
        }
      });
  };

  const fetchBusses = () => {
    fetch("https://bookit-backend-nvrc.onrender.com/admin/fetch_busses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchBusses();
      setRows(data);
      setPending(false);
    }, 700);
    return () => clearTimeout(timeout);
  }, [msg]);

  return (
    <>
      <div className="userlist">
        <AdminSidebar />

        <div className="userlistContainer">
          <AdminNavbar />
          <div className="busseslisttitle">
            <h1 className="bussesusertitle">Busses</h1>
            <button className="addbusbtn btn btn-primary" onClick={handleShow}>
              {" "}
              Add a bus
            </button>
          </div>
          <hr
            style={{
              marginLeft: "49%",
              marginRight: "46%",
              marginTop: "0",
              fontWeight: "bold",
              opacity: "3",
              color: "black",
            }}
          />
          <div>
            <DataTable
              className="data"
              selectableRows
              highlightOnHover
              progressPending={pending}
              expandableRowsComponent={ExpandedComponent}
              pagination
              columns={columns}
              data={data}
            />
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add a bus</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Bus Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Source city"
                      onChange={(e) =>
                        setBusDetails({ ...busDetails, name: e.target.value })
                      }
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Source city</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Source city"
                      onChange={(e) =>
                        setBusDetails({ ...busDetails, source: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Destination City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Destination City"
                      onChange={(e) =>
                        setBusDetails({
                          ...busDetails,
                          destination: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>StartDate</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Enter StartDate"
                      onChange={(e) =>
                        setBusDetails({
                          ...busDetails,
                          startdate: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>StartTime</Form.Label>
                    <Form.Control
                      type="time"
                      placeholder="Enter Start Time"
                      onChange={(e) =>
                        setBusDetails({
                          ...busDetails,
                          starttime: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>EndTime</Form.Label>
                    <Form.Control
                      type="time"
                      placeholder="Enter end time"
                      onChange={(e) =>
                        setBusDetails({
                          ...busDetails,
                          endtime: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>BusType</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter bus type"
                      onChange={(e) =>
                        setBusDetails({
                          ...busDetails,
                          bustype: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>BusClass</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter bus class"
                      onChange={(e) =>
                        setBusDetails({
                          ...busDetails,
                          busclass: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  {/*  ------------------------------------------------------------------------------------------- */}
                  <Form.Group className="mb-3">
                    <Form.Label>VIA</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter via Routes(Comma seperated Values)"
                      onChange={(e) =>
                        setBusDetails({
                          ...busDetails,
                          via: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  {/*  ------------------------------------------------------------------------------------------- */}

                  <Form.Group className="mb-3">
                    <Form.Label>no_of_tickets_available</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter tickets available"
                      onChange={(e) =>
                        setBusDetails({
                          ...busDetails,
                          no_of_tickets_available: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Rating"
                      onChange={(e) =>
                        setBusDetails({ ...busDetails, rating: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>TicketCost</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Ticket Cost"
                      onChange={(e) =>
                        setBusDetails({
                          ...busDetails,
                          ticket_cost: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={add_bus}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={showEdit} onHide={handleshowEditClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit a bus</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Bus Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={editBusDetails.name}
                      onChange={(e) =>
                        seteditBusDetails({
                          ...editBusDetails,
                          name: e.target.value,
                        })
                      }
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Source city</Form.Label>
                    <Form.Control
                      type="text"
                      value={editBusDetails.source}
                      onChange={(e) =>
                        seteditBusDetails({
                          ...editBusDetails,
                          source: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Destination City</Form.Label>
                    <Form.Control
                      type="text"
                      value={editBusDetails.destination}
                      onChange={(e) =>
                        seteditBusDetails({
                          ...editBusDetails,
                          destination: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>StartDate</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Edit StartDate"
                      value={editBusDetails.startdate}
                      onChange={(e) =>
                        seteditBusDetails({
                          ...editBusDetails,
                          startdate: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>StartTime</Form.Label>
                    <Form.Control
                      type="time"
                      placeholder="Edit Start Time"
                      value={editBusDetails.starttime}
                      onChange={(e) =>
                        seteditBusDetails({
                          ...editBusDetails,
                          starttime: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>EndTime</Form.Label>
                    <Form.Control
                      type="time"
                      placeholder="Edit end time"
                      value={editBusDetails.endtime}
                      onChange={(e) =>
                        seteditBusDetails({
                          ...editBusDetails,
                          endtime: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>BusType</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Edit bus type"
                      value={editBusDetails.bustype}
                      onChange={(e) =>
                        seteditBusDetails({
                          ...editBusDetails,
                          bustype: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>BusClass</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Edit bus class"
                      value={editBusDetails.busclass}
                      onChange={(e) =>
                        seteditBusDetails({
                          ...editBusDetails,
                          busclass: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  {/*  ------------------------------------------------------------------------------------------- */}
                  <Form.Group className="mb-3">
                    <Form.Label>VIA</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter via Routes(Comma seperated Values)"
                      value={editBusDetails.via}
                      onChange={(e) =>
                        seteditBusDetails({
                          ...editBusDetails,
                          via: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  {/*  ------------------------------------------------------------------------------------------- */}
                  <Form.Group className="mb-3">
                    <Form.Label>no_of_tickets_available</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Edit tickets available"
                      value={editBusDetails.no_of_tickets_available}
                      onChange={(e) =>
                        seteditBusDetails({
                          ...editBusDetails,
                          no_of_tickets_available: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Edit Rating"
                      value={editBusDetails.rating}
                      onChange={(e) =>
                        seteditBusDetails({
                          ...editBusDetails,
                          rating: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>TicketCost</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Edit Ticket Cost"
                      value={editBusDetails.ticket_cost}
                      onChange={(e) =>
                        seteditBusDetails({
                          ...editBusDetails,
                          ticket_cost: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleshowEditClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={edit_bus}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>

        <Toaster />
      </div>
    </>
  );
};
export default BussesList;
