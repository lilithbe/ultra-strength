import React, { useEffect, useState } from 'react'
import { Link, useHistory, NavLink , useLocation } from 'react-router-dom'
import { main_menu } from '../../common'
import whiteLogo from '../../style/ulk-logo-white.svg'
import { ReactComponent as  DarkLogo} from '../../style/ulk-logo-dark.svg'
import { connect } from 'react-redux'
const AppMenu = ({setLogout , auth , config , category, isMobileMenuActive, setIsMobileMenuActive,myCartCount, productCategorys}) => {
  const [isScrollDwon, setisScrollDwon] = useState(false)
  useEffect(() => {
    window.onscroll=(e)=>{
      if(e.target.scrollingElement.scrollTop>300){
        setisScrollDwon(true)
      }else{
        setisScrollDwon(false)
      }
    }
  }, [])
  

 
  
  return (
    <nav className={`navbar navbar-expand-lg bg-secondary navbar-dark sticky-top  py-lg-0 px-lg-5 wow fadeIn `} data-wow-delay="0.3s">
        <Link to="/" className="navbar-brand ms-4 ms-lg-0">
          <DarkLogo fill="#0079ff" width="300" height="31" />
          {/* <img src={darkLogo} alt="logo"/> */}
          {/* <h1 className="mb-0 text-primary text-uppercase">Ultra Strength</h1> */}
        </Link>
        <button type="button" className="navbar-toggler me-4" onClick={(e)=>{e.preventDefault();setIsMobileMenuActive(!isMobileMenuActive)}}>
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${isMobileMenuActive?'show':''}`} >
          <div className="navbar-nav ms-auto p-4 p-lg-0">
          <MenuItem/> 
          <ProductCategoryDropdown items={productCategorys}/>
          <CumunityMenuDropdown category={category}/>
          <AccountDropdown setLogout={setLogout} auth={auth}/>
       
        
          </div>
          <Link to="/product/cart" className="btn btn-primary rounded-0 py-2 px-lg-4 d-none d-lg-block position-relative">My Cart<i className="bi bi-cart ms-3" />
          {myCartCount>0 ?   <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
              {myCartCount>99?'99+':myCartCount}
              <span className="visually-hidden">unread messages</span>
            </span>
            :null}
       
          </Link>
        </div>
      </nav>
  )
}
const mapStateToProps = (state)=>{
return {
  myCartCount:state.product.myCartList.length,
  productCategorys:state.product.category,
  
}
}
const mapDispatchToProps = (dispatch)=>{
return {

}
}
export default connect(mapStateToProps,mapDispatchToProps)(AppMenu)

const MenuItem = () => { 
  return(
    main_menu.map((item,i)=>{
      if(item.items.length !==0){
        return(
          <DropdwonMenu key={i} item={item} />
        )
      }else{
        return(
          <Link key={i} to={item.to} className="nav-item nav-link">{item.label}</Link>
        )
      }
    })
  )
 }

const DropdwonMenu = ({ item }) => {
  return (
    <div className="nav-item dropdown">
      <NavLink to="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{item.label}</NavLink>
      <div className="dropdown-menu m-0">
        {item.items.map((subItem,i)=>{
          return(
            <Link key={i} to={subItem.to} className="dropdown-item">{subItem.label}</Link>
          )
        })}
        
      </div>
    </div>
  )
}

const AccountDropdown = ({auth,setLogout}) => { 
  const history = useHistory()
  const logoutHandler = (e) => { 
    e.preventDefault()
    history.push('/')
    setLogout()
   }
  return(
    <div className="nav-item dropdown">
 <NavLink to="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Account</NavLink>
 {auth.isLogin?
 <div className="dropdown-menu m-0">
   {auth.isAdmin?
    <Link to={'/admin'} className="dropdown-item">관리자페이지</Link>:null}
 <Link to={'/auth/profile'} className="dropdown-item">Profile</Link>
 <button onClick={logoutHandler} className="dropdown-item">Logout</button>
 </div>:
 <div className="dropdown-menu m-0">
 <Link to={'/auth/login'} className="dropdown-item">Login</Link>
 <Link to={'/auth/register'} className="dropdown-item">회원가입</Link>
 </div>
 }
      
    </div>
  )
 }

 const CumunityMenuDropdown = ({category}) => { 
   return (
     <div className="nav-item dropdown">
       <NavLink to="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">category</NavLink>
       <div className="dropdown-menu m-0">
       {category.category.map((item,i)=>{
           return(
            <Link key={i} to={`/cumunity/list/${item.value}`} className="dropdown-item">{item.label}</Link>
           )
         })}
       </div>
     </div>
   )
  }
  const ProductCategoryDropdown = ({items}) => { 
    return (
      <div className="nav-item dropdown">
        <NavLink to="/" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Products</NavLink>
        <div className="dropdown-menu m-0">
        {items.map((item,i)=>{
            return(
             <Link key={i} to={`/product/list/${item.label}`} className="dropdown-item">{item.label}</Link>
            )
          })} 
        </div> 
      </div>
    )
   }