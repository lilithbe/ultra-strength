import React from 'react';

export const AppFooter = (props) => {

    return (
        <div className="layout-footer">
            <img src={props.layoutColorMode === 'light' ? 'https://ultra-strength-test.herokuapp.com/assets/layout/images/logo-dark.svg' : 'https://ultra-strength-test.herokuapp.com/assets/layout/images/logo-white.svg'} alt="Logo" height="20" className="mr-2" />
            Ultral
            <span className="font-medium ml-2">Strength</span>
        </div>
    );
}
