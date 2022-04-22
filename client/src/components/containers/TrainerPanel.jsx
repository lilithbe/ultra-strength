import React from "react"
import team1 from "../../style/img/team-1.jpg"
import team2 from "../../style/img/team-2.jpg"
import team3 from "../../style/img/team-3.jpg"
import team4 from "../../style/img/team-4.jpg"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
const TrainerPanel = ({trainers}) => {
 
    return (
        <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 600 }}>
            <p className="d-inline-block bg-secondary text-primary py-1 px-4">Our Trainer</p>
            <h1 className="text-uppercase">Meet Our Trainer</h1>
          </div>
          <div className="row g-4">
            {trainers.map((item,i)=>{
return(
    <div key={i} className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay={`${0.1+(i-1)*0.2}s`}>
    <div className="team-item">
      <div className="team-img position-relative overflow-hidden">
        <img className="img-fluid" src={item.src} alt="image" />
        <div className="team-social">
            {item.facebook?<Link className="btn btn-square" to={item.facebook}><i className="fab fa-facebook-f" /></Link>:null}
            {item.twitter?<Link className="btn btn-square" to={item.twitter}><i className="fab fa-twitter" /></Link>:null}
            {item.instagram?<Link className="btn btn-square" to={item.instagram}><i className="fab fa-instagram" /></Link>:null}
        </div>
      </div>
      <div className="bg-secondary text-center p-4">
        <h5 className="text-uppercase">{item.label}</h5>
        <span className="text-primary">Select Trainer</span>
      </div>
    </div>
  </div>
)
            })}

          

         

          </div>
        </div>
      </div>
      )
}

export default TrainerPanel
TrainerPanel.propTypes={
    trainers:PropTypes.array,
}
TrainerPanel.defaultProps ={
    trainers:[
        {label:"이시강",src:"https://image.aladin.co.kr/product/25894/78/cover500/k732737771_1.jpg",facebook:"http://naver.com",instagram:"http://naver.com",},
        {label:"홍석",src:"https://image.aladin.co.kr/product/25679/19/cover500/k382735348_1.jpg",twitter:"http://naver.com",instagram:"http://naver.com",},
        {label:"whswkf",src:"http://image.kyobobook.co.kr/images/book/xlarge/340/x3904000043340.jpg",instagram:"http://naver.com",facebook:"http://naver.com"},
        {label:"whswkf",src:"https://image.aladin.co.kr/product/19541/76/cover500/k122635122_1.jpg",twitter:"http://naver.com",instagram:"http://naver.com",},
    ]
}
