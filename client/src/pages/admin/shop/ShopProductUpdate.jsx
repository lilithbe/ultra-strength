import {connect} from 'react-redux'
import { setProduct } from '../../../redux';
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'
import { Accordion, AccordionTab } from 'primereact/accordion';
import {useHistory , useParams} from 'react-router-dom'
import React,{ useEffect, useState } from 'react'
import { PRODUCT_ALLUPDATE } from '../../../common/path'
import { postApi } from '../../../lib/axios'
import ProductFileUpload from '../../../components/form/ProductFileUpload'
import OptionTable from '../../../components/form/OptionTable'
import ProductInfo from '../../../components/form/ProductInfo'
import { confirmDialog } from 'primereact/confirmdialog'; //
import ProductEditor from '../../../components/containers/ProductEditor';
import LoadingSpinner from '../../../components/LoadingSpinner';

const ShopProductUpdate = ({product,setProduct}) => {
  const {id} =useParams()
  const newFileInit={
    mainLabel:'',
    subLabel:'',
    modelLabel:'',
    
    label:'',
    categoryId:"",
    badge:[],
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
  const [updateProduct, setUpdateProduct] = useState(newFileInit)
  useEffect(() => {
    if(product.allList.length>0){
      const data= product.allList.filter(f=>f._id===id)[0]
      if(data){
        setUpdateProduct(data) 
      }
    }
    return () => {
      setUpdateProduct(newFileInit) 
    }
   
  }, [product.allList , id])
  
  return (
   <div>

 <ProductEditor 
    product={updateProduct} 
    setProduct={setUpdateProduct} 
 categoryList={product.category} 
 editorUrl={PRODUCT_ALLUPDATE} 
 setRedux={setProduct} 
 allList={product.allList}
 saveType={"update"} />
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
export default connect(mapStateToProps,mapDispatchToProps)(ShopProductUpdate)