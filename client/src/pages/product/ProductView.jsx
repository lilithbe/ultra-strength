import { Image } from 'primereact/image'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { PRODUCT_GET_ITEM } from '../../common/path'
import { postApi } from '../../lib/axios'
import { TabView, TabPanel } from 'primereact/tabview';
import { Dialog } from 'primereact/dialog'
import { Carousel } from 'primereact/carousel';
import parse from 'html-react-parser'
import { Toast } from 'primereact/toast'
import { Card } from 'primereact/card'
import {Dropdown } from 'primereact/dropdown'
import ProductImage from '../../components/containers/ProductImage'
import { setProduct } from '../../redux'
import { connect } from 'react-redux'
import { setComma } from '../../lib/comma'
import View360 from '../../components/360view/View360'
import TestView360 from '../../components/360view/TestView360'
const ProductView = ({ setProduct, myCartList, allList,categoryList }) => {
  const toast = useRef(null)
  const history =useHistory()
  const { category, id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [isRotateOpen, setIsRotateOpen] = useState(false)
  const productInit = {
    label: '',
    categoryId: '',

    price: 0,
    count: 0,
    delivery: '',
    installType: '',

    productInfo: '',

    // 선택형 옵션
    isSelectOption: true,
    selectOptionType: '',
    selectOptionCount: 1,
    selectOptionInfomation: [],

    selectSingleOptionList: [],
    selectMultipleOptionList: [],
    //입력형 옵션
    isInputOption: false,
    inputOptions: [],
    inputOptionCount: 1,
    inputOptionList: [],

    images: [],
  }
  const [productState, setProductState] = useState(productInit)



  useEffect(() => {
    if (allList.length > 0) {
      setProductState(allList.filter(f => f._id === id)[0])
    }
    return () => {
      setProductState(productInit)
    }
  }, [id, allList])

  return (
 <div className="container-filud py-5">

     

        <div className='flex justify-content-center'>
          {categoryList.map((item, i) => {
            return (
              <button key={i} className={`sm:w-full md:w-auto md:mx-1 btn ${item._id === category ? 'btn-info' : 'btn-primary'}`}
                onClick={(e) => {
                  e.preventDefault()
                  history.push(`/product/list/${item.label}`)
                }}
              >{item.label}</button>
            )
          })}

        </div>

        <div className="container mt-lg-5 mt-sm-2">
          <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 600 }}>
            <h1 className="text-uppercase">{productState.mainLabel}</h1>
            <h3 className="">{productState.subLabel}<strong className='sm:ml-0 lg:ml-3'>{productState.modelLabel}</strong></h3>
          </div>
        </div>

       


      <div className="container pb-1">
      {productState.isRotate ?
       <Card className='my-5 bg-white text-gray-900 flex justify-content-center'> <View360 url={`${process.env.REACT_APP_DOMAIN}/rotate/${productState.rotate}`} fullscreen isWheelZoom/></Card> :
        null}

    <div className="container">
      <div className="row g-0">
        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
          <div className="h-100 d-flex flex-column justify-content-center p-1">
            {productState.images.length > 0 ?
              <ProductCarousel items={productState.images} /> : null}
          </div>
        </div>
        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
          <ProductSemiInfo product={productState} toast={toast} myCartList={myCartList} setProduct={setProduct} />
        </div>
      </div>
    </div>
    <div className="container">
      <TabView>
        <TabPanel header="Detail" >
          <div className='sun-editor-editable '>
            <div className='text-center'>
              {parse(productState.productInfo)}
            </div>
          </div>
        </TabPanel>
        <TabPanel header="Review">
          Review
        </TabPanel>
      </TabView>

      {/**/}


    </div>

    <Toast ref={toast} />
  </div>
 </div>
  )
}
const mapStateToProps = (state) => {
  return {
    allList: state.product.allList,
    myCartList: state.product.myCartList,
    categoryList: state.product.category
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setProduct: (data) => dispatch(setProduct(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductView)

const ProductCarousel = ({ items }) => {

  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '600px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  const productTemplate = (product) => {
    return (
      <div className="product-item">
        <ProductImage src={`${process.env.REACT_APP_DOMAIN}${product.src}`} maxHeight={"600px"} height="400px" />
      </div>
    );
  }

  return (
    <div className='product-carousel'>
      <Carousel value={items} circular numVisible={1} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
    </div>
  )
}

const ProductSemiInfo = ({ product, toast, setProduct, myCartList }) => {
  const history = useHistory()
  const [options, setOptions] = useState([])
  const [isInquiry, setIsInquiry] = useState(false)
  const [settingCart, setSettingCart] = useState({
    _id: product._id,
  })
  const [isCart, setIsCart] = useState(false)
  const [cartActiveIndex, setCartActiveIndex] = useState(null)
  useEffect(() => {
    const cartIndex = myCartList.findIndex(f => f._id === product._id)
    if (cartIndex !== -1) {
      setIsCart(true)
      setCartActiveIndex(cartIndex)
      setSettingCart({ ...settingCart, ...myCartList[cartIndex] })
    }

    return () => {
      setIsCart(false)
      setCartActiveIndex(null)
      setSettingCart({
        _id: product._id,
      })
    }
  }, [product])

  // const isCart = localStorage.getItem('CART_OBJECT')
  const addToCartHandler = (e) => {
    e.preventDefault()
    if (isCart) {

      const result = Array.from(myCartList)
      result.splice(cartActiveIndex, 1, { ...product, myOptions: options })
      localStorage.setItem('CART_OBJECT', JSON.stringify(result))
      setProduct({ myCartList: result })
      toast.current.show({ severity: 'success', summary: 'Success Message', detail: '카트에 담긴 상품을 업데이트 하였습니다.' });

    } else {


      const result = Array.from(myCartList)
      result.push({ ...product, myOptions: options })
      localStorage.setItem('CART_OBJECT', JSON.stringify(result))
      setProduct({ myCartList: result })
      setIsCart(true)
      setCartActiveIndex(myCartList.length)
      toast.current.show({ severity: 'success', summary: 'Success Message', detail: '새로운 상품을 카트에 업데이트 하였습니다.' });
    }
    history.push('/product/cart')

  }

  const deliveryOptions = [
     {label:'방문수령'},
     {label:'화물배송'},
     {label:'택배배송'},
   ]
   const installTypeOptions=[
    {label:'직접설치'},
    {label:'기사방문 설치'},
   ]


  return (
    <div className=' mb-sm-3 mb-lg-5'>

      <h3 className='pl-2 mb-3'>{product.label}</h3>
      <div className='row'>
        <div className='col-lg-3 col-sm-4 text-right'>Price : </div>
        <div className='col-lg-9 col-sm-8'> &#8361; {setComma(product.price)}</div>

        <div className='col-lg-3 col-sm-4 text-right'>Delivery : </div>
        <div className='col-lg-9 col-sm-8'>
          {product.delivery==='이용자선택'?
           <Dropdown className='p-inputtext-sm ' options={deliveryOptions} optionValue={'label'}/>:
           product.delivery}
         
        </div>

        <div className='col-lg-3 col-sm-4 text-right'>Install : </div>
        <div className='col-lg-9 col-sm-8'>
        {product.installType==='이용자선택' || product.installType==='설치불필요' ?
           <Dropdown  options={installTypeOptions} optionValue={'label'}/>:
           product.installType}
         </div>

        <div className='col-lg-3 col-sm-4 text-right'>Options : </div>
        <div className='col-lg-9 col-sm-8'><OptionSelecter product={product} options={options} setOptions={setOptions} toast={toast} /></div>
      </div>

      <div className='btn-group w-100'>
        <button className='btn btn-outline-primary' onClick={addToCartHandler}> <i className='bi bi-cart' />{isCart ? 'Update' : 'Add'}  To Cart</button>
        {/* <button className='btn btn-outline-info' onClick={(e)=>{
          e.preventDefault()
          setIsInquiry(true)
        }}> <i className='bi bi-cart' /> 문의하기</button> */}
      </div>
      <Dialog header="제품문의" visible={isInquiry} onHide={() => setIsInquiry(false)}>
        <div className='card p-1 bg-dark' style={{ minWidth: "600px" }}>
          <div className='card-header p-0'>
            <input className='form-control' value={`제품명 : ${product.label}`} readOnly />
          </div>
          <div className='card-header p-0'>
            <input className='form-control' placeholder='Name..' />
          </div>
          <div className='card-header p-0'>
            <input className='form-control' placeholder='Your Mobile or Email..' />
          </div>
          <div className='card-body p-0'>
            <textarea className='form-control' rows={7}></textarea>
          </div>
          <div className='card-footer p-1'>
            <button className='btn btn-primary btn-sm'>Submit</button>
          </div>
        </div>
      </Dialog>

    </div>
  )
}

const OptionSelecter = ({ product, toast, options, setOptions }) => {
  const [count, setCount] = useState(0)
  const [multipleOptions, setMultipleOptions] = useState([{ value: '', type: '' }, { value: '', type: '' }, { value: '', type: '' }])
  const [currentOption, setCurrentOption] = useState({
    code: "",
    count: 0,
    id: "",
    isUsed: false,
    price: 0,
    value_1: "",
    value_2: "",
    value_3: "",
  })

  useEffect(() => {
    setMultipleOptions(() => {
      const result = []
      for (let i = 0; i < product.selectOptionInfomation.length; i++) {
        result.push({ value: '', type: '' })
      }
      return result
    })
  }, [product.selectOptionInfomation])

  useEffect(() => {
    console.log(multipleOptions)
  }, [multipleOptions])


  useEffect(() => {
    console.log(options)
  }, [options])

  useEffect(() => {
    console.log('currentOption', currentOption)
  }, [currentOption])
  return (
    <div>
      {product.isSelectOption ?
        product.selectOptionType === 'multiple' ?
          product.selectOptionInfomation.map((item, i) => {
            return (
              <div key={i} className="my-2">
                <div>{item.label}</div>
                <div className='btn-group'>
                  {item.optionType === 'string' ?
                    item.value.split(',').map((val, ii) => {
                      return (
                        <button key={ii}
                          className={`btn  btn-sm ${multipleOptions[i] !== undefined ? multipleOptions[i].value === val ? 'btn-primary' : 'btn-outline-primary' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();

                            const result = Array.from(multipleOptions)
                            result.splice(i, 1, { value: val, type: item.optionType, })

                            let str = ''
                            for (let li = 0; li < result.length; li++) {
                              const r = result[li];
                              str += `"value_${li + 1}":"${r.value}",`
                            }
                            const optionIndex = product.selectMultipleOptionList.findIndex(f => JSON.stringify(f).match(new RegExp(str, "gi")))
                            if (optionIndex !== -1) {
                              setCurrentOption(product.selectMultipleOptionList[optionIndex])
                            }
                            setMultipleOptions(result)
                          }} >{val}</button>
                      )
                    }) : item.colors.map((color, ii) => {
                      return (
                        <button key={ii} className={`btn  btn-sm ${multipleOptions[i] !== undefined ? multipleOptions[i].value === color ? 'border border-info border border-2' : 'btn-outline-primary' : ''}`}
                          style={{ backgroundColor: color, width: "30px", height: "30px" }}
                          onClick={(e) => {
                            e.preventDefault();
                            const result = Array.from(multipleOptions)
                            result.splice(i, 1, { value: color, type: item.optionType, })
                            let str = ''
                            for (let li = 0; li < result.length; li++) {
                              const r = result[li];
                              str += `"value_${li + 1}":"${r.value}",`
                            }
                            const optionIndex = product.selectMultipleOptionList.findIndex(f => JSON.stringify(f).match(new RegExp(str, "gi")))
                            if (optionIndex !== -1) {
                              setCurrentOption(product.selectMultipleOptionList[optionIndex])
                            }
                            setMultipleOptions(result)
                          }} ></button>
                      )
                    })}
                </div>
              </div>
            )
          }) : product.selectSingleOptionList.map((item, i) => {
            return (
              <div key={i}>{item.label}-{item.value}</div>
            )
          }) : null}



      {product.isSelectOption ?
        product.selectOptionType === 'multiple' ?
          <div>
            {currentOption.id !== '' ?
              currentOption.count !== 0 ?
                <div>

                  <button
                    className={`btn btn-outline-primary btn-sm`}
                    onClick={(e) => {
                      e.preventDefault()
                      const nonIndex = multipleOptions.findIndex(f => f.value === '')
                      if (nonIndex === -1) {
                        const overlapOptionCnt = options.filter(f => JSON.stringify(f.value) === JSON.stringify(multipleOptions)).length
                        if (overlapOptionCnt === 0) {
                          setOptions([...options, { count: 1, optionData: currentOption, value: multipleOptions }])
                          setCurrentOption({
                            code: "",
                            count: 0,
                            id: "",
                            isUsed: false,
                            price: 0,
                            value_1: "",
                            value_2: "",
                            value_3: "",
                          })
                          setMultipleOptions(() => {
                            const result = []
                            for (let i = 0; i < product.selectOptionInfomation.length; i++) {
                              result.push({ value: '', type: '' })
                            }
                            return result
                          })
                          setCount(0)
                        } else {
                          toast.current.show({ severity: 'info', summary: 'Error Message', detail: '이미 선택된 옵션입니다. 수량을 조절하세요.' });
                        }
                      } else {
                        if (nonIndex !== -1) {
                          toast.current.show({ severity: 'info', summary: 'Error Message', detail: `${product.selectOptionInfomation[nonIndex].label} 옵션을 설정하세요` });
                        }
                      }




                    }}>적용</button>
                </div> :
                <div>
                  해당 제품은 품절되었습니다. 다른 옵션을 선택하세요.
                </div> : null}


          </div> :
          <button
            className={`btn btn-outline-primary btn-sm`}
            onClick={(e) => {
              e.preventDefault()
              //  싱글
              console.log(options)

            }}>적용</button>
        : product.isInputOption ?
          'input text + 버튼' :
          '갯수+버튼'}



      {/* Select Options */}
      <div className='py-3' >
        <ul className='list-group '>
          {options.map((item, i) => {

            return <li key={i} className="list-group-item py-0 bg-secondary">
              <div className='d-flex justify-content-between'>
                {item.value.map((vItem, ii) => {
                  return (<span key={ii} className="py-2 text-white">{vItem.type === 'color' ? <button style={{ backgroundColor: vItem.value, width: "25px", height: '25px' }}></button> : ` ${vItem.value} `}</span>)
                })}
                <input value={item.count} type="number" onChange={(e) => {
                  e.preventDefault()
                  const result = Array.from(options)
                  let value = e.target.value
                  const maxCount = item.optionData.count
                  if (typeof (value) !== 'number') {
                    value = Number(value)
                  }
                  if (maxCount < value || value < 0) {
                    result.splice(i, 1, { ...item, count: 1 })
                    toast.current.show({ severity: 'info', summary: 'Error Message', detail: `현재 재고량은 ${maxCount} 입니다. 이하로 설정하세요.` });
                  } else {
                    result.splice(i, 1, { ...item, count: value })
                  }
                  setOptions(result)
                }} className="form-control form-control-sm w-50" />
                <button className='btn btn-sm btn-outline-info' onClick={(e) => {
                  e.preventDefault()
                  const result = Array.from(options)
                  result.splice(i, 1)
                  setOptions(result)
                }} ><i className='bi bi-x' /></button>
              </div>
            </li>
          })}
        </ul>
      </div>


    </div>
  )
}