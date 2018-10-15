import React, {Component} from 'react';
import moment from "moment/moment";
import DateChart from "./DateChart";
import {priceEuro} from "../helper";

class TicketSelect extends Component {

    // constructor(props) {
    //     super(props)
    //
    // }

    renderFlight = (key) => {
        const flight = this.props.flightTicket[key];
        let buttonClassNames = 'button button--medium button--price';

        return (
            <div key={flight.flightNumber} className="price-box-container">
                <div className="price-box">{moment(flight.departure).format(`hh:mm`)} <i
                    className="icon icon__toright-arrow icon__toright-arrow--small-blue"/> {moment(flight.arrival).format(`hh:mm`)}
                </div>
                {Object.keys(flight.fares).map((fareKey) => {
                    const {price, fareSellKey} = flight.fares[fareKey];

                    if (!flight.remainingTickets) {
                        return <div className="price-box" key={fareSellKey}>
                            Sold out!
                        </div>
                    }
                    return <div className="price-box" key={fareSellKey}>
                        <button
                            className={this.props.isTicketActive(this.props.ticketType, fareSellKey) ? `${buttonClassNames} button--price--active` : buttonClassNames}
                            onClick={(e) => this.props.handleClick(this.props.ticketType, flight.fares[fareKey])}
                        >{priceEuro(price)}</button>
                    </div>
                })}
            </div>
        );
    };

    render() {
        const {originStation, destinationStation, date} = this.props;

        return (
            <React.Fragment>
                <div className="booking-flight__title-container">
                    <div className="booking-flight__title-container__title">Outbound</div>
                    <address className="booking-flight__title-container__flight-route">
                        <span className="booking-flight__station">({originStation})</span>
                        <i className="icon icon__toright-arrow"/>
                        <span className="booking-flight__station">({destinationStation})</span>
                    </address>
                </div>
                <div className="booking-flight__select-date">
                    <div><i
                        className="icon icon__left-arrow"/>{moment(date).subtract(1, 'day').format(`ddd D MMM`)}
                    </div>
                    <div
                        className="booking-flight__current_date">{moment(date).format(`dddd, D MMMM YYYY`)}</div>
                    <div>{moment(date).add(1, 'day').format(`ddd D MMM`)}<i
                        className="icon icon__right-arrow"/></div>
                </div>
                
                <div className="price-box-container">
                    <div className="price-box"/>
                    <div className="price-box">Basic</div>
                    <div className="price-box">Standard</div>
                    <div className="price-box">Plus</div>
                </div>

                {Object.keys(this.props.flightTicket).map(key => this.renderFlight(key))}

                <div className="price-box-container">
                    <div className="price-box"/>
                    <div className="price-box price-box--list-container">
                        <span>JUST THE ESSENTIALS</span>
                        <ul>
                            <li>Flight ticket</li>
                            <li>1 small cabin bag</li>
                        </ul>
                    </div>
                    <div className="price-box price-box--list-container">
                        <span>€2.25 CHEAPER IN BUNDLE</span>
                        <ul>
                            <li>Flight ticket</li>
                            <li>1 large cabin bag</li>
                            <li>Seat selection</li>
                        </ul>
                    </div>
                    <div className="price-box price-box--list-container">
                        <span>€3.25 CHEAPER IN BUNDLE</span>
                        <ul>
                            <li>Flight ticket</li>
                            <li>1 large cabin bag</li>
                            <li>1 heavy checked-in bag</li>
                            <li>+1 small personal item onboard</li>
                            <li>Seat selection</li>
                            <li>Flex for flight changes</li>
                            <li>Priority Boarding</li>
                        </ul>
                    </div>
                </div>
                <DateChart selectedDate={date}/>
            </React.Fragment>
        )
    }


}

export default TicketSelect;