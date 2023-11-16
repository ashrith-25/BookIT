import React, { useEffect, useState } from "react";
import "./Userlist.css";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import DataTable from "react-data-table-component";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

const Userlist = () => {
  const columns = [
    {
      name: "Firstname",
      selector: (row) => row.firstname,
      sortable: true,
    },
    {
      name: "Lastname",
      selector: (row) => row.lastname,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button className="btn btn-danger" onClick={() => delete_user(row)}>
          <DeleteIcon />
        </button>
      ),
    },
  ];
  const [pending, setPending] = useState(true);
  const [user_data, setUsers_data] = useState([]);
  const [msg, setMsg] = useState('')

  const delete_user = (row) => {
    axios
      .post("https://bookit-backend-nvrc.onrender.com/admin/delete_user", {
        email: row.email,
      })
      .then((res) => {
        console.log(res);
        if (res.data.msg !== " ") {
          setMsg(res.data.msg)
          toast.success(res.data.msg, {
            position: "top-center",
            style: {
              backgroundColor: "green",
              color: "white",
            },
          });

          getUsers();
        } else {
          toast.error("unable to delete", {
            position: "top-center",
            style: {
              backgroundColor: "green",
              color: "white",
            },
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getUsers = () => {
    axios
      .get("https://bookit-backend-nvrc.onrender.com/admin/fetch_users")
      .then((res) => {
        setUsers_data(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUsers();
    const timeout = setTimeout(() => {
      setPending(false);
    }, 700);
    return () => clearTimeout(timeout);
  }, [msg]);

  return (
    <div className="userlist">
      <AdminSidebar />

      <div className="userlistContainer">
        <AdminNavbar />
        <div className="userlisttitle">
          <h1>Users</h1>
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
            data={user_data}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Userlist;
