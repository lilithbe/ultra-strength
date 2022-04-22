import React from 'react'
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { PRODUCT_INFO_IMAGE_UPLOAD } from '../../common/path';
const ProductInfo = ({product,setProduct}) => {
  return (
    <div>
      <SunEditor
        defaultValue={product.productInfo}
        setOptions={{
          minHeight:"330",
          height: "auto",
          max:"700",
          buttonList: [
            ["undo", "redo",],
            ["font", "fontSize", "formatBlock",],
            ["paragraphStyle", "blockquote", "bold", "underline", "italic", "strike", "subscript", "superscript", "fontColor", "hiliteColor", "textStyle", "removeFormat",],
            ["outdent", "indent",],
            ["align",],
            ["horizontalRule", "list", "lineHeight", "table", "showBlocks",],
            ["link", "image", "video", "audio",],
            ["codeView", "preview", "fullScreen",]
          ],
          imageUploadHeader :{
            Authorization:sessionStorage.getItem('token')
          },
          imageUploadUrl:PRODUCT_INFO_IMAGE_UPLOAD,
        
        }}
        onChange={(contents)=>{
          setProduct({...product,productInfo:contents})
        }}
        onImageUpload={(targetElement, index, state, info, remainingFilesCount, core)=>{
          // console.log(targetElement, index, state, info, remainingFilesCount, core)
        }}
      />
    </div>
  )
}

export default ProductInfo