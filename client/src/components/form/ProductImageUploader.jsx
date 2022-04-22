import React from 'react'
import { useState , useEffect } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { ScrollPanel } from 'primereact/scrollpanel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const ImageUploader = styled.div`  
position:relative;
display:inline;
float: left; 
width:140px;
margin-right:3px;

    .image-label{
        ${props=>props.item.isSelect?`
        background-image:url("${ URL.createObjectURL(props.item.image)}");
        background-size:cover;
        background-repeat:no-repeat;
        background-position:center;
        background-attachment: local;
        border: 2px dashed #999999;
        content: none;
        `:`
        ${ props.item.status?`
        background-image:url("${ props.item.src}");
        background-size:cover;
        background-repeat:no-repeat;
        background-position:center;
        background-attachment: local;
        border: 2px dashed #999999;
        content: none;
        `:`
        background-color:#dbadad28;       
        border: 1px dashed #999999;
        :hover{
            background-color:#94b8a05b;
        }
        `}
        `}
        


        text-align: center;
        cursor:pointer;
        padding-top:38px;
        border-radius: 3px;
        width:  140px;
        height: 140px;
        i{
            font-size:40px;
        }
    }
   
    .image-nav{
        z-index:2;
        background-color:#00000081;
        width:140px;
        height:46.666px;
        position:absolute;
        bottom:6px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        text-align: center;
        i{
            color:#ffffffd8;
            font-size:21px;
        }
        .image-nav-btn{
            width:46.6666px;
        }
        .image-nav-btn:hover{
            background-color:#000000de;
            i{
                color:#ffffff;
            }
        }
    }


`
const ImagePreview = styled.div`
    width:500px;
    height:500px;
    ${props=>props.item.isSelect?`
        background-image:url("${ URL.createObjectURL(props.item.image)}");
    background-size:cover;
    background-repeat:no-repeat;
    background-position:center;
    background-attachment: local;
    border: 1px solid #999999;
    content: none;
    `:`
    background-color:#dbadad28;
    border: 1px dashed #999999;
    `}
