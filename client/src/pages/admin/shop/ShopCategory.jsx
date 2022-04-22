import {connect} from 'react-redux'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import React, {  useState } from 'react'
import { PRODUCT_CATEGORY_CREATE , PRODUCT_CATEGORY_DELETE} from '../../../common/path'
import { postApi } from '../../../lib/axios'
import { setProduct } from '../../../redux'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { InputTextarea } from 'primereact/inputtextarea';
import { Image } from 'primereact/image'
import { useHistory } from 'react-router-dom'
const ShopCategory = ({setProduct,category,allList}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isNewCategoryOpen, setIsNewCategoryOpen] = useState(false)
    const init={
        label:'',
        size:'',
        description:'',
    }
    const [newCategotyState, setNewCategotyState] = useState(init)
    const newCategorySaveHandler = (e) => { 
        e.preventDefault()
        postApi(setIsLoading , PRODUCT_CATEGORY_CREATE , (res)=>{
       
            if(res.data.status){
                setProduct({category:[...category,res.data.data]})
                setIsNewCategoryOpen(false)
                setNewCategotyState(init)
            }
        },newCategotyState)
     }
     const deleteHandler = (row,col) => { 
        
        postApi(setIsLoading , PRODUCT_CATEGORY_DELETE , (res)=>{     
            console.log(res)  
            if(res.data.status){
                const result=Array.from(category)
                result.splice(col.rowIndex,1)
                console.log(col.rowIndex)
                setProduct({category:result})
            }
        },row)
      }
  return (
    <div>
    <LoadingSpinner loading={isLoading}/>
        <h1 className='text-900 font-bold text-6xl'><i className='bi bi-list-check'/>Shop Category</h1>
        <div>
            <Button className='p-button-sm' label="new Category" icon="bi bi-plus" onClick={()=>setIsNewCategoryOpen(true)} />
        </div>
        <div className='my-1'>
           <DataTable value={category} size="small" loading={isLoading}>
               <Column field='label' header="label"></Column>
               <Column field='description' header="Desc"></Column>
               <Column body={(row,col)=>{
                   const useProducts = allList.filter(f=>f.categoryId===row._id)
                   return <UseProductList cnt={useProducts.length} useProducts={useProducts} />
               }} header="use product count"></Column>


               <Column body={(row,col)=>{
                   const productActiveIndex = allList.findIndex(f=>f.categoryId===row._id)
                   return <Button icon="bi bi-trash" disabled={productActiveIndex===-1?false:true} onClick={()=>{deleteHandler(row,col)}}/>
               }} header="Delete"></Column>
           </DataTable>
        </div>


          <Dialog header="New Category Created" visible={isNewCategoryOpen} onHide={() => setIsNewCategoryOpen(false)}>
              <form onSubmit={newCategorySaveHandler}>
                  <label htmlFor='newcategory-label'>Label</label>
                  <InputText required id="newcategory-label" className='p-inputtext-sm w-100 mb-2' value={newCategotyState.label} onChange={(e) => { setNewCategotyState({ ...newCategotyState, label: e.target.value }) }} />
                  <label htmlFor='newcategory-description'>Description</label>
                  <InputTextarea id="newcategory-description" className='w-100 mb-2' rows={3} value={newCategotyState.description} onChange={(e) => { setNewCategotyState({ ...newCategotyState, description: e.target.value }) }} />
                  <Button label="Save" icon="bi bi-save" className='p-button-sm w-100' type="submit" />
              </form>
          </Dialog>
    </div>
  )
}

const mapStateToProps = (state)=>{
return {
    category:state.product.category,
    allList:state.product.allList,
}
}
const mapDispatchToProps = (dispatch)=>{
return {
    setProduct:(data)=>dispatch(setProduct(data))
}
}
export default connect(mapStateToProps,mapDispatchToProps)(ShopCategory)

const UseProductList = ({cnt, useProducts}) => { 
    const history = useHistory()
    const [isListOpen, setIsListOpen] = useState(false)
    return (
        <div>
            <Button label={cnt===0?'none':cnt} disabled={cnt===0?true:false} onClick={()=>{setIsListOpen(true)}} />
            <Dialog header="카테고리 적용 제품" visible={isListOpen} onHide={()=>{setIsListOpen(false)}}>

                     <DataTable  value={useProducts} size="small" className='header-center body-center' responsiveLayout="scroll">

        <Column className='text-center' header="이미지" headerStyle={{ width: "110px" }} body={(row) => {
          if(row.images.length>0){
            return (<Image src={`${process.env.REACT_APP_DOMAIN}${row.images[row.mainImageIndex].src}`} width={100} height={100} imageStyle={{ objectFit: 'cover', objectPsition: 'center' }} />)
          }else{
            return null
          }
      
        }} />

        <Column body={(row) => {
          return (row.images.length)
        }} header="이미지갯수" className='text-center' />

        <Column field='label' header="제품명" className='text-center'  />
        <Column className='text-center' header="360도" body={(row) => {
          return row.isRotate ? <div>
           <div>사용</div>
            <div>{row.rotateName}</div>
          </div> : '미사용'
        }} />
        <Column className='text-center' header="게시유무" body={(row) => {
          return row.isUsed ? '게시중' : '게시정지'
        }} />



        <Column className='text-center' header="Setting" body={(row,col) => {
          return <div>
            <Button icon="bi bi-pen"  onClick={() => { history.push(`/admin/shop/product/update/${row._id}`) }} />
          </div>
        }} />
      </DataTable>
            </Dialog>
        </div>
    )
 }
