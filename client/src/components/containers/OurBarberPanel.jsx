import React from 'react'
import team1 from '../../style/img/team-1.jpg'
import team2 from '../../style/img/team-2.jpg'
import team3 from '../../style/img/team-3.jpg'
import team4 from '../../style/img/team-4.jpg'

const OurBarberPanel = () => {
  return (
    <div className="container-xxl py-5">
    <div className="container">
      <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 600 }}>
        <p className="d-inline-block bg-secondary text-primary py-1 px-4">text</p>
        <h1 className="text-uppercase">Title Comment</h1>
      </div>
      <div className="row g-4">
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          <div className="team-item">
            <div className="team-img position-relative overflow-hidden">
              <img className="img-fluid" src={team1} alt />
              <div className="team-social">
                <a className="btn btn-square" href><i className="fab fa-facebook-f" /></a>
                <a className="btn btn-square" href><i className="fab fa-twitter" /></a>
                <a className="btn btn-square" href><i className="fab fa-instagram" /></a>
              </div>
            </div>
            <div className="bg-secondary text-center p-4">
              <h5 className="text-uppercase">sub title</h5>
              <span className="text-primary">text comment</span>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
          <div className="team-item">
            <div className="team-img position-relative overflow-hidden">
              <img className="img-fluid" src={team2} alt />
              <div className="team-social">
                <a className="btn btn-square" href><i className="fab fa-facebook-f" /></a>
                <a className="btn btn-square" href><i className="fab fa-twitter" /></a>
                <a className="btn btn-square" href><i className="fab fa-instagram" /></a>
              </div>
            </div>
            <div className="bg-secondary text-center p-4">
              <h5 className="text-uppercase">sub title</h5>
              <span className="text-primary">text comment</span>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
          <div className="team-item">
            <div className="team-img position-relative overflow-hidden">
              <img className="img-fluid" src={team3} alt />
              <div className="team-social">
                <a className="btn btn-square" href><i className="fab fa-facebook-f" /></a>
                <a className="btn btn-square" href><i className="fab fa-twitter" /></a>
                <a className="btn btn-square" href><i className="fab fa-instagram" /></a>
              </div>
            </div>
            <div className="bg-secondary text-center p-4">
              <h5 className="text-uppercase">sub title</h5>
              <span className="text-primary">text comment</span>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
          <div className="team-item">
            <div className="team-img position-relative overflow-hidden">
              <img className="img-fluid" src={team4} alt />
              <div className="team-social">
                <a className="btn btn-square" href><i className="fab fa-facebook-f" /></a>
                <a className="btn btn-square" href><i className="fab fa-twitter" /></a>
                <a className="btn btn-square" href><i className="fab fa-instagram" /></a>
              </div>
            </div>
            <div className="bg-secondary text-center p-4">
              <h5 className="text-uppercase">sub title</h5>
              <span className="text-primary">text comment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default OurBarberPanel