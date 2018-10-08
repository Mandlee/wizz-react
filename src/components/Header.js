import React from 'react';
import logo from '../svgs/logo.svg';
import { Link } from 'react-router-dom'

const Header = props => (
    <header className="header">
        <Link to="/">
            <img src={logo} className="header__logo" alt="logo" />
        </Link>
        <h1 className="header__title">Header</h1>
    </header>
);

export default Header;