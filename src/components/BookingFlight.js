import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from "react-dates";
import {searchTicket} from '../api';
import {priceEuro} from "../helper";
import DateChart from "./DateChart";
import NoFlights from "./NoFlights";
import DiscountClub from "./DiscountClub";

class BookingFlight extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            date: null
        };

        this.handleClick = this.handleClick.bind(this);
        this.isOutsideRange = this.isOutsideRange.bind(this);
        this.setReturnDate = this.setReturnDate.bind(this);
    }

    //TODO REMAINING!!!!!

    renderFlight = (key) => {
        const flight = this.props.flights[key];
        let buttonClassNames = 'button button--medium button--price';

        return (
            <div key={flight.flightNumber} className="price-box-container">
                <div className="price-box">{moment(flight.departure).format(`hh:mm`)} <i className="icon icon__toright-arrow icon__toright-arrow--small-blue"/> {moment(flight.arrival).format(`hh:mm`)}</div>
                {Object.keys(flight.fares).map((fareKey) => {
                    return <div className="price-box"  key={flight.fares[fareKey].fareSellKey}>
                        <button className={this.props.isTicketActive('originTicket', flight.fares[fareKey].fareSellKey) ? `${buttonClassNames} button--price--active` : buttonClassNames}
                                onClick={(e) => this.handleClick('originTicket', flight.fares[fareKey])}
                               >{priceEuro(flight.fares[fareKey].price)}</button>
                    </div>
                })}
            </div>
        );
    };

    renderReturnFlight = (key) => {
        const flight = this.props.getReturnFlights()[key];
        console.log(flight);
        return (
            <div key={flight.flightNumber}>
                {moment(flight.departure).format(`hh:mm`)} - {moment(flight.arrival).format(`hh:mm`)}
                {Object.keys(flight.fares).map((fareKey) => {
                    return <button className="button button--medium button--price"
                                   onClick={(e) => this.handleClick('returnTicket', flight.fares[fareKey])}
                                   key={flight.fares[fareKey].fareSellKey}>{priceEuro(flight.fares[fareKey].price)}</button>
                })}
            </div>
        );
    };

    handleClick(key, item) {
        console.log('handleClick', key, item);
        this.props.addTicket(key, item)
    }

    isOutsideRange(day) {
        const firstReturnTicket = moment(this.props.match.params.departureDate).add(1, 'day');
        return !moment(day).isAfter(firstReturnTicket);
    }

    setReturnDate(date) {
        this.setState({date});
        this.props.history.push(date.format('YYYY-MM-DD'));
        searchTicket(this.props.match.params.destinationStation, this.props.match.params.originStation, date.format('YYYY-MM-DD'))
            .then((data) => {
                console.log(data);
                this.props.selectFlightReturns(data)
            })
    }

    render() {
        return (

            <div className="booking-flight">
                <div className="r">
                    <i className="icon icon__airplane"/>
                    <h1 className="booking-flight__heading heading--1">Select flights</h1>
                </div>
                <DiscountClub/>
                <div className="card">
                    <div className="booking-flight__title-container">
                        <div className="booking-flight__title-container__title">Outbound</div>
                        <address className="booking-flight__title-container__flight-route">
                            <span className="booking-flight__station">({this.props.match.params.originStation})</span>
                            <i className="icon icon__toright-arrow"/>
                            <span className="booking-flight__station">({this.props.match.params.destinationStation})</span>
                        </address>
                    </div>
                    <div className="booking-flight__select-date">
                        <div><i className="icon icon__left-arrow"/>{moment(this.props.match.params.departureDate).subtract(1, 'day').format(`ddd D MMM`)}</div>
                        <div className="booking-flight__current_date">{moment(this.props.match.params.departureDate).format(`dddd, D MMMM YYYY`)}</div>
                        <div>{moment(this.props.match.params.departureDate).add(1, 'day').format(`ddd D MMM`)}<i className="icon icon__right-arrow"/></div>
                    </div>
                    <div className="price-box-container">
                        <div className="price-box"/>
                        <div className="price-box">Basic</div>
                        <div className="price-box">Standard</div>
                        <div className="price-box">Plus</div>
                    </div>
                    {Object.keys(this.props.flights).map(key => this.renderFlight(key))}
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
                    <DateChart selectedDate={this.props.match.params.departureDate}/>
                </div>


                <div className="card">
                    Add Return flights
                    <div>
                        <SingleDatePicker
                            date={this.state.date} // momentPropTypes.momentObj or null
                            onDateChange={date => this.setReturnDate(date)} // PropTypes.func.isRequired
                            focused={this.state.focused} // PropTypes.bool
                            onFocusChange={({focused}) => this.setState({focused})} // PropTypes.func.isRequired
                            isOutsideRange={this.isOutsideRange}
                            id="return_date_id" // PropTypes.string.isRequired,
                        />
                    </div>
                    {this.state.date && <div>
                        {moment(this.state.date).format(`dddd, D MMMM YYYY`)}
                    </div>
                    }
                    <div>
                        {Object.keys(this.props.getReturnFlights()).map(key => this.renderReturnFlight(key))}
                        <NoFlights/>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookingFlight;
