import {
  PRODUCT_LOADING,
  PRODUCT_UPDATE,
  PRODUCT_FAIL,
} from './Types'
const initialState = {
  isLoading: false, 
  failData: null, 
  category:[],
  allList:[],
  currentClickItem:{},
  myCartList:[],
  rotate:[],
  images:[],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case PRODUCT_UPDATE:
      return {
        ...state,
        ...action.payload,
      }
    case PRODUCT_FAIL:
      return {
        ...state,
        failData: action.payload,
      }

    default: return state
  }
}

export default reducer
