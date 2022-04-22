import React, { useEffect, useState } from 'react'
import AppFooter from './AppFooter'
import AppMenu from './AppMenu'
import LoadingSpinner from '../../components/LoadingSpinner'
import ScrollToTop from './ScrollToTop'
import '../../style/custom.scss'
import 'bootstrap/dist/js/bootstrap.bundle'
 
import 'bootstrap-icons/font/bootstrap-icons.scss'
import '../../style/custom.css'
import { connect } from 'react-redux'
import { setLogout } from '../../redux'
const MainLayouy = ({ children, setLogout,auth,config,category }) => {
    const [isMobileMenuActive, setIsMobileMenuActive] = useState(false)
    const mainWrapperClickHandler = () => { 
        setIsMobileMenuActive(false)
     } 
     useEffect(() => {
        document.documentElement.style.fontSize = 14 + 'px';
    }, [])
    return (
        <div >
            <AppMenu setLogout={setLogout} auth={auth} config={config} category={category} isMobileMenuActive={isMobileMenuActive} setIsMobileMenuActive={setIsMobileMenuActive}/>
            <div onClick={mainWrapperClickHandler}>
            {children}
            <AppFooter />
            </div>
           
            <ScrollToTop />
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        auth:state.auth,
        category:state.category,
        config:state.config
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setLogout:(data)=>dispatch(setLogout(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainLayouy)