import React, { useState } from 'react'
import { connect } from "react-redux"
import { Route , Switch,Router } from 'react-router-dom'


import LayoutDivider from './layout/LayoutDivider'

import Main from './pages/Main'
import Notfound from './pages/Notfound'
import About from './pages/About'

import CumunityCreate from './pages/cumunity/CumunityCreate'
import CumunityList from './pages/cumunity/CumunityList'
import CumunityUpdate from './pages/cumunity/CumunityUpdate'
import CumunityView from './pages/cumunity/CumunityView'


import ProductCart from './pages/product/ProductCart'
import ProductList from './pages/product/ProductList'
import ProductView from './pages/product/ProductView'

import Dashboard from './pages/admin/Dashboard'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { setCategory, setConfig, setLogin, setProduct } from './redux'
import { useConfig } from './lib/useConfig'
import Profile from './pages/auth/Profile'
import ShopCategory from './pages/admin/shop/ShopCategory'
import ShopProductList from './pages/admin/shop/ShopProductList'
import ShopProductCreate from './pages/admin/shop/ShopProductCreate'
import PostList from './pages/admin/cumunity/PostList'
import CategoryList from './pages/admin/cumunity/CategoryList'
import ShopProductUpdate from './pages/admin/shop/ShopProductUpdate'
import ShopRotateList from './pages/admin/shop/ShopRotateList'
import ConfigSetting from './pages/admin/config/ConfigSetting'
import ImageGallery from './pages/admin/ImageGallery'
import LoadingSpinner from './components/LoadingSpinner'


const App = ({setLogin,setConfig,setCategory,setProduct}) => {
  const [isLoading, setIsLoading] = useState(false)
   useConfig(setIsLoading,setLogin,setConfig,setCategory,setProduct)
  return  (
    <div>
           <LoadingSpinner loading={isLoading}/>
      <LayoutDivider>
        <Switch>
        <Route exact path={'/'} component={Main} />
          <Route path={'/about'} component={About} />

          <Route path={'/product/view/:category/:id'} component={ProductView} />         
          <Route path={'/product/list/:category'} component={ProductList} />
          <Route path={'/product/cart'} component={ProductCart} />

          <Route path={'/cumunity/create/:category'} component={CumunityCreate} />
          <Route path={'/cumunity/list/:category'} component={CumunityList} />
          <Route path={'/cumunity/update/:category/:id'} component={CumunityUpdate} />
          <Route path={'/cumunity/view/:category/:id'} component={CumunityView} />


          <Route exact path={'/auth/login'} component={Login} />
          <Route exact path={'/auth/register'} component={Register} />
          <Route exact path={'/auth/profile'} component={Profile} />
  
         


          <Route exact path={'/admin'} component={Dashboard} />
          <Route path={'/admin/shop/category'} component={ShopCategory} />
          <Route path={'/admin/shop/product/list'} component={ShopProductList} />
          <Route path={'/admin/shop/product/create'} component={ShopProductCreate} />
          <Route path={'/admin/shop/product/update/:id'} component={ShopProductUpdate} />

          <Route path={'/admin/shop/rotate/list'} component={ShopRotateList} />

          <Route path={'/admin/cumunity/category/list'} component={CategoryList} />
          <Route path={'/admin/cumunity/post/list'} component={PostList} />

          <Route path={'/admin/config'} component={ConfigSetting} />

          <Route path={'/admin/images'} component={ImageGallery} />

          
          <Route component={Notfound} />
        </Switch>
   
      </LayoutDivider>

    </div>

  )
}
const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLogin:(data)=>dispatch(setLogin(data)),
    setConfig:(data)=>dispatch(setConfig(data)),
    setCategory:(data)=>dispatch(setCategory(data)),
    setProduct:(data)=>dispatch(setProduct(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)