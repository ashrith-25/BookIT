import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import './BookingList.css';
import DataTable from 'react-data-table-component';

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;


const columns = [
    {
        name: 'BookingId',
        selector: row => row.BookingId,
        sortable: true,
        
    },

    {
        name: 'User',
        selector: row => row.User,
        sortable: true,
        
    },

    {
        name: 'From',
        selector: row => row.From,
        sortable: true,
    },
    {
        name: 'To',
        selector: row => row.To,
        sortable: true,
    },
    {
        name: 'StartDate',
        selector: row => row.StartDate,
        sortable: true,
    },
    {
        name: 'EndDate',
        selector: row => row.EndDate,
        sortable: true,
    },
    
];


const data = [
    {
        BookingId: 1,
        User:'santosh',
        From: 'Sricity',
        To: 'Narasaraopet',
        StartDate:'15-01-23',
        EndDate:'16-01-23',
    },
    {
        BookingId: 1,
        User:'santosh',
        From: 'Sricity',
        To: 'Narasaraopet',
        StartDate:'15-01-23',
        EndDate:'16-01-23',
    },
    {
        BookingId: 1,
        User:'santosh',
        From: 'Sricity',
        To: 'Narasaraopet',
        StartDate:'15-01-23',
        EndDate:'16-01-23',
    },
    {
        BookingId: 1,
        User:'santosh',
        From: 'Sricity',
        To: 'Narasaraopet',
        StartDate:'15-01-23',
        EndDate:'16-01-23',
    },
]

const Bookinglist = () =>{

    const [pending, setPending] = React.useState(true);
	const [rows, setRows] = React.useState([]);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			setRows(data);
			setPending(false);
		}, 700);
		return () => clearTimeout(timeout);
	}, []);

    return(
        <>
        <div className = 'userlist'>
            <AdminSidebar/>
           
            <div className='userlistContainer'>
                <AdminNavbar/>
                <div className = 'userlisttitle'>
                <h1 >BookingList</h1>
                
                </div>
                <hr style={{marginLeft:'49%',marginRight:'42%',marginTop:'0',fontWeight:'bold',opacity:'3',color:'black'}}/>
                <div>
                <DataTable className="data"
                selectableRows
                highlightOnHover
                progressPending={pending}
                expandableRowsComponent={ExpandedComponent}
                pagination   
                columns={columns}
                data={data}         
        />

        </div>
            </div>
        </div>

        </>
    )
}

export default Bookinglist
