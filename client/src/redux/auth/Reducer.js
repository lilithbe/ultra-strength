import {
  AUTH_LOADING,
  AUTH_UPDATE,
  AUTH_LOGOUT,
  AUTH_FAIL,

} from './Types'
const initialState = {
  isLoading: false, 
  isStart:false,
  failData: null, 
  isLogin: false,
  isAdmin:false,
  isAdminMode:false,
  remember:false,
  lastIp:'',
  exp:0,
  allExp:0,
  userId:'', 
  email:'',
  firstName:'',
  lastName:'',
  fullName:'',
  nickName:'',
  useName:'',
  userImage:'/basic/default/user.jpg',
  userToken:'',
  userData: {},
  created:'',
  updated:'',
  level:0,
  grade:0,
  mobile:'',
  iat:0,
  age:'',
  address: {},
  birthday:'',  
  myPosts:[],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }
    case AUTH_UPDATE:
      return {
        ...state,
        isStart:true,
        isLogin: true,
        ...action.payload,
      }
    case AUTH_LOGOUT:
      localStorage.removeItem("token");
      sessionStorage.removeItem('token');
      return {...initialState, isStart:true}
    case AUTH_FAIL:
      return {
        ...state,
        failData: action.payload,
      }

    default: return state
  }
}

export default reducer
