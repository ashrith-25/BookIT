import React from 'react'
import './Testimonials.css'
import AngelinaJolie from '../Images/AngelinaJolie.jpeg'
import LadyImage from '../Images/LadyImage.jpg'

const Testimonials = () => {
  return (
    <section id="testimonials" data-aos="zoom-in-up">
        <div id="testimonial-carousel" className="carousel slide" data-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#testimonial-carousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#testimonial-carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <h2 id='ajheading'>Angelina Jolie</h2>
              <p className='praises'>"The website was good and it shows info about all travels which have available seats instead of showing only a particular travels company. Continue the good work.."</p>
              <img className="testimonials-image" src={AngelinaJolie} alt="dog-profile"/>
            </div>


            <div className="carousel-item">
              <h2 id='mcheading'>Marie Colvin</h2>
              <p className='praises'>"BookIt is doing a great job in helping passengers to book the ticket. I really benefit from this site.Thanks for the friendly support and good startup in travels online booking. All The Best. Take care.."</p>
              <img className="testimonials-image" src={LadyImage} alt="lady-profile"/> 
            </div>

          </div>
          <a className="carousel-control-prev" href="#testimonial-carousel" role="button" data-bs-slide="prev" style={{'color':'black'}}>
            <span className="carousel-control-prev-icon" style={{'color':'black'}}></span>
          </a>
          <a className="carousel-control-next" href="#testimonial-carousel" role="button" data-bs-slide="next" style={{'color':'black'}}>
           <span className="carousel-control-next-icon"></span>
          </a>
        </div>
  </section>
  )
}

export default Testimonials