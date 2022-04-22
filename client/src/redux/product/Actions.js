import {
  PRODUCT_LOADING,
  PRODUCT_UPDATE,
  PRODUCT_FAIL,
} from './Types'



export const setProduct = (data) => {
  return (dispatch) => {
    try {
      dispatch(productLoading(true))
      dispatch(productUpdate(data))
      dispatch(productLoading(false))
    } catch (error) {
      dispatch(productLoading(false))
      dispatch(productFail(error))
    }
  }
}

export const productLoading = (data) => {
  return {
    type: PRODUCT_LOADING,
    payload: data,
  }
}
export const productUpdate = (data) => {

  return {
    type: PRODUCT_UPDATE,
    payload: data,
  }
}
export const productFail = (data) => {
  return {
    type: PRODUCT_FAIL,
    payload: data,
  }
}

