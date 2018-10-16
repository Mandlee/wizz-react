import React, {Component} from 'react';
import LeftPanel from "./LeftPanel";
import BookingFlight from "./BookingFlight";
import {getStations, searchTicket} from "../api";

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
            },
            stations: []
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

    componentDidMount() {
        const {originStation, destinationStation} = this.props.match.params;
        this.fetchTickets();

        getStations().then(stations => {
            this.setState({stations});
            this.props.setStations(originStation, destinationStation, this.getFullNameStation(originStation), this.getFullNameStation(destinationStation));
        })
    }

    getFullNameStation(key) {
        const station = this.state.stations.find(element => element.iata === key);
        if (station) {
            return station.shortName;
        }
        return '';
    }


    componentDidUpdate(prevProps, prevState) {
        const {arrivalDate, departureDate} = this.props.match.params;
        if (arrivalDate !== prevProps.match.params.arrivalDate) {
            this.fetchTickets()
        }
        if (departureDate !== prevProps.match.params.departureDate) {
            this.fetchTickets()
        }
    }

    /**
     * Search tickets, origin and return flight, if available the return route
     */
    fetchTickets() {
        const {originStation, destinationStation, departureDate, arrivalDate} = this.props.match.params;

        let flightsStatus = {...this.state.flightsStatus};
        flightsStatus.origin.loading = true;
        flightsStatus.return.loading = true;
        this.setState({flightsStatus});

        // First flight
        searchTicket(originStation, destinationStation, departureDate)
            .then(flights => {
                let flightsStatus = {...this.state.flightsStatus};

                flightsStatus.origin.loading = false;
                flightsStatus.origin.noFlights = flights.length === 0;

                this.setState({
                    flights,
                    flightsStatus
                })
            });

        // Return flight
        if (arrivalDate) {
            searchTicket(destinationStation, originStation, arrivalDate)
                .then(flightsReturn => {
                    let flightsStatus = {...this.state.flightsStatus};

                    flightsStatus.return.loading = false;
                    flightsStatus.return.noFlights = flightsReturn.length === 0;

                    this.setState({
                        flightsReturn,
                        flightsStatus
                    })
                });
        }
    }

    /**
     * Select another date, and push the state
     * @param momentDate - date
     * @param ticketType - origin or return ticket
     */
    handleSelectDate = (momentDate, ticketType) => {
        const {originStation, destinationStation} = this.props.match.params;
        if (ticketType === 'originTicket') {
            this.props.history.push(`/booking/select-flight/${originStation}/${destinationStation}/${momentDate.format('YYYY-MM-DD')}/${this.props.match.params.arrivalDate || ''}`);
        }
        else {
            this.props.history.push(`/booking/select-flight/${originStation}/${destinationStation}/${this.props.match.params.departureDate}/${momentDate.format('YYYY-MM-DD')}`);
        }
    };

    render() {
        const {originStation, destinationStation} = this.props.match.params;

        return (
            <div className="booking">
                <div className="booking-container">
                    <LeftPanel tickets={this.state.tickets}
                               params={this.props.match.params}
                               fullNameOrigStation={this.getFullNameStation(originStation)}
                               fullNameDestStation={this.getFullNameStation(destinationStation)}
                    />
                    <BookingFlight flights={this.state.flights}
                                   flightsReturns={this.state.flightsReturn}
                                   addTicket={this.addTicket}
                                   isTicketActive={this.isTicketActive}
                                   selectFlightReturns={this.selectFlightReturns}
                                   flightsStatus={this.state.flightsStatus}
                                   onSelectDate={this.handleSelectDate}
                                   fullNameOrigStation={this.getFullNameStation(originStation)}
                                   fullNameDestStation={this.getFullNameStation(destinationStation)}
                                   {...this.props}/>
                </div>
            </div>
        );
    }
}

export default Booking;
