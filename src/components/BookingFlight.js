import React from 'react';
import dayjs from 'dayjs';
import {SingleDatePicker} from "react-dates";
import {searchTicket} from '../api';

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

    renderFlight = (key) => {
        const flight = this.props.flights[key];
        return (
            <div key={flight.flightNumber}>
                {dayjs(flight.departure).format(`hh:mm`)} - {dayjs(flight.arrival).format(`hh:mm`)}
                {Object.keys(flight.fares).map((fareKey) => {
                    return <button className="button button--medium button--price"
                                   onClick={(e) => this.handleClick(flight.fares[fareKey])}
                                   key={flight.fares[fareKey].fareSellKey}>{flight.fares[fareKey].price}</button>
                })}
            </div>
        );
    };

    renderReturnFlight = (key) => {
        const flight = this.props.getReturnFlights()[key];
        console.log(flight);
        return (
            <div key={flight.flightNumber}>
                {dayjs(flight.departure).format(`hh:mm`)} - {dayjs(flight.arrival).format(`hh:mm`)}
                {Object.keys(flight.fares).map((fareKey) => {
                    return <button className="button button--medium button--price"
                                   onClick={(e) => this.handleClick(flight.fares[fareKey])}
                                   key={flight.fares[fareKey].fareSellKey}>{flight.fares[fareKey].price}</button>
                })}
            </div>
        );
    };

    handleClick(item) {
        console.log(item);
        this.props.addTicketOrigin(item)
    }

    isOutsideRange(day) {
        //TODO
        //moment isSameOrAfter
        const firstReturnTicket = dayjs(this.props.match.params.departureDate).add(1, 'day');
        return !dayjs(day).isAfter(firstReturnTicket);
    }

    setReturnDate(date) {
        this.setState({date});
        console.log(date.format('YYYY-MM-DD'));
        searchTicket(this.props.match.params.destinationStation, this.props.match.params.originStation, date.format('YYYY-MM-DD'))
            .then((data) => {
                console.log(data);
                this.props.selectFlightReturns(data)
            })
    }

    render() {
        return (

            <div className="booking-flight">
                <h1>Select flights</h1>
                <div className="card card__discount-promo">
                    <div>
                        <button className="button button--primary button--medium">Show Discount Club fares</button>
                        <span>€10 discount on flights</span>
                        <span>€5 discount on baggages</span>
                        <button className="button button--link button--medium">Read More</button>
                    </div>
                </div>
                <div className="card">
                    <div>Outbound
                    </div>
                    <div>{dayjs(this.props.match.params.departureDate).format(`dddd, D MMMM YYYY`)}
                    </div>
                    <div>
                        {Object.keys(this.props.flights).map(key => this.renderFlight(key))}
                    </div>
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
                    <div>
                        {dayjs(this.state.date).format(`dddd, D MMMM YYYY`)}
                    </div>
                    <div>
                        {Object.keys(this.props.getReturnFlights()).map(key => this.renderReturnFlight(key))}
                    </div>
                </div>
            </div>
        );
    }
}

export default BookingFlight;
