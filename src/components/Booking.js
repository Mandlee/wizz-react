import React, {Component} from 'react';
import LeftPanel from "./LeftPanel";
import BookingFlight from "./BookingFlight";

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

    getReturnFlights = () => {
        return this.state.flightsReturn;
    };

    componentDidMount() {
        const {originStation, destinationStation, departureDate} = this.props.match.params;
        fetch(`https://mock-air.herokuapp.com/search?departureStation=${originStation}&arrivalStation=${destinationStation}&date=${departureDate}`)
            .then(response => response.json())
            .then(data => {
                this.setState({flights: data});
                console.log(data);
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    render() {
        return (
            <div className="booking">
                <div className="booking-container">
                    <LeftPanel tickets={this.state.tickets}/>
                    <BookingFlight flights={this.state.flights}
                                   addTicket={this.addTicket}
                                   selectFlightReturns={this.selectFlightReturns}
                                   getReturnFlights={this.getReturnFlights}
                                   {...this.props}/>
                </div>
            </div>
        );
    }
}

export default Booking;
