import React from 'react'

import testimonial1 from '../../style/img/testimonial-1.jpg'
import testimonial2 from '../../style/img/testimonial-2.jpg'
import testimonial3 from '../../style/img/testimonial-3.jpg'
const Testimonial = () => {
  return (
    <div className="container-xxl py-5">
    <div className="container">
      <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 600 }}>
        <p className="d-inline-block bg-secondary text-primary py-1 px-4">Testimonial</p>
        <h1 className="text-uppercase">What Our Clients Say!</h1>
      </div>
      <div  className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner wow fadeInUp" data-wow-delay="0.1s">
        <div className="carousel-item active text-center" data-dot={`<img class='img-fluid' src='${testimonial1}' alt=''>`}>
          <img className='img-fluid' src={testimonial1} alt=''/>
          <h4 className="text-uppercase">Client Name1</h4>
          <p className="text-primary">Profession</p>
          <span className="fs-5">Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita.</span>
        </div>
        <div className="carousel-item text-center" data-dot={`<img class='img-fluid' src='${testimonial2}' alt=''>`}>
        <img className='img-fluid' src={testimonial2} alt=''/>
          <h4 className="text-uppercase">Client Name2</h4>
          <p className="text-primary">Profession</p>
          <span className="fs-5">Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita.</span>
        </div>
        <div className="carousel-item text-center" data-dot={`<img class='img-fluid' src='${testimonial3}' alt=''>`}>
        <img className='img-fluid' src={testimonial3} alt=''/>
          <h4 className="text-uppercase">Client Name3</h4>
          <p className="text-primary">Profession</p>
          <span className="fs-5">Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita.</span>
        </div>
      </div>

      </div>
    
    </div>
  </div>
  )
}

export default Testimonial