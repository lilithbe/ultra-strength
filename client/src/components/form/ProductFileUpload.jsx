import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React from 'react';
import ProductImageUploader from './ProductImageUploader';
import {connect} from 'react-redux'
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import View360 from '../360view/View360';
import { Button } from 'primereact/button';
import { postApi } from '../../lib/axios';
import { PRODUCT_IMAGE_UPLOAD } from '../../common';
import { setProduct } from '../../redux';
import { Sidebar } from 'primereact/sidebar';

const ProductFileUpload = ({product,setProduct,rotate, images, setProductUpdata}) => { 
    const [isRotateView, setIsRotateView] = useState(false)
    const [rotateViewValue, setRotateViewValue] = useState('none')
    const [mainImageIndex, setMainImageIndex] = useState(product.mainImageIndex||0)
  return (
      <div>
          <div >
              <div>이미지 업로드</div>
              <div className='p-2' >
                    <ImageUploader files={product.mainImage} setProduct={setProduct} images={images} callback={(result)=>{
                     
                     setProductUpdata({...product,                        
                            images:[...product.images,...result],
                            mainImageIndex:mainImageIndex
                            })
                         
                    }}/>
                
              </div>
          </div>
          <div >
              <div >이미지 목록</div>
              <div className='p-2'>
                  <div className='grid'>
                  {product.images.map((image,i)=>{
                      return (
                          <div className='sm:col-12 md:col-3 lg:col-2 cursor-pointer' key={i}>

                            <div className='flex justify-content-center'>
                           {product.mainImageIndex === i?<Button className='p-button-outlined p-button-sm p-button-help' label="Main"  onClick={(e)=>e.preventDefault()}/>:<Button className='p-button-outlined p-button-sm p-button-info' label={i+1} onClick={(e)=>e.preventDefault()}/>}
                             </div>

                              <img  onClick={()=>{
                            setProductUpdata({...product,
                                mainImageIndex:i
                                })
                                setMainImageIndex(i)
                          }} className={product.mainImageIndex === i ? 'border-3 border-blue-500' : ''} src={`${process.env.REACT_APP_DOMAIN}${image.src}`} alt={"preview images"} style={{ width: "100%", maxHeight: "200px", objectFit: 'center' }} />
                            <div className='flex justify-content-center'>
                           
                          <Button icon='bi bi-trash'  onClick={(e)=>{
                              e.preventDefault()
                              const result = Array.from(product.images)
                              result.splice(i,1)
                              let index=mainImageIndex
                              if(product.images.length===i+1){
                                index=mainImageIndex-1
                              }
                              setProductUpdata({...product,
                                mainImageIndex:index,
                                images:result
                                })
                                setMainImageIndex(index)
                          }}/>
                      
                            </div>
                        
                          </div>
                      )
                    })}
                  </div>
                   
              </div> 
          </div>
          <div >
              <div >동영상</div>
              <div  className='p-2'>
                  <InputText className='w-100 p-inputtext-sm' value={product.productVideo}  onChange={(e)=>{ setProduct({ ...product, productVideo: e.target.value }) }}/>
              </div>
          </div>
          <div >
              <div >360도 이미지</div>
              <div  className='p-2'>
                  <Dropdown value={product.rotateId} options={[{label:'사용안함',_id:'none'},...rotate]} optionValue="_id"  onChange={(e)=>{
                        setProductUpdata({...product,
                            isRotate:e.value==='none'?false:true,
                            rotate:e.value==='none'?'none':rotate.filter(f=>f._id===e.value)[0].value,
                            rotateId:e.value,
                            })
                            setRotateViewValue(e.value==='none'?'none':rotate.filter(f=>f._id===e.value)[0].value)
                  }}
                  />
                  {rotateViewValue!=='none'?
                  <Button icon="bi bi-search" onClick={(e)=>{
                      e.preventDefault()
                      setIsRotateView(true)
                  }}/>     :null}
                      {rotateViewValue!=='none'?
                  <Dialog visible={isRotateView} onHide={()=>{setIsRotateView(false)}}>
                  <View360 url={`${process.env.REACT_APP_DOMAIN}/rotate/${rotateViewValue}`} />
                </Dialog>    :null}
                
             



                  {/* <input type={"file"} accept=".zip" 
                  onChange={(e)=>{
                    e.preventDefault()
                    setProduct({...product,
                        isRotate:true,
                        rotateZip:e.target.files[0]
                        })
                  }}/> */}
              </div>
          </div>
      </div>
  )
}

