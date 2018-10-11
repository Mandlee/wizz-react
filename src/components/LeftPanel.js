import React from 'react';
import {priceEuro} from "../helper";
import moment from "moment";

class LeftPanel extends React.Component {

    getTotalPrice() {
        let total = 0;

        Object.keys(this.props.tickets).map(key =>
            total += this.props.tickets[key].price
        );

        return total;
    }

    // getWizz
    getWizzClubTotalPrice() {
        let total = 0;

        Object.keys(this.props.tickets).map(key =>
            total += this.props.tickets[key].price - 10
        );

        return total;
    }

    render() {
        const {originStation, destinationStation, departureDate, arrivalDate} = this.props.match.params;

        return (
            <div className="left-panel">
                <div className="card card--booking-flow">
                    <div className="card--booking-flow__container">
                        <h3 className="card__title card__title--booking-flow">Flights</h3>
                        <div>
                            <div className="booking-flow__title">
                                Checked-in bags
                            </div>
                            <div className="booking-flow__price">
                                €89
                            </div>
                        </div>
                        <div>
                            <div className="booking-flow__title">
                                Return
                            </div>

                            <div className="booking-flow__price">
                                €89
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card card--booking-flow">
                    <div className="card--booking-flow__container">
                        <h3 className="card__title card__title--booking-flow">Bundle</h3>
                        {this.props.tickets.originTicket &&
                        <div>
                            <div className="booking-flow__flight-info flight-info">
                            <span className="flight-info__date">
                                <span className="flight-info__month"> {moment(departureDate).format('MMM')} </span>
                                <span className="flight-info__day"> {moment(departureDate).format('DD')} </span>
                            </span>
                                <span className="flight-info__stations"> {originStation} - {destinationStation} </span>
                                <span
                                    className="flight-info__time">{this.props.tickets.originTicket.fareSellKey} </span>
                            </div>
                            <div className="booking-flow__title">
                                {this.props.tickets.originTicket.bundle}
                            </div>
                            <div className="booking-flow__price">
                                {priceEuro(this.props.tickets.originTicket.price)}
                            </div>
                        </div>
                        }
                        {this.props.tickets.returnTicket &&
                        <div>
                            <div className="booking-flow__title">
                                {this.props.tickets.returnTicket.bundle}</div>
                            <div className="booking-flow__price">
                                {priceEuro(this.props.tickets.returnTicket.price)}
                            </div>
                        </div>
                        }
                    </div>
                </div>
                <div className="card card--booking-flow card--booking-flow__total total-booking">
                    <div className="card--booking-flow__container">
                        <h3 className="card__title card__title--booking-flow">SERVICES</h3>
                        <div>
                            <div className="booking-flow__title">
                                Priority Boarding
                            </div>
                            <div className="booking-flow__price">
                                €15
                            </div>
                        </div>
                    </div>
                    <button
                        className="button button--medium button--full-width button--dark">Total {priceEuro(this.getTotalPrice())}</button>
                    <span className="total-booking__bottom-title">BOOKING & PAYMENT</span>
                </div>
                <div className="card card__discount-club discount-club">
                    <div className="card--booking-flow__container">
                        <span className="discount-club__title">DISCOUNT Club price</span>
                        <div className="discount-club__wizz-price">
                            <div className="booking-flow__title">
                                total
                            </div>
                            <div className="booking-flow__price">
                                {priceEuro(this.getWizzClubTotalPrice())}
                            </div>
                        </div>

                        <div className="discount-club__orig-price">
                            <div className="booking-flow__title">
                                ORIGINAL PRICE
                            </div>
                            <div className="booking-flow__price">
                                {priceEuro(this.getTotalPrice())}
                            </div>
                        </div>
                    </div>
                    <button className="button button--medium button--full-width button--primary">Join Discount Club
                    </button>
                </div>
            </div>
        );
    }
}

export default LeftPanel;