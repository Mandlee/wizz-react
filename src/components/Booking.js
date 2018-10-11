import React, {Component} from 'react';
import LeftPanel from "./LeftPanel";
import BookingFlight from "./BookingFlight";
import {searchTicket} from "../api";

class Booking extends Component {

    constructor(props) {
        super(props);

        this.state = {
            flights: {},
            flightsReturn: {},
            tickets: {}
        };
    }

    selectFlightReturns = flightsReturn => {
        this.setState({flightsReturn})
    };

    addTicket = (key, ticket) => {
        const tickets = {...this.state.tickets};
        tickets[key] = ticket;
        this.setState({tickets});
    };

    isTicketActive = (ticketTypeKey, fareSellKey) => {
        const tickets = {...this.state.tickets};
        let isActive = false;

        for (let key in tickets) {
            if (key === ticketTypeKey && tickets[key].fareSellKey === fareSellKey) {
                isActive = true;
            }
        }

        return isActive;
    };

    getReturnFlights = () => {
        return this.state.flightsReturn;
    };

    componentDidMount() {
        const {originStation, destinationStation, departureDate} = this.props.match.params;
        searchTicket(originStation, destinationStation, departureDate)
            .then(flights => this.setState({flights}));
    }

    render() {
        return (
            <div className="booking">
                <div className="booking-container">
                    <LeftPanel tickets={this.state.tickets} {...this.props}/>
                    <BookingFlight flights={this.state.flights}
                                   addTicket={this.addTicket}
                                   isTicketActive={this.isTicketActive}
                                   selectFlightReturns={this.selectFlightReturns}
                                   getReturnFlights={this.getReturnFlights}
                                   {...this.props}/>
                </div>
            </div>
        );
    }
}

export default Booking;
