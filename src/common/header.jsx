import React from 'react';
import Logo from '../assets/images/logo.png';
import './commom.css';

export const Header = () => {
    return (
        <div className="header">
            <div >
                <a href="/">
                    <img alt="" className="picture" src={Logo} />
                </a>
            </div>
        </div>
    )
}