const mapStateToProps = (state)=>{
return {
    rotate:state.product.rotate,
    images:state.product.images,
    
}
}
const mapDispatchToProps = (dispatch)=>{
return {
    setProduct:(data)=>dispatch(setProduct(data))
}
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductFileUpload)

const ImageUploader = ({callback,images, setProduct}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false)
    //   URL.createObjectURL(props.item.image)
    const fileUploadHandler = (e) => { 
        e.preventDefault()
        const formData = new FormData()
        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];
            formData.append('productImage',file)
        }
        postApi(setIsLoading,PRODUCT_IMAGE_UPLOAD,(res)=>{
            setProduct({images:[...images,...res.data.result]})
            callback(res.data.result)
        },formData)
     }
     const [checkGalleryList, setCheckGalleryList] = useState([])
     const gallerySaveHandler = (e) => { 
         e.preventDefault()
         callback(checkGalleryList)
         setIsImageGalleryOpen(false)
         setCheckGalleryList([])
      }
     
    return(
        <div className='flex justify-content-start'>
            <div>
            <label ></label>
            <input type="file" multiple onChange={(e)=>{             
                fileUploadHandler(e)
            }}/>
            </div>
           
            <div>
            <Button label="Image Gallery Open" onClick={(e)=>{
                e.preventDefault()
                setIsImageGalleryOpen(true)
            }}/>
            </div>
            <Sidebar visible={isImageGalleryOpen} fullScreen onHide={(e)=>{
                setIsImageGalleryOpen(false)
            }} >

                <h1>Image Gallery {images.length}</h1>
                <div><Button label="적용" onClick={gallerySaveHandler}/></div>
               <div className='grid'>
               {images.map((image,i)=>{
                    return(
                        <ImageItem key={i} i={i} image={image}
                        deleteCallback={()=>{
                            const result=Array.from(checkGalleryList)
                            const clickActiveIndex = result.findIndex(f=>f._id===image._id)
                            result.splice(clickActiveIndex,i)
                            setCheckGalleryList(result)
                        }}
                         callback={(image)=>{
                            setCheckGalleryList([...checkGalleryList,image])
                        }}/>
                    )
                })}
               </div>
            </Sidebar>
        </div>
    )
 }

 const ImageItem = ({image,i,callback,deleteCallback}) => { 
     const [isOnFocus, setIsOnFocus] = useState(false)
     const clickHandler = (e) => { 
         e.preventDefault()
         if(isOnFocus===false){
            setIsOnFocus(true)
            callback(image)
         }else{
            setIsOnFocus(false)
            deleteCallback()
         }
      }
     return(
        <div className='sm:col-12 md:col-4 lg:col-2' >
        <div 
            className={`flex align-items-end cursor-pointer border-3 hover:border-blue-600 ${isOnFocus?'border-pink-600':''}` }
            onClick={clickHandler}
            style={{
                width: "100%",
                height: "300px",
                maxHeight: "300px",
                backgroundImage: `url(${process.env.REACT_APP_DOMAIN}${image.src})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
              
            }}
        >
          <div className=' w-100'>
            <div className='text-center'>
            <Button icon="bi bi-check" className={`${isOnFocus?'':'p-button-outlined'}`}/>
            </div>
          </div>
        </div>
    </div>
     )
  }

  