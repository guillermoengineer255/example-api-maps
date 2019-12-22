import React from 'react';
import Logo from '../assets/images/logo.png';
import './commom.css';

export const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <img alt="" className="picture" src={Logo} />
                <p className="footer-text"> Contact</p>
                <p className="footer-text"> Address</p>
            </div>
        </div>
    )
}