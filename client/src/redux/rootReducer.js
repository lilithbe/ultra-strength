import { combineReducers } from 'redux'
import authReducer from './auth/Reducer'
import categoryReducer from './category/Reducer'
import configReducer from './config/Reducer'
import productReducer from './product/Reducer'
const rootReducer = combineReducers({
  auth:authReducer,
  category:categoryReducer,
  config:configReducer,
  product:productReducer,
})

export default rootReducer