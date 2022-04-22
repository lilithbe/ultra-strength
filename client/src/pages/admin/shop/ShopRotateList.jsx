import React , { useState }from 'react'
import {connect} from 'react-redux'
import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog' 
import {DataTable} from 'primereact/datatable'
import { Column } from 'primereact/column'
import { postApi } from '../../../lib/axios'
import { PRODUCT_ROTATE_CREATE } from '../../../common/path'
import View360 from '../../../components/360view/View360'
import { setProduct } from '../../../redux/product/Actions'
import LoadingSpinner from '../../../components/LoadingSpinner'
const ShopRotateList = ({rotate,setProduct}) => {
    const [isNewRotateOpen, setIsNewRotateOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [newRotateFile, setNewRotateFile] = useState({ })
    const submitHandler = (e) => { 
        e.preventDefault()
        const fomeData = new FormData()
        fomeData.append('rotate',newRotateFile)
        postApi(setIsLoading,PRODUCT_ROTATE_CREATE,(res)=>{
            if(res.data.status){
                setProduct({rotate:[...rotate,res.data.data]})
            }
        },fomeData)
     }
     const [isViewOpen, setIsViewOpen] = useState(false)
     const [currentObject, setCurrentObject] = useState({
         lable:'',
         value:'',
     })
  return (
    <div>
           <LoadingSpinner loading={isLoading}/>
        <h1>Shop Rotate List</h1>
        <Button icon="bi bi-plus" label={"new Add Rotate"} onClick={()=>{setIsNewRotateOpen(true)}}/>
        <DataTable value={rotate} >
        <Column field='label' header="Label"/>
        <Column field='value' header="Value"/>
        <Column field='updatedAt' header="updatedAt"/>
        <Column header="View" body={(row)=>{
            
            return(<Button icon="bi bi-search" lable="view" onClick={()=>{
                setCurrentObject(row)
                setIsViewOpen(true)
            }}/>)
        }}/>
        </DataTable>
        <Dialog header="360 View" visible={isViewOpen} onHide={()=>{setIsViewOpen(false)}}  style={{height:"800px"}}>
      
        <View360 url={`${process.env.REACT_APP_DOMAIN}/rotate/${currentObject.value}`}/>

        
        </Dialog>


          



        <Dialog header="New Add Rotate" visible={isNewRotateOpen} onHide={()=>{setIsNewRotateOpen(false)}}>
           <form onSubmit={submitHandler}>
           <input required type="file" accept='.zip' onChange={(e)=>{
               e.preventDefault()
                const value = e.target.files[0]
                if(value.name.split('.')[1]==='zip'){
                    setNewRotateFile(value)
                }else{
                    console.log('not zip file')
                }
               }} />
               <Button label="Submit"/>
           </form>
        </Dialog>
    </div>
  )
}

const mapStateToProps = (state)=>{
return {
    rotate:state.product.rotate
}
}
const mapDispatchToProps = (dispatch)=>{
return {
    setProduct:(data)=>dispatch(setProduct(data))
}
}
export default connect(mapStateToProps,mapDispatchToProps)(ShopRotateList)