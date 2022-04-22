import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { PRODUCT_LIST_ALL } from '../../common'
import ProductListPanel from '../../components/containers/ProductListPanel'
import { postApi } from '../../lib/axios'
import { useParams , useHistory } from 'react-router-dom'

const ProductList = ({ categoryList, allList }) => {
  const { category } = useParams()
  const history=useHistory()
  const params = useParams()
  const [productList, setProductList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (category === 'main') {
      setProductList(allList)
    } else {
      const getCategory = categoryList.filter(f => f.label === category)[0]
      const getProducts = allList.filter(f => f.categoryId === getCategory._id)   
      setProductList(getProducts)
    }


    return () => {
      setProductList([])
    }
  }, [category, allList, categoryList])




  return (
    <div>
      <div className="container-filud py-5">
        <div >
          <div className="container">
            <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: 600 }}>
              <h1 className="text-uppercase">Products</h1>

            </div>
          </div>

          <div className='flex justify-content-center'>
            {categoryList.map((item, i) => {
              return (
                <button key={i} className={`sm:w-full md:w-auto md:mx-1 btn ${item.label === category ? 'btn-info' : 'btn-primary'}`}
                onClick={(e)=>{
                  e.preventDefault()
                  history.push(`/product/list/${item.label}`)
                }}
                >{item.label}</button>
              )
            })}

          </div>
          <div className='container '>
            <div className="text-center mx-auto wow fadeInUp my-5" data-wow-delay="0.1s" style={{ maxWidth: 600 }}>
              <p className="d-inline-block bg-secondary text-primary py-1 px-4">{category}</p>

            </div>



            <ProductListPanel title="Products" label="Hot Product" items={productList} />
          </div>


        </div>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    categoryList: state.product.category,
    allList: state.product.allList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductList)