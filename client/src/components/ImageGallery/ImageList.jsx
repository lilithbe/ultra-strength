import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Image } from 'primereact/image'
import React from 'react'
import { useState } from 'react'
import {connect} from 'react-redux'
import { PRODUCT_IMAGE_DELETE } from '../../common/path'
import { postApi } from '../../lib/axios'
import { setProduct } from '../../redux'
import ProductImage from '../containers/ProductImage'
const ImageList = ({images,setProduct}) => {
  const [isLoading, setIsLoading] = useState(false)
  const imageDeleteHandler = (image,index) => {    
    postApi(setIsLoading,PRODUCT_IMAGE_DELETE,(res)=>{
      if(res.data.status){
        const result = Array.from(images)
        result.splice(index,1)
        setProduct({images:result,allList:res.data.productData})
      }
    },image)
   }
  return (
    <div className='grid'>
    {images.map((image,i)=>{
       return (
         <div key={i} className="sm:col-12 md:col-4 lg:col-2 "> 
         <div className=' bg-white m-1'>
         <ProductImage src={`${process.env.REACT_APP_DOMAIN}${image.src}`} maxHeight={"300px"} height="300px"/>
           <div className='card-footer p-0 pt-1'>
                <Button className='p-button-sm' icon='pi pi-box' label="제품" badge={image.currnetUseProducts.length}/>   
                <Button className='p-button-sm p-button-danger' icon='pi pi-trash' onClick={(e)=>{
                   e.preventDefault()
                   imageDeleteHandler(image,i)
                   }}  />   
              </div>
         </div>
          
       </div>
       )
     })}
    </div>
  )
}

const mapStateToProps = (state)=>{
return {
  images:state.product.images
}
}
const mapDispatchToProps = (dispatch)=>{
return {
  setProduct:(data)=>dispatch(setProduct(data))
}
}
export default connect(mapStateToProps,mapDispatchToProps)(ImageList)
