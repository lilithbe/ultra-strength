import React, { useRef } from "react"
import {  NavLink } from "react-router-dom"
import { Toast } from 'primereact/toast'
import ProductImage from "./ProductImage"
import { setProduct } from "../../redux"
import { connect } from "react-redux"
import { setComma } from "../../lib/comma"
import {Badge} from 'primereact/badge'
const ProductListPanel = ({ items,myCartList,setProduct }) => {
  const toast = useRef(null)
  const badgeOptions=[
    {label:'new',color:'primary'},
    {label:'hit',color:'hit'},
    {label:'재입고',color:'info'},
    {label:'재요청',color:'help'},
  ]
  const addCartHandler = (productItem) => {
    const isIn = myCartList.findIndex(f => f._id === productItem._id)
    if (isIn === -1) {
      setProduct({myCartList:[...myCartList,{...productItem,myOptions:[] }]})
      localStorage.setItem('CART_OBJECT', JSON.stringify([...myCartList,{...productItem,myOptions:[] }]))
      toast.current.show({ severity: 'success', summary: 'Success Message', detail: '카트에 담았습니다.' });
    } else {
      toast.current.show({ severity: 'error', summary: 'Error Message', detail: '이미 카트에 담겨있습니다.' });
    }
  }
  return (
    <div className="row g-4">
    {items.map((item, i) => {
      if(item.isUsed ){
        return (
          <div key={i} className="col-lg-3 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay={`${0.1 + (i - 1) * 0.2}s`}>
            <div className="team-item border-1 ">
              <div className="team-img position-relative overflow-hidden bg-white">
                <ProductImage src={`${process.env.REACT_APP_DOMAIN}${item.images[item.mainImageIndex].src}`} maxHeight={"300px"} height="300px" />
                <div className="team-badge">
                  {item.badge.map((item,i)=>{
                    return  <Badge key={i} value={item} className={`${badgeOptions[i].color} ml-1`} severity="danger"/>
                  })}
                 
                </div>
                <div className="team-social">
                  <NavLink className="btn btn-square" to={'#'} onClick={() => { addCartHandler(item) }}><i className="bi bi-cart" /></NavLink>
                  <NavLink className="btn btn-square" to={`/product/view/${item.categoryId}/${item._id}`}><i className="bi bi-eye" /></NavLink>
                </div>
              </div>
              <NavLink to={`/product/view/${item.categoryId}/${item._id}`}>
                <div className=" text-center mt-3">
                  <h6 className="fw-bold ">{item.mainLabel}</h6>
                  <p className="text-uppercase mb-0" style={{fontSize:'0.7em'}}>{item.subLabel}</p>
                  <div className="p-2">
                    <h6 className="px-auto py-2 mb-2 border"  style={{fontSize:'0.8em'}}>{item.modelLabel}</h6>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        )
      }else{
        return null
      }
     
    })}




<Toast ref={toast} />
  </div>
  )
}

const mapStateToProps = (state)=>{
return {
  myCartList:state.product.myCartList
}
}
const mapDispatchToProps = (dispatch)=>{
return {
  setProduct:(data)=>dispatch(setProduct(data))
}
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductListPanel)
ProductListPanel.propTypes = {

}
ProductListPanel.defaultProps = {

}
