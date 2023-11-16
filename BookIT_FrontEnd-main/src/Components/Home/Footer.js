import React from 'react'
import './Footer.css'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer id="footer">     
        <div className='footermaindiv'>
            <div className="col-md-4 col-sm-12 foot">
                <h5 style={{color:'white'}}>Quick links</h5>
                <div style={{ borderTop: "2px solid #fff ", width:'10%',marginLeft: '48%'}}></div>
                <br></br>
                
                <p style={{color:'white'}}><NavLink to="/" style={{color:'white', textDecoration:'none'}}>Home</NavLink></p>
                <p style={{color:'white'}}><NavLink to="about" style={{color:'white', textDecoration:'none'}}>AboutUs</NavLink></p>
                <p style={{color:'white'}}><NavLink to="contact" style={{color:'white', textDecoration:'none'}}>ContactUs</NavLink></p>           
            </div>

            <div className="col-md-4 col-sm-12">
                <h5 style={{color:'white', textAlign: 'center'}}>Office Address</h5>
                <div style={{ borderTop: "2px solid #fff ", width:'15%',marginLeft: '48%'}}></div>
                <br></br>
             
                <p style={{color:'white', textAlign: 'center'}}>IIIT Sricity</p>
                <p style={{color:'white', textAlign: 'center'}}> GnanMarg circle</p>
                <p style={{color:'white', textAlign: 'center'}}> Chittor,Andhrapradesh</p>
            </div>
               
            <div className="col-md-4 col-sm-12 icon" >
                <h5 style={{color:'white', textAlign: 'center'}}>ContactUs</h5>
                <div style={{ borderTop: "2px solid #fff ", width:'10%',marginLeft: '48%'}}></div>
                <br></br>
                
                {/* <NavLink to="/"> <i className="fa-brands fa-facebook fa-3x public-icon" style={{'marginLeft':'110px'}}></i></NavLink>
                <NavLink to="/"><i className="fa-brands fa-instagram-square fa-3x public-icon"></i></NavLink>
                <NavLink to="/"><i  className="fa-brands fa-twitter-square fa-3x public-icon"></i></NavLink>
                <NavLink to="/"><i  className="fa-brands fa-linkedin fa-3x public-icon"></i></NavLink> */}


      <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"  
        ><i className="fab fa-facebook-f"  ></i></a> 

      
      <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
        ><i className="fab fa-google"></i></a>

      <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
        ><i className="fab fa-instagram"></i></a>
        
            </div>
        </div>

        <p style={{textAlign:'center', color:'white'}} className='copyright'>© Copyright BookIt</p>
    </footer>
  )
}

export default Footer