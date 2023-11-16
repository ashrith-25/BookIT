import React from 'react';
import './Featured.css';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { useSelector } from 'react-redux';

const Featured = () =>{
    const users_count = useSelector(state => state.usersCount)
    return(
        <div className='featured'>
            <div className='top'>
                <h1 className='usertitle'>Total Users</h1>   
                <MoreVertOutlinedIcon fontSize='small' className='usertitle-icon'/>
            </div>
            <hr style={{marginLeft:'46%',marginRight:'38%',marginTop:'0',fontWeight:'bold',opacity:'1',color:'grey'}}/>
           
            <div className = 'bottom'>
             <div className = 'featuredChart'>
               <CircularProgressbar value={70} text={'70%'} strokeWidth={5}/>
             </div>
             <p className ='featured-title'>
              Total Users
            </p>
            <p className ='featured-amount'>
              {users_count}
            </p>
            <p className ='featured-desc'>
              Its getting viral, Users are increasing!!
            </p>
            <div className='featured-summary'>
            <div className = 'featured-item'>
                    {/* <div className = 'featured-itemTitle'>Target</div>
                    <div className = 'featured-itemResult positive'>
                        <KeyboardArrowDownOutlinedIcon/>
                        <div className = 'featured-resultAmount'>1000</div>
                    </div> */}
                </div>


                <div className = 'featured-item'>
                    <div className = 'featured-itemTitle'>Target</div>
                    <div className = 'featured-itemResult positive'>
                        <KeyboardArrowUpOutlinedIcon/>
                        <div className = 'featured-resultAmount'>1000</div>
                    </div>
                </div>

                <div className = 'featured-item'>
                    {/* <div className = 'featured-itemTitle'>Target</div>
                    <div className = 'featured-itemResult positive'>
                        <KeyboardArrowDownOutlinedIcon/>
                        <div className = 'featured-resultAmount'>1000</div>
                    </div> */}
                </div>

                {/* <div className = 'featured-item'>
                    <div className = 'featured-itemTitle'>Last Week</div>
                    <div className = 'featured-itemResult positive'>
                        <KeyboardArrowDownOutlinedIcon/>
                        <div className = 'featured-resultAmount'>100</div>
                    </div>
                </div>
                <div className = 'featured-item'>
                    <div className = 'featured-itemTitle'>Last Month</div>
                    <div className = 'featured-itemResult negative'>
                        <KeyboardArrowDownOutlinedIcon/>
                        <div className = 'featured-resultAmount'>200</div>
                    </div>
                </div > */}
            </div>
            </div>
        </div>
    )
}

export default Featured