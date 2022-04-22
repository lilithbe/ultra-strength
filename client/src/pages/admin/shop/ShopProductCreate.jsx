import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'
import { Accordion, AccordionTab } from 'primereact/accordion';
import {useHistory} from 'react-router-dom'
import React,{ useEffect, useState } from 'react'
import { PRODUCT_CATEGORY_LIST, PRODUCT_CREATE } from '../../../common/path'
import { postApi } from '../../../lib/axios'
import ProductFileUpload from '../../../components/form/ProductFileUpload'
import OptionTable from '../../../components/form/OptionTable'
import ProductInfo from '../../../components/form/ProductInfo'
import { confirmDialog } from 'primereact/confirmdialog'; //
import {connect} from 'react-redux'
import { setProduct } from '../../../redux';
import ProductEditor from '../../../components/containers/ProductEditor';
import LoadingSpinner from '../../../components/LoadingSpinner';
const ShopProductCreate = ({product,setProduct}) => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [categoryList, setCategoryList] = useState([])
  const newFileInit={
    mainLabel:'',
    subLabel:'',
    modelLabel:'',


    label:'',
    categoryId:"",
    badge:['new'],
    price:0,
    count:0,
    delivery:'이용자선택',
    installType:'이용자선택',

    images:[],
    mainImageIndex:0,


    isSelectOption: true,  
    selectOptionType: 'single',
    selectOptionCount: 1,
    selectOptionInfomation: [
      { label: '', value: '', colors: [], optionType: '', sizes: [], count: 0, price: 0 },
    
    ],
   
    selectSingleOptionList: [],
    selectMultipleOptionList: [],
    //입력형 옵션
    isInputOption: false,
    inputOptions: [{ label: '', isUser: true }],
    inputOptionCount: 1,
    inputOptionList:[],

    productInfo:'',
    productInfoFiles:[],    

   
    isRotate:false,
    rotate:'none',
    rotateId:'none',

    isUsed:true,
  }
  const [newProductState, setNewProductState] = useState(newFileInit)

  
  useEffect(() => {
    postApi(setIsLoading, PRODUCT_CATEGORY_LIST, (res) => {
      if (res.data.status) {
        setCategoryList(res.data.data)
      }
    })
    return () => {
      setCategoryList([])
    }
  }, [])



  return (
  <div>
      <LoadingSpinner loading={isLoading}/>
    <ProductEditor 
    product={newProductState} 
    setProduct={setNewProductState} 
    categoryList={product.category} 
    editorUrl={PRODUCT_CREATE} 
    setRedux={setProduct} 
    allList={product.allList} 
    saveType={"create"}/>
  </div>
   
  )
}

const mapStateToProps = (state)=>{
return {
  product:state.product
}
}
const mapDispatchToProps = (dispatch)=>{
return {
  setProduct:(data)=>dispatch(setProduct(data))
}
}
export default connect(mapStateToProps,mapDispatchToProps)(ShopProductCreate)