`
const ProductImageUploader = ({files, multiple,id,callback,max, accept}) => {
    const imageInit={
        isImage:false,
        isSelect:false,
        isPreviewOpen:false,
        image:{}
    }
    const [images, setImages] = useState(files)

    useEffect(() => {
        const result = Array.from(files)
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            // result.splice(i,1,{...item,...imageInit})
            result.splice(i,1,{...item,...imageInit})
            

           
        }
        setImages(result)  
    }, [files])
    useEffect(() => {
      console.log(images)
    }, [images])
    
    
  
    const setImagesHandler = (files,i)=>{
        const result=Array.from(images)
        if(multiple===false){
            result.splice(i,1,{ isImage:true, isPreviewOpen:false,isSelect:true,image:files[0]})
            setImages(result)
        }else{           
            for (let ii = 0; ii < files.length; ii++) {
                const image = files[ii];
                if(ii===0){
                    result.splice(i,1,{isImage:true,isPreviewOpen:false,isSelect:true,image:image})
                }else{
                    result.splice(i+1,0,{isImage:true,isPreviewOpen:false,isSelect:true,image:image})
                }
            }
            if(images.length===i+1){
                setImages([...result, imageInit])
            }else{
                setImages(result)
            }
        }
        callback(result)
    }
    /**
     * input handler
     */
    const changeHandler = (e,i) => {
        if(e.target.files.length!==0){
            setImagesHandler(e.target.files,i)
        }
     }

     /**
      * 드래그 이미지 핸들러
      */
     const dropHandler = (e,index) => { 
        e.preventDefault() 
         const files =[]
         if (e.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
          
            for (let i = 0; i < e.dataTransfer.items.length; i++) {
              // If dropped items aren't files, reject them
              if (e.dataTransfer.items[i].kind === 'file') {
                const file = e.dataTransfer.items[i].getAsFile();
                files.push(file)
              }
            }
          } else {
            // Use DataTransfer interface to access the file(s)
            for (let i = 0; i < e.dataTransfer.files.length; i++) {
                const file=e.dataTransfer.files[i]
                files.push(file)
            }
          }
          setImagesHandler(files,index)
      }
      const dragOverHandler = (e) => {
          e.preventDefault() 
     }
  
     const [isOrderChangeOpen, setIsOrderChangeOpen] = useState(false)
  return (
    <div>
        <div className='d-flex'>
        {images.map((item,i)=>{
            if(max  > i){
                return (
                    <ImageUploader className='image-uploader' key={i} item={item}>
                        <div>
                            <label className='image-label' htmlFor={`image-upload${id}-${i}`} onDrop={(e) => { dropHandler(e, i) }} onDragOver={dragOverHandler} >
                                {item.isSelect === false ? <i className='bi bi-plus-lg' /> : null}
                            </label>
                            <input id={`image-upload${id}-${i}`} type="file" accept={accept} multiple={multiple} className="d-none" onChange={(e) => { changeHandler(e, i)}} />
                            {item.isSelect ?
                                <div className='image-nav'>
                                    <div className='btn-group'>
                                        {/* image preview */}
                                        <button className='image-nav-btn btn btn-outline' onClick={(e) => {
                                            e.preventDefault()
                                            const result = Array.from(images)
                                            result.splice(i, 1, { ...item, isPreviewOpen: true })
                                            setImages(result)
                                        }} ><i className='bi bi-eye' /></button>
                                        {/* image update */}
                                        <label className='image-nav-btn btn btn-outline' htmlFor={`image-upload${id}-${i}`} ><i className='bi bi-pen' /></label>
                                        {/* image delete */}
                                        <button className='image-nav-btn btn btn-outline' onClick={(e) => {
                                            e.preventDefault()
                                            const result = Array.from(images)
                                           
                                            if(id==='main'){
                                                result.splice(i, 1, {
                                                    isImage:false,
                                                    isSelect: false,
                                                    isPreviewOpen: false,
                                                    image: {}
                                                  })
                                            }else{
                                                if(images.length ===i+1){
                                                    result.splice(i, 1, {
                                                        isImage:false,
                                                        isSelect: false,
                                                        isPreviewOpen: false,
                                                        image: {}
                                                      })
                                                }else{
                                                    result.splice(i, 1 )
                                                }
                                            }
                                            setImages(result)
                                            callback(result)
                                            
                                        }}><i className='bi bi-x-lg' /></button>
                                    </div>
                                </div> : null}
                        </div>
                        <Dialog header="Preview" visible={item.isPreviewOpen} onHide={() => {
                            const result = Array.from(images)
                            result.splice(i, 1, { ...item, isPreviewOpen: false })
                            setImages(result)
                        }} dismissableMask>
                            <ImagePreview className='image-body' item={item}></ImagePreview>
                        </Dialog>
                    </ImageUploader>
                )
                
            }else{
                return null
            }
           
        })}
        </div>

      {images.length>1?
      <div className='d-flex'>
        <Button label="순서변경" className="p-button-raised p-button-text p-button-plain" onClick={()=>setIsOrderChangeOpen(true)}/>
        <Dialog header="순서변경" dismissableMask visible={isOrderChangeOpen} onHide={()=>setIsOrderChangeOpen(false)} >
            <DataTable value={files} onRowReorder={(e)=>{
                    callback(e.value)
                 if(e.value.length===max){
                    setImages(e.value)
                 }else{
                    setImages([...e.value,{
                        isSelect:false,
                        isPreviewOpen:false,
                        image:{}
                    }])
                 }
                
            }} >
                <Column header="파일명" body={(row)=>{
                    return row.image.name
                }}/>
                <Column header="사이즈" body={(row)=>{
                    return row.image.size
                }}/>
                 <Column rowReorder style={{width: '3em'}} />
            </DataTable>
        </Dialog>
        </div>:null}
    </div>
  )
}

export default ProductImageUploader

ProductImageUploader.propTypes = {
    callback:PropTypes.func,
    multiple:PropTypes.bool,
    max:PropTypes.number,
    accept:PropTypes.string,
    files:PropTypes.array
};
ProductImageUploader.defaultProps = {
    callback:()=>{
        console.log('not callback function')
    },
    multiple:false,
    max:9,
    accept:'image/*',
    files:[{
        isSelect:false,
        isPreviewOpen:false,
        image:{}
    }]
};