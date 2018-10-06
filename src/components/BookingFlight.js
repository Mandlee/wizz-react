import React from 'react';
import dayjs from 'dayjs';

class BookingFlight extends React.Component {

    renderFlight = (key) => {
        const flight = this.props.flights[key];
        return (
            <div key={flight.flightNumber}>
                {dayjs(flight.departure).format(`hh:mm`)} -> {dayjs(flight.arrival).format(`hh:mm`)}
                {Object.keys(flight.fares).map((fareKey) => {
                    return <button className="button" key={flight.fares[fareKey].fareSellKey}>{flight.fares[fareKey].price}</button>
                })}
            </div>
        );
    };

    render() {
        return (

            <div className="booking-flight">
                <h1>Select flights</h1>
                <div className="card">
                    <div>
                        <button className="button button--primary button--medium">Show Discount Club fares</button>
                    </div>
                </div>
                <div className="card">
                    Outbound
                    <div>
                        {Object.keys(this.props.flights).map(key => this.renderFlight(key))}
                    </div>
                </div>
            </div>
        );
    }
}

export default BookingFlight;
