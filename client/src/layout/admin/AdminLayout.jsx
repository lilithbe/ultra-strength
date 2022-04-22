import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import AppConfig from './AppConfig';


import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import '../../assets/demo/flags/flags.css';
import '../../assets/demo/Demos.scss';
import '../../assets/layout/layout.scss';

import { menu } from '../../common/menu';
import { connect } from 'react-redux';
import {setConfig} from '../../redux'
const Layout = ({children,setConfig,config, auth}) => {   
    console.log(auth,config)
    const copyTooltipRef = useRef();
    const location = useLocation();
    const [overlayMenuActive, setOverlayMenuActive] = useState(false)
    const [mobileMenuActive, setMobileMenuActive] = useState(false)
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false)

    const [staticMenuInactive, setStaticMenuInactive] = useState(false)


    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        // setInputStyle(inputStyle);
        setConfig({
            inputStyle:inputStyle
        })
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        // setRipple(e.value)
        setConfig({
            ripple:e.value
        })
    }

    const onLayoutModeChange = (mode) => {
        setConfig({layoutMode:mode})
        // setLayoutMode(mode)
    }

    const onColorModeChange = (mode) => {
        setConfig({
            layoutColorMode:mode
        })
        // setLayoutColorMode(mode)
    }

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    }

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (config.layoutMode === 'overlay') {
                if (mobileMenuActive === true) {
                     setOverlayMenuActive(true);
                   
                }
               
                 setOverlayMenuActive((prevState) => !prevState);
                 setMobileMenuActive(false);
            }
            else if (config.layoutMode === 'static') {
               
                 setStaticMenuInactive((prevState) => !prevState);
            }
        }
        else {
           
             setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;
         setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    }

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
             setOverlayMenuActive(false);
             setMobileMenuActive(false);
         
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }



    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const themeHandler = (theme) => { 
        setConfig({
            theme:theme
        })
     }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': config.layoutMode === 'overlay',
        'layout-static': config.layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && config.layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && config.layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': config.inputStyle === 'filled',
        'p-ripple-disabled': config.ripple === false,
        'layout-theme-light': config.layoutColorMode === 'light'
    });


  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
  
    <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />
    <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={config.layoutColorMode}
    mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

<div className="layout-sidebar" onClick={onSidebarClick}>
    <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={config.layoutColorMode} />
</div>
<div className="layout-main-container">
    <div className="layout-main">
        {children}
    </div>

    <AppFooter layoutColorMode={config.layoutColorMode} />
</div>

<AppConfig 
theme={config.theme} 
setTheme={themeHandler} 
rippleEffect={config.ripple} 
onRippleEffect={onRipple} 
inputStyle={config.inputStyle} 
onInputStyleChange={onInputStyleChange}
layoutMode={config.layoutMode} 
onLayoutModeChange={onLayoutModeChange} 
layoutColorMode={config.layoutColorMode} 
onColorModeChange={onColorModeChange} 
    />

<CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
    <div className="layout-mask p-component-overlay"></div>
</CSSTransition>



</div>
  )
}
const mapStateToProps = (state) => { 
    return{
        auth:state.auth,
        config:state.config,
    }
 }
 const mapDipatchToprops = (dispatch) => { 
     return{
        setConfig:(data)=>dispatch(setConfig(data))
     }
  }
export default connect(mapStateToProps, mapDipatchToprops)(Layout)