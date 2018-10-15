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
            tickets: {},
            flightsStatus: {
                origin: {
                    loading: true,
                    noFlights: false
                },
                return: {
                    loading: true,
                    noFlights: false
                }
            }
        };
    }

    selectFlightReturns = flightsReturn => {
        this.setState({flightsReturn})
    };

    addTicket = (key, flight, fareKey) => {
        const tickets = {...this.state.tickets};
        tickets[key] = {
            ...flight,
            fare: flight.fares[fareKey]
        };

        this.setState({tickets});
    };

    isTicketActive = (ticketTypeKey, fareSellKey) => {
        const tickets = {...this.state.tickets};
        let isActive = false;

        for (let key in tickets) {
            if (key === ticketTypeKey && tickets[key].fare.fareSellKey === fareSellKey) {
                isActive = true;
            }
        }

        return isActive;
    };

    getReturnFlights = () => {
        return this.state.flightsReturn;
    };

    componentDidMount() {
        const {originStation, destinationStation, departureDate, arrivalDate} = this.props.match.params;

        // First flight
        searchTicket(originStation, destinationStation, departureDate)
            .then(flights => {
                this.setState({flights});

                let flightsStatus = {...this.state.flightsStatus};

                flightsStatus.origin.loading = false;
                flightsStatus.origin.noFlights = flights.length === 0;

                this.setState({flightsStatus})
            });

        // Return flight
        if (arrivalDate && arrivalDate !== 'null') {
            searchTicket(destinationStation, originStation, arrivalDate)
                .then(flightsReturn => {
                    this.setState({flightsReturn});

                    let flightsStatus = {...this.state.flightsStatus};

                    flightsStatus.return.loading = false;
                    flightsStatus.return.noFlights = flightsReturn.length === 0;

                    this.setState({flightsStatus});
                });
        }
    }

    render() {
        return (
            <div className="booking">
                <div className="booking-container">
                    <LeftPanel tickets={this.state.tickets} {...this.props}/>
                    <BookingFlight flights={this.state.flights}
                                   flightsReturns={this.state.flightsReturn}
                                   addTicket={this.addTicket}
                                   isTicketActive={this.isTicketActive}
                                   selectFlightReturns={this.selectFlightReturns}
                                   flightsStatus={this.state.flightsStatus}
                                   {...this.props}/>
                </div>
            </div>
        );
    }
}

export default Booking;
