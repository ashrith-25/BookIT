import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Header.css'
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
   
   const navigate = useNavigate()
   const token = window.localStorage.getItem("token")
    return (
       <>
         <section id="title">
               <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{backgroundColor:'#0173AE'}}>
                  <NavLink className="navbar-brand" to='/'> <span className="mb-0 h2">BookIt</span></NavLink>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
                     aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                     <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                     <ul className="navbar-nav ms-auto">
                        <li className="nav-item ">
                           <NavLink className="nav-link" aria-current="page" to='/'>Home</NavLink>
                        </li>
                        <li className="nav-item">
                           <NavLink className="nav-link" to='/'>About Us</NavLink>
                        </li>
                        <li className="nav-item">
                           <NavLink className="nav-link" to='/'>Help/ContactUs</NavLink>
                        </li>
                        {
                           token && <li className='nav-item'>
                                       <FaRegUserCircle size={30} style={{color:'white', marginTop:'15%', cursor:'pointer'}} onClick={() => navigate('/profile')}/>
                                    </li>
                        }
                        
                     </ul>
                  </div>
               </nav>
         </section>
       </>
    )
}


export default Header