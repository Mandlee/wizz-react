import React, {Component} from 'react';
import LeftPanel from "./LeftPanel";
import BookingFlight from "./BookingFlight";

//https://mock-air.herokuapp.com/search?departureStation=BUD&arrivalStation=BCN&date=2018-07-03
//https://mock-air.herokuapp.com/asset/stations

class Booking extends Component {

    componentDidMount() {
        fetch(`https://mock-air.herokuapp.com/search?departureStation=BUD&arrivalStation=BCN&date=2018-07-03`)
            .then(response => response.json())
            .then(data => {
                this.setState({stations: data})
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
                    <BookingFlight/>
                </div>
            </div>
        );
    }
}

export default Booking;
