import { Image } from 'primereact/image'
import React from 'react'
import {connect} from 'react-redux'
import ImageList from '../../components/ImageGallery/ImageList'
const ImageGallery = ({images}) => {
  return (
    <div>
      <h1 className='text-900 font-bold text-6xl'><i className='bi bi-image'/> ImageGallery</h1>
    <ImageList/>
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
}
}
export default connect(mapStateToProps,mapDispatchToProps)(ImageGallery)