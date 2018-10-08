import React, {Component} from 'react';
import LeftPanel from "./LeftPanel";
import BookingFlight from "./BookingFlight";

//https://mock-air.herokuapp.com/search?departureStation=BUD&arrivalStation=BCN&date=2018-07-03
//https://mock-air.herokuapp.com/asset/stations

class Booking extends Component {

    constructor(props) {
        super(props);

        this.state = {
            flights: {},
            flightsReturn: {},
            ticketOrigin: {},
            ticketReturn: {}
        };
    }

    selectFlightReturns = flightsReturn => {
        this.setState({flightsReturn})
    };

    addTicketOrigin = ticketOrigin => {
        this.setState({ticketOrigin});
    };

    addTicketReturn = ticketReturn => {
        this.setState({ticketReturn});
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
                    <LeftPanel/>
                    <BookingFlight flights={this.state.flights}
                                   addTicketOrigin={this.addTicketOrigin}
                                   addTicketRetutn={this.addTicketReturn}
                                   selectFlightReturns={this.selectFlightReturns}
                                   getReturnFlights={this.getReturnFlights}
                                   {...this.props}/>
                </div>
            </div>
        );
    }
}

export default Booking;
