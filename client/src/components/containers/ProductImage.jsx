import React from 'react'

const ProductImage = ({src,height,maxHeight }) => {
  return (
    <div 
    className="d-flex align-items-center "
    style={{
      width: "100%",
      height: height,
      maxHeight: maxHeight,
      backgroundImage: `url(${src})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
    }} >
  </div>
  )
}

export default ProductImage