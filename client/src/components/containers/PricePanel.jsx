import React from 'react'
const PricePanel = () => {
  return (
    <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-0">
        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
          <div className="bg-secondary h-100 d-flex flex-column justify-content-center p-5">
            <p className="d-inline-flex bg-dark text-primary py-1 px-4 me-auto">Price &amp; Plan</p>
            <h1 className="text-uppercase mb-4">text comment</h1>
            <div>
              <div className="d-flex justify-content-between border-bottom py-2">
                <h6 className="text-uppercase mb-0">aaaaa</h6>
                <span className="text-uppercase text-primary">$29.00</span>
              </div>
              <div className="d-flex justify-content-between border-bottom py-2">
                <h6 className="text-uppercase mb-0">bbbbb</h6>
                <span className="text-uppercase text-primary">$35.00</span>
              </div>
              <div className="d-flex justify-content-between border-bottom py-2">
                <h6 className="text-uppercase mb-0">ccccc</h6>
                <span className="text-uppercase text-primary">$23.00</span>
              </div>
              <div className="d-flex justify-content-between border-bottom py-2">
                <h6 className="text-uppercase mb-0">ddddd</h6>
                <span className="text-uppercase text-primary">$19.00</span>
              </div>
              <div className="d-flex justify-content-between border-bottom py-2">
                <h6 className="text-uppercase mb-0">eeeee</h6>
                <span className="text-uppercase text-primary">$15.00</span>
              </div>
              <div className="d-flex justify-content-between py-2">
                <h6 className="text-uppercase mb-0">fffff</h6>
                <span className="text-uppercase text-primary">$39.00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
          <div className="h-100">
            <img className="img-fluid h-100" src={"http://www.health-plaza.co.kr/shopimages/yunmone4/mobile/9/143679_represent?04281205"} alt="image" />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default PricePanel