import React from 'react'


const MainCarousel = () => {
  return (
    <div className="container-fluid p-0 mb-5 wow fadeIn" data-wow-delay="0.1s">
    <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="w-100" src={'https://www.thek-hotel.co.kr/resources/gjmh/images/facilities/img_facilities_view3_1.jpg'} alt="Image" />
          <div className="carousel-caption d-flex align-items-center justify-content-center text-start">
            <div className="mx-sm-5 px-5" style={{ maxWidth: 900 }}>
              <h1 className="display-2 text-white text-uppercase mb-4 animated slideInDown">We Will Keep You An Awesome Look</h1>
              <h4 className="text-white text-uppercase mb-4 animated slideInDown"><i className="fa fa-map-marker-alt text-primary me-3" />123 Street, New York, USA</h4>
              <h4 className="text-white text-uppercase mb-4 animated slideInDown"><i className="fa fa-phone-alt text-primary me-3" />+012 345 67890</h4>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img className="w-100" src={'https://www.thek-hotel.co.kr/resources/gjmh/images/facilities/img_facilities_view3_2.jpg'} alt="Image" />
          <div className="carousel-caption d-flex align-items-center justify-content-center text-start">
            <div className="mx-sm-5 px-5" style={{ maxWidth: 900 }}>
              <h1 className="display-2 text-white text-uppercase mb-4 animated slideInDown">Luxury at Affordable Price</h1>
              <h4 className="text-white text-uppercase mb-4 animated slideInDown"><i className="fa fa-map-marker-alt text-primary me-3" />123 Street, New York, USA</h4>
              <h4 className="text-white text-uppercase mb-4 animated slideInDown"><i className="fa fa-phone-alt text-primary me-3" />+012 345 67890</h4>
            </div>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#header-carousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  )
}

export default MainCarousel

