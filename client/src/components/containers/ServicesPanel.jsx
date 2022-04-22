import React from 'react'

import beardTrim from '../../style/img/beard-trim.png'
import hairDyeing from '../../style/img/hair-dyeing.png'
import haircut from '../../style/img/haircut.png'
import mansShave from '../../style/img/mans-shave.png'
import mustache from '../../style/img/mustache.png'

import stacking from '../../style/img/stacking.png'
const ServicesPanel = () => {
  return (
    <div className="container-xxl py-5">
    <div className="container">
      <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 600 }}>
        <p className="d-inline-block bg-secondary text-primary py-1 px-4">Services</p>
        <h1 className="text-uppercase">Tilte Comment</h1>
      </div>
      <div className="row g-4">
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          <div className="service-item position-relative overflow-hidden bg-secondary d-flex h-100 p-5 ps-0">
            <div className="bg-dark d-flex flex-shrink-0 align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
              <img className="img-fluid" src={haircut} alt="image" />
            </div>
            <div className="ps-4">
              <h3 className="text-uppercase mb-3">AAAAA</h3>
              <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam.</p>
              <span className="text-uppercase text-primary">From $15</span>
            </div>
            <a className="btn btn-square" href="/"><i className="fa fa-plus text-primary" /></a>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
          <div className="service-item position-relative overflow-hidden bg-secondary d-flex h-100 p-5 ps-0">
            <div className="bg-dark d-flex flex-shrink-0 align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
              <img className="img-fluid" src={beardTrim} alt="image" />
            </div>
            <div className="ps-4">
              <h3 className="text-uppercase mb-3">BBBBBB</h3>
              <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam.</p>
              <span className="text-uppercase text-primary">From $15</span>
            </div>
            <a className="btn btn-square" href="/"><i className="fa fa-plus text-primary" /></a>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
          <div className="service-item position-relative overflow-hidden bg-secondary d-flex h-100 p-5 ps-0">
            <div className="bg-dark d-flex flex-shrink-0 align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
              <img className="img-fluid" src={mansShave} alt="image" />
            </div>
            <div className="ps-4">
              <h3 className="text-uppercase mb-3">CCCCC</h3>
              <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam.</p>
              <span className="text-uppercase text-primary">From $15</span>
            </div>
            <a className="btn btn-square" href="/"><i className="fa fa-plus text-primary" /></a>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          <div className="service-item position-relative overflow-hidden bg-secondary d-flex h-100 p-5 ps-0">
            <div className="bg-dark d-flex flex-shrink-0 align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
              <img className="img-fluid" src={hairDyeing} alt="image" />
            </div>
            <div className="ps-4">
              <h3 className="text-uppercase mb-3">DDDDD</h3>
              <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam.</p>
              <span className="text-uppercase text-primary">From $15</span>
            </div>
            <a className="btn btn-square" href="/"><i className="fa fa-plus text-primary" /></a>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
          <div className="service-item position-relative overflow-hidden bg-secondary d-flex h-100 p-5 ps-0">
            <div className="bg-dark d-flex flex-shrink-0 align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
              <img className="img-fluid" src={mustache} alt="image" />
            </div>
            <div className="ps-4">
              <h3 className="text-uppercase mb-3">FFFFFF</h3>
              <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam.</p>
              <span className="text-uppercase text-primary">From $15</span>
            </div>
            <a className="btn btn-square" href="/"><i className="fa fa-plus text-primary" /></a>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
          <div className="service-item position-relative overflow-hidden bg-secondary d-flex h-100 p-5 ps-0">
            <div className="bg-dark d-flex flex-shrink-0 align-items-center justify-content-center" style={{ width: 60, height: 60 }}>
              <img className="img-fluid" src={stacking} alt="image" />
            </div>
            <div className="ps-4">
              <h3 className="text-uppercase mb-3">GGGGGG</h3>
              <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam.</p>
              <span className="text-uppercase text-primary">From $15</span>
            </div>
            <a className="btn btn-square" href="/"><i className="fa fa-plus text-primary" /></a>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}

export default ServicesPanel