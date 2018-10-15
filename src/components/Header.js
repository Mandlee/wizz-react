import React from 'react';
import logo from '../svgs/logo.svg';
import {Link} from 'react-router-dom'

const Header = props => (
    <header className="header">
        <Link to="/">
            <img src={logo} className="header__logo" alt="logo"/>
        </Link>
        {props.originStation &&
        <React.Fragment>
            <div className="header__flight-route flight-route">
                <span className="flight-route__title">Leaving from</span>
                <span className="flight-route__origin-full">Budapest</span> <span
                className="flight-route__origin-short">{props.originStation}</span>
                <i className="icon icon__return-arrow flight-route__icon"/>
                <span className="flight-route__origin-full">Barcelona Lorem ipsum</span> <span
                className="flight-route__origin-short">{props.destinationStation}</span>
            </div>
            <div className="header__flight-route flight-route flight-route--flight-passengers">
                <span className="flight-route__title">PASSENGERS</span>
                <span className="flight-route__origin-full">1</span>
                <i className="icon icon__person flight-route--flight-passengers__icon-person"/>
                <span className="flight-route__origin-full">3</span>
                <i className="icon icon__person icon__person--child flight-route--flight-passengers__icon-child"/>
            </div>
        </React.Fragment>
        }
    </header>
);

export default Header;