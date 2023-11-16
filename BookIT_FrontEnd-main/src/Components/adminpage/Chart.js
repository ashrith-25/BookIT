import { grey } from "@mui/material/colors";
import React from "react";
import './Chart.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";

const Chart = () => {

  const navigate = useNavigate()
    return(
        <div className = 'chart'>
            <h1 className = 'recent-booking'>Recent Bookings</h1>
            
            <hr style={{marginLeft:'45%',marginRight:'43%',marginTop:'0',fontWeight:'bold',opacity:'1',color:'grey'}}/>
            <button className="seeallbookings" id='seeallbookings' onClick={() => navigate('/bookinglist')}>See all</button>
            <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className = 'Tablecell'>Booking ID</TableCell>
            <TableCell align="right" className='tablecell'>USER</TableCell>
            <TableCell align="right" className = 'tablecell'>FROM</TableCell>
            <TableCell align="right" className = 'tablecell'>TO</TableCell>
            <TableCell align="right" className = 'tablecell'>STATUS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow
            //   key={row.name}
            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                123454
              </TableCell>
              <TableCell align="right">santosh</TableCell>
              <TableCell align="right">vijayawada</TableCell>
              <TableCell align="right">kurnool</TableCell>
              <TableCell align="right">completed</TableCell>
            </TableRow>
            
            <TableRow
            //   key={row.name}
            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                123454
              </TableCell>
              <TableCell align="right">santosh</TableCell>
              <TableCell align="right">vijayawada</TableCell>
              <TableCell align="right">kurnool</TableCell>
              <TableCell align="right">completed</TableCell>
            </TableRow>
            <TableRow
            //   key={row.name}
            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                123454
              </TableCell>
              <TableCell align="right">santosh</TableCell>
              <TableCell align="right">vijayawada</TableCell>
              <TableCell align="right">kurnool</TableCell>
              <TableCell align="right">completed</TableCell>
            </TableRow>
            <TableRow
            //   key={row.name}
            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                123454
              </TableCell>
              <TableCell align="right">santosh</TableCell>
              <TableCell align="right">vijayawada</TableCell>
              <TableCell align="right">kurnool</TableCell>
              <TableCell align="right">completed</TableCell>
            </TableRow>
            <TableRow
            //   key={row.name}
            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                123454
              </TableCell>
              <TableCell align="right">santosh</TableCell>
              <TableCell align="right">vijayawada</TableCell>
              <TableCell align="right">kurnool</TableCell>
              <TableCell align="right">completed</TableCell>
            </TableRow>
            <TableRow
            //   key={row.name}
            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                123454
              </TableCell>
              <TableCell align="right">santosh</TableCell>
              <TableCell align="right">vijayawada</TableCell>
              <TableCell align="right">kurnool</TableCell>
              <TableCell align="right">completed</TableCell>
            </TableRow>
            <TableRow
            //   key={row.name}
            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                123454
              </TableCell>
              <TableCell align="right">santosh</TableCell>
              <TableCell align="right">vijayawada</TableCell>
              <TableCell align="right">kurnool</TableCell>
              <TableCell align="right" className='chart-status'>completed</TableCell>
            </TableRow>
            
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}

export default Chart