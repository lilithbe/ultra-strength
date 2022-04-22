import { connect } from 'react-redux'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Image } from 'primereact/image'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import React, { useEffect, useState } from 'react'
import { PRODUCT_DELETE, PRODUCT_UPDATE } from '../../../common/path'
import { postApi } from '../../../lib/axios'
import { useHistory } from 'react-router-dom'
import { Card } from 'primereact/card'
import { setProduct } from '../../../redux'
import { setComma } from '../../../lib/comma'
import { InputText } from 'primereact/inputtext'
import {InputNumber} from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'
import LoadingSpinner from '../../../components/LoadingSpinner'

const ShopProductList = ({ product, setProduct }) => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)

  const onRowEditComplete = (e) => {
    let _product = [...product.allList];
    let { newData, index } = e;

    _product[index] = newData;
    postApi(setIsLoading, PRODUCT_UPDATE, (res) => {
      console.log(res)
      if (res.data.status) {
        console.log(newData)
        setProduct({ allList: _product });
      }
    }, newData)

  }

  const textEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  }

  const categoryEditor = (options) => {
    return <Dropdown type="text" options={product.category} optionLabel="label" optionValue='_id' value={options.value} onChange={(e) => options.editorCallback(e.value)} />;
  }
  const counterEditor = (options) => {
    const pd = options.rowData
    if (pd.isSelectOption === true && pd.selectOptionType === "multiple") {
      if (pd.selectMultipleOptionList.length !== 0) {
        return (
          <div>
            맵함수 사용
          </div>
        )
      } else {
        return (
          <Button label="옵션 완성" onClick={() => { history.push(`/admin/shop/product/update/${pd._id}`) }} />
        )
      }

    } else {
      return (
        <div>
          넘버링 한개
        </div>
      )
    }

  }

  const priceEditor = (options) => { 
    return <InputNumber value={options.value} onChange={(e) => {
      options.editorCallback( e.value)
    }} />;
   }
  const tableHaeder = () => {
    return (<div className='flex justify-content-between'>
      <Button className='p-button-sm' label="New Product" icon="bi bi-plus" onClick={() => history.push('/admin/shop/product/create')} />
    </div>)
  }
  return (
    <div>
         <LoadingSpinner loading={isLoading}/>
      <h1 className='text-900 font-bold text-6xl'><i className='bi bi-list-check' />Shop Product</h1>

      <DataTable loading={isLoading} header={tableHaeder} value={product.allList} size="small" className='header-center body-center' editMode="row" dataKey="_id" onRowEditComplete={onRowEditComplete} responsiveLayout="scroll">

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

        <Column field='mainLabel' header="메인제품명" className='text-center' editor={(options) => textEditor(options)} />
        <Column field='subLabel' header="서브제품명" className='text-center' editor={(options) => textEditor(options)} />
        <Column field='modelLabel' header="모델명" className='text-center' editor={(options) => textEditor(options)} />

        <Column className='text-center' field='categoryId' header="카테고리" body={(row) => {
          return (product.category.filter(f => f._id === row.categoryId)[0].label)
        }} editor={(options) => categoryEditor(options)} />

        <Column field='count' header="재고량" className='text-center' editor={(options) => counterEditor(options)} />

        <Column header="기본가격" className='text-center'
          body={(row) => {
            return setComma(row.price)
          }}

          editor={(options) => priceEditor(options)} 
        />


        <Column header="입력형 옵션" className='text-center'
          body={(row) => {
            return row.isInputOption ? '사용' : '미사용'
          }}
        />
        <Column header="선택형 옵션" className='text-center'
          body={(row) => {
            return row.isSelectOption ? '사용' : '미사용'
          }}
        />

        <Column className='text-center' header="360도" body={(row) => {
          return row.isRotate ? <div>
            <p>사용</p>
            <div>{row.rotateName}</div>
          </div> : '미사용'
        }} />
        <Column className='text-center' header="게시유무" body={(row) => {
          return row.isUsed ? '게시중' : '게시정지'
        }} />




        <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} header="Edit" bodyStyle={{ textAlign: 'center' }}></Column>

        <Column className='text-center' header="Setting" body={(row,col) => {
          return <div>
            <Button icon="bi bi-trash"  onClick={() => {
              postApi(setIsLoading,PRODUCT_DELETE,(res)=>{
                if(res.data.status){
                  const result = Array.from(product.allList)
                  result.splice(col.rowIndex,1)
                  setProduct({allList:result})
                }
              },row)
            }}/>
            <Button icon="bi bi-pen"  onClick={() => { history.push(`/admin/shop/product/update/${row._id}`) }} />
          </div>
        }} />
      </DataTable>



    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    product: state.product
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setProduct: (data) => dispatch(setProduct(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShopProductList)
