import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from "react-dates";
import {searchTicket} from '../api';
import DiscountClub from "./DiscountClub";
import TicketSelect from "./TicketSelect";

class BookingFlight extends React.Component {

    constructor(props) {
        super(props);

        const arrivalDate = this.props.match.params.arrivalDate;

        this.state = {
            returnDate: arrivalDate ? moment(arrivalDate) : null
        };

        this.handleClick = this.handleClick.bind(this);
        this.isOutsideRange = this.isOutsideRange.bind(this);
        this.setReturnDate = this.setReturnDate.bind(this);
    }


    /**
     * Handling select flight ticket
     * @param key
     * @param flight
     * @param item
     */
    handleClick(key, flight, item) {
        this.props.addTicket(key, flight, item)
    }

    /**
     * Check date is outside for react-dates component
     * @param day
     * @returns {boolean}
     */
    isOutsideRange(day) {
        const firstReturnTicket = moment(this.props.match.params.departureDate).add(1, 'day');
        return !moment(day).isAfter(firstReturnTicket);
    }

    /**
     * Setting the Return flight date
     * @param returnDate
     */
    setReturnDate(returnDate) {
        if (!returnDate) {
            return
        }
        this.setState({returnDate: returnDate});
        this.props.history.push(returnDate.format('YYYY-MM-DD'));
        searchTicket(this.props.match.params.destinationStation, this.props.match.params.originStation, returnDate.format('YYYY-MM-DD'))
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

                    <TicketSelect flightTicket={this.props.flights}
                                  addTicket={this.props.addTicket}
                                  originStation={this.props.match.params.originStation}
                                  destinationStation={this.props.match.params.destinationStation}
                                  date={this.props.match.params.departureDate}
                                  ticketType='originTicket'
                                  handleClick={this.handleClick}
                                  status={this.props.flightsStatus.origin}
                                  isTicketActive={this.props.isTicketActive}
                                  onSelectDate={this.props.onSelectDate}
                                  fullNameOrigStation={this.props.fullNameOrigStation}
                                  fullNameDestStation={this.props.fullNameDestStation}
                    />
                </div>


                <div className="card">
                    {this.state.returnDate ? (

                        <TicketSelect flightTicket={this.props.flightsReturns}
                                      addTicket={this.props.addTicket}
                                      originStation={this.props.match.params.destinationStation}
                                      destinationStation={this.props.match.params.originStation}
                                      date={this.props.match.params.arrivalDate}
                                      ticketType='returnTicket'
                                      handleClick={this.handleClick}
                                      status={this.props.flightsStatus.return}
                                      isTicketActive={this.props.isTicketActive}
                                      onSelectDate={this.props.onSelectDate}
                                      fullNameOrigStation={this.props.fullNameDestStation}
                                      fullNameDestStation={this.props.fullNameOrigStation}
                        />
                    ) : (
                        <div>
                            ADD RETURN FLIGHT
                            <SingleDatePicker
                                date={this.state.returnDate} // momentPropTypes.momentObj or null
                                onDateChange={date => this.setReturnDate(date)} // PropTypes.func.isRequired
                                focused={this.state.focused} // PropTypes.bool
                                onFocusChange={({focused}) => this.setState({focused})} // PropTypes.func.isRequired
                                isOutsideRange={this.isOutsideRange}
                                id="return_date_id" // PropTypes.string.isRequired,
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default BookingFlight;
