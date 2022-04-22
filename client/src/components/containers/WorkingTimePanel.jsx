import React from 'react'
import PropTypes from 'prop-types'
const WorkingTimePanel = ({title,items,src,content}) => {
  return (
    <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-0">
        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
          <div className="h-100">
            <img className="img-fluid h-100" src={src} alt="Working Time Panel" />
          </div>
        </div>
        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
          <div className="bg-secondary h-100 d-flex flex-column justify-content-center p-5">
            <p className="d-inline-flex bg-dark text-primary py-1 px-4 me-auto">{title}</p>
            <h1 className="text-uppercase mb-4">{content}</h1>
            <div>
              {items.map((item,i)=>{
                  return(
                    <div key={i} className={`d-flex justify-content-between py-2 ${items.length!==i+1?'border-bottom':''}`}>
                    <h6 className="text-uppercase mb-0">{item.label}</h6>
                    <span className={`text-uppercase ${item.isRed?'text-primary':''}`}>{item.content}</span>
                  </div>
                  )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default WorkingTimePanel
  WorkingTimePanel.propTypes = {
    title:PropTypes.string,
    items:PropTypes.array,
    src:PropTypes.string,
    content:PropTypes.string
  };
WorkingTimePanel.defaultProps = {
  src:'https://www.dailysecu.com/news/photo/201911/81172_80922_156.jpg',
  title:'Working Hours',
  content:'Professional Barbers Are Waiting For You',
  items:[
    {label:'Monday',content:'09 AM - 09 PM',},
    {label:'Tuesday',content:'09 AM - 09 PM'},
    {label:'Wednesday',content:'09 AM - 09 PM'},
    {label:'Thursday',content:'09 AM - 09 PM'},
    {label:'Friday',content:'09 AM - 09 PM'},
    {label:'Sat / Sun',content:'Closed',isRed:true},
  ]
 };