import {
  CATEGORY_LOADING,
  CATEGORY_UPDATE,
  CATEGORY_FAIL,
} from './Types'



export const setCategory = (data) => {
  return (dispatch) => {
    try {
      dispatch(categoryLoading(true))
      dispatch(categoryUpdate(data))
      dispatch(categoryLoading(false))
    } catch (error) {
      dispatch(categoryLoading(false))
      dispatch(categoryFail(error))
    }
  }
}

export const categoryLoading = (data) => {
  return {
    type: CATEGORY_LOADING,
    payload: data,
  }
}
export const categoryUpdate = (data) => {
  return {
    type: CATEGORY_UPDATE,
    payload: data,
  }
}
export const categoryFail = (data) => {
  return {
    type: CATEGORY_FAIL,
    payload: data,
  }
}

