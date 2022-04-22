import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'
import { Accordion, AccordionTab } from 'primereact/accordion';
import React, { useState } from 'react'
import { postApi } from '../../lib/axios'
import ProductFileUpload from '../form/ProductFileUpload'
import OptionTable from '../form/OptionTable'
import ProductInfo from '../form/ProductInfo'
import { confirmDialog } from 'primereact/confirmdialog'; //
import {useHistory} from 'react-router-dom'
import { SelectButton } from 'primereact/selectbutton';
import { Toast } from 'primereact/toast';
import LoadingSpinner from '../LoadingSpinner';
import styled from 'styled-components';
import { useRef } from 'react';
const SelectButtonStyle = styled(SelectButton)`
  .p-highlight{
    background-color:#cf1fcf!important;
  }
`
const ProductEditor = ({product,setProduct, categoryList ,editorUrl ,setRedux, allList,saveType}) => {
    const history = useHistory()
    const toast = useRef(null)
    const [activeIndex, setActiveIndex] = useState([2])
    const [isLoading, setIsLoading] = useState(false)
    const deliveryOptions = [
        {label:'이용자선택'},
         {label:'방문수령'},
         {label:'화물배송'},
         {label:'택배배송'},
       ]
       const installTypeOptions=[
        {label:'이용자선택'},
        {label:'설치불필요'},
        {label:'직접설치'},
        {label:'기사방문 설치'},
       ]
       const badgeOptions=[
         {label:'new',color:'primary'},
         {label:'hit',color:'hit'},
         {label:'재입고',color:'info'},
         {label:'재요청',color:'help'},
       ]
       const submitHandler =async (e) => { 
         e.preventDefault()
        await postApi(setIsLoading,editorUrl,(res)=>{
     
          if(res.data.status){
            if(saveType==='create'){
              setRedux({allList:[...allList,res.data.data]})
            }else{
              console.log(res)
              const result = Array.from (allList)
              const productIndex = result.findIndex(f=>f._id=== product._id)
              if(productIndex!== -1){
                result.splice(productIndex , 1 ,res.data.data)
              }
              setRedux({allList:result})
            }
        
            confirmDialog({
              message: res.data.message,
              header: 'Product storage success',
              icon: 'pi pi-exclamation-triangle',
              acceptLabel:'go to list',
              rejectLabel:'go to product view',
              accept: () => history.push('/admin/shop/product/list'),
              reject: () => history.push(`/product/view/${res.data.data.categoryId}/${res.data.data._id}`)
          });
          }else{
            confirmDialog({
              message: res.data.message,
              header: 'Product storage error!',
              icon: 'pi pi-exclamation-triangle',
              acceptLabel:'항목열기',
              accept: () => {setActiveIndex([res.data.activeIndex])},
              reject: () => {}
          });
          }
           
         },product)
        }


    return (
        <div>
               <LoadingSpinner loading={isLoading}/>
               <Toast ref={toast}/>
          <h1 className='text-900 font-bold text-6xl'><i className='bi bi-list-check' />Shop Product</h1>
         <form onSubmit={submitHandler} encType='multipart/form-data' >
         <Accordion activeIndex={activeIndex} multiple setActiveIndex={setActiveIndex}>
            <AccordionTab header="Product Category">
            <div>
            <div>카테고리 선택</div>
              <Dropdown value={product.categoryId} options={categoryList} optionValue="_id" onChange={(e) => { setProduct({ ...product, categoryId: e.value }) }} />
            </div>
             <div>
             <div>뱃지 선택</div>
              <SelectButtonStyle className={"p-buttonset-help"} value={product.badge} options={badgeOptions} onChange={(e) => { 
                 setProduct({ ...product, badge: e.value })
               }}  optionValue="label" multiple />
             </div>
            </AccordionTab>
            <AccordionTab header="Product Name">
              <div>
              <label htmlFor='product-main-label' className='w-full'>Main Label</label>
              <InputText  id="product-main-label" className='p-inputtext-sm w-50' value={product.mainLabel}  onChange={(e) => { setProduct({ ...product, mainLabel: e.target.value }) }} />
              </div>

              <div>
              <label htmlFor='product-sub-label' className='w-full'>Sub Label</label>
              <InputText  id="product-sub-label" className='p-inputtext-sm w-50' value={product.subLabel}  onChange={(e) => { setProduct({ ...product, subLabel: e.target.value }) }} />
              </div>

              <div>
              <label htmlFor='product-model-label' className='w-full'>Model Label</label>
              <InputText  id="product-model-label" className='p-inputtext-sm w-50' value={product.modelLabel}  onChange={(e) => { setProduct({ ...product, modelLabel: e.target.value }) }} />
              </div>


              
            </AccordionTab>
            <AccordionTab header="Product Images">
              <ProductFileUpload product={product} setProductUpdata={setProduct}/>
            </AccordionTab>
            <AccordionTab header="Product Price">
            <InputNumber id="new-product-name" className='p-inputtext-sm ' value={product.price}  onChange={(e) => { setProduct({ ...product, price: e.value }) }} />
            </AccordionTab>
            <AccordionTab header="Product Count">
            <InputNumber disabled={product.selectOptionType==="multiple"?true:false}  id="new-product-name" className='p-inputtext-sm ' value={product.count}  onChange={(e) => { setProduct({ ...product, count: e.value }) }} />
            </AccordionTab>
            <AccordionTab header="Product Delivery">
            <Dropdown value={product.delivery} options={deliveryOptions} optionValue="label" onChange={(e) => { setProduct({ ...product, delivery: e.value }) }} />
            </AccordionTab>
            <AccordionTab header="Product Install">
            <Dropdown value={product.installType} options={installTypeOptions} optionValue="label" onChange={(e) => { setProduct({ ...product, installType: e.value }) }} />
            </AccordionTab>
    
            <AccordionTab header="Product Options">
            <OptionTable product={product} setProduct={setProduct}/>
            </AccordionTab>
    
            <AccordionTab header="Product Detail Infomation">
                <ProductInfo product={product} setProduct={setProduct}/>
            </AccordionTab>
          </Accordion>
          <Button type="submit" label="Create Product"/>
         </form>
      
    
    
       
        </div>
      )
}

export default ProductEditor