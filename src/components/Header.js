import React from 'react';
import logo from '../svgs/logo.svg';
import { Link } from 'react-router-dom'

const Header = props => (
    <header className="header">
        <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <h1>Header</h1>
    </header>
);

export default Header;