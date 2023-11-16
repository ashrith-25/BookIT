import React from 'react'
import './HomeBody.css'
import Header from './Header'
import AboutUs from './AboutUs'
import Testimonials from './Testimonials'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import { useSelector } from 'react-redux'


const HomeBody = () => {
  const navigate = useNavigate()
  const token = window.localStorage.getItem("token")
  
  return (
    <>
        <Header/>
        
        <div className="row" id='homebodyrow'>
            <div className="col-md-6 col-sm-12 sliding-text">
              <h1 id="welcome">
                We welcome you to BookIt, have an amazing experience
              </h1>
              {!token && <button type="button" className="btn btn-primary btn-lg homebuttons" onClick={() => navigate('login')}> Login</button>}
              {!token && <button type="button" className="btn btn-primary btn-lg homebuttons" onClick={() => navigate('signup')}> Signup</button>}
              {/* {!token && <button type="button" className="btn btn-primary btn-lg homebuttons" onClick={() => navigate('admin')}> Adminlogin</button>}       */}
            </div>

            <div className="col-md-6 col-sm-12">

            </div>
        </div>

        <section id="booking">
          <h2 id="bookhere" data-aos="zoom-in-up"> Book your tickets here</h2>

          <div className="tickets">  
            <div className="col-md-12 col-sm-6 ">
              <HashLink to="/searchbuses#title" data-aos="zoom-in-up"> <i className="fa-solid fa-bus fa-4x book-icon"></i></HashLink>
              <h4 data-aos="zoom-in-up">Bus</h4>
            </div>   
          </div>
        </section>


        <section id="features">
          <h1 style={{textAlign:"center"}} id='whybookit' data-aos="zoom-in-up"> Why Bookit?</h1>
          <div className='featuresdiv'>
            <div className="feature-box col-lg-4">
              <i className="fa-solid fa-circle-check fa-4x icon " data-aos="zoom-in-up"></i>
              <h3 id='easytouse' data-aos="zoom-in-up"> Easy to use</h3>
              <p data-aos="zoom-in-up" className='paragraph'>Our developers had made it a very user friendly website</p>
            </div>

            <div className="feature-box col-lg-4">
              <i  className="fa-solid fa-tag fa-4x icon" data-aos="zoom-in-up"></i>
              <h3 id='lowprices' data-aos="zoom-in-up"> Low prices</h3>
              <p data-aos="zoom-in-up" className='paragraph'> We are known for our lower prices </p>
            </div>

            <div className="feature-box col-lg-4">
              <i data-aos="zoom-in-up"  className="fa-solid fa-star fa-4x icon"></i>
              <h3 data-aos="zoom-in-up" id='goodservice'> Good customer service</h3>
              <p data-aos="zoom-in-up" className='paragraph'>Recieved best customer service award by GOI</p>
            </div>
          </div>
        </section>

        <AboutUs/>
        <Testimonials/>
        <Footer/>
    </>
  )
}

export default HomeBody