import React from 'react';
import logo from '../svgs/logo.svg';
import { Link } from 'react-router-dom'

const Header = props => (
    <header className="header">
        <Link to="/">
            <img src={logo} className="header__logo" alt="logo" />
        </Link>
        <h1 className="header__title">Header</h1>
        <div className="header__flight-route flight-route">
            <span className="flight-route__title">Leaving from</span>
            <span className="flight-route__origin-full">Budapest</span> <span className="flight-route__origin-short">BUD</span>
            <i className="icon icon__return-arrow flight-route__icon"/>
            <span className="flight-route__origin-full">Barcelona Lorem ipsum</span> <span className="flight-route__origin-short">BCN</span>
        </div>
    </header>
);

export default Header;