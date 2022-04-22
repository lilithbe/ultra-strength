import React from 'react'

const AppFooter = () => {
  return (
    <div className="container-fluid bg-secondary text-light footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-lg-4 col-md-6">
          <h4 className="text-uppercase mb-4">Get In Touch</h4>
          <div className="d-flex align-items-center mb-2">
            <div className="btn-square bg-dark flex-shrink-0 me-3">
              <span className="fa fa-map-marker-alt text-primary" />
            </div>
            <span>123 Street, New York, USA</span>
          </div>
          <div className="d-flex align-items-center mb-2">
            <div className="btn-square bg-dark flex-shrink-0 me-3">
              <span className="fa fa-phone-alt text-primary" />
            </div>
            <span>+012 345 67890</span>
          </div>
          <div className="d-flex align-items-center">
            <div className="btn-square bg-dark flex-shrink-0 me-3">
              <span className="fa fa-envelope-open text-primary" />
            </div>
            <span>info@example.com</span>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <h4 className="text-uppercase mb-4">Quick Links</h4>
          <a className="btn btn-link" href="/">About Us</a>
          <a className="btn btn-link" href="/">Contact Us</a>
          <a className="btn btn-link" href="/">Our Services</a>
          <a className="btn btn-link" href="/">Terms &amp; Condition</a>
          <a className="btn btn-link" href="/">Support</a>
        </div>
        <div className="col-lg-4 col-md-6">
          <h4 className="text-uppercase mb-4">Newsletter</h4>
          <div className="position-relative mb-4">
            <input className="form-control border-0 w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email" />
            <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
          </div>
          <div className="d-flex pt-1 m-n1">
            <a className="btn btn-lg-square btn-dark text-primary m-1" href="/"><i className="fab fa-twitter" /></a>
            <a className="btn btn-lg-square btn-dark text-primary m-1" href="/"><i className="fab fa-facebook-f" /></a>
            <a className="btn btn-lg-square btn-dark text-primary m-1" href="/"><i className="fab fa-youtube" /></a>
            <a className="btn btn-lg-square btn-dark text-primary m-1" href="/"><i className="fab fa-linkedin-in" /></a>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="copyright">
        <div className="row">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            © <a className="border-bottom" href="#">Health care</a>, All Right Reserved.
          </div>
          <div className="col-md-6 text-center text-md-end">
            Designed By <a className="border-bottom" href="https://lilith.co.kr">Lilith</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AppFooter