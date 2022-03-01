import React from 'react'
import logo from '../euphoria_logo.png';

const Logo = () => {
    return (
        <div className="row myLogo">
            <div className="col-md-12">
            <img src={logo} className="img-fluid" alt="logo" />
        </div>
        </div>
    )
}

export default Logo
