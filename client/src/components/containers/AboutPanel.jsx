import React from 'react'
import aboutImage from '../../style/img/about.jpg'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'html-react-parser'
const AboutPanel = ({aboutData}) => {
  return (
    <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
          <div className="d-flex flex-column">
            <img className="img-fluid w-75 align-self-end" src={aboutData.src} alt="image" />
            <div className="w-50 bg-secondary p-5" style={{ marginTop: '-25%' }}>
              <h1 className="text-uppercase text-primary mb-3">{aboutData.years} Years</h1>
              <h2 className="text-uppercase mb-0">Experience</h2>
            </div>
          </div>
        </div>
        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
          <p className="d-inline-block bg-secondary text-primary py-1 px-4">About Us</p>
          <h1 className="text-uppercase mb-4">{aboutData.title}</h1>
          <div className='mb-4'>
            constent html parser
            {ReactHtmlParser(aboutData.content)}
          </div>
          <div className="row g-4">
            <div className="col-md-6">
              <h3 className="text-uppercase mb-3">{aboutData.cardTitle1}</h3>
            
              <div className="mb-0">  {ReactHtmlParser(aboutData.cardContent1)}</div>
            </div>
            <div className="col-md-6">
              <h3 className="text-uppercase mb-3">{aboutData.cardTitle2}</h3>
              <div className="mb-0">  {ReactHtmlParser(aboutData.cardContent2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AboutPanel
AboutPanel.propTypes={
  aboutData:PropTypes.object,
}
AboutPanel.defaultProps ={
  aboutData:{
    src:'https://image.aladin.co.kr/product/28376/33/cover500/k272835609_1.jpg',
    years:23,
    title:'More Than Just A Haircut. Learn More About Us!',
    content:`
    <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
    <p>Stet no et lorem dolor et diam, amet duo ut dolore vero eos. No stet est diam rebum amet diam ipsum. Clita clita labore, dolor duo nonumy clita sit at, sed sit sanctus dolor eos.</p>
    `,
    cardTitle1:'Since 1990',
    cardContent1:'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos.',
    cardTitle2:'1000+ clients',
    cardContent2:'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos.',
  },
}
