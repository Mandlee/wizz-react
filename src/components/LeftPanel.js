import React from 'react';
import {priceEuro} from "../helper";

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
        console.log(this.props.tickets);
        return (
            <div className="left-panel">
                <div className="card card--booking-flow">
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
                <div className="card card--booking-flow">
                    <h3 className="card__title card__title--booking-flow">Bundle</h3>
                    {this.props.tickets.originTicket &&
                    <div>
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
                <div className="card card--booking-flow">
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
                <div className="card card--booking-flow">
                    <button
                        className="button button--medium button--dark">Total {priceEuro(this.getTotalPrice())}</button>
                    <span>BOOKING & PAYMENT</span>
                </div>
                <div className="card">
                    DISCOUNT Club price
                    total {priceEuro(this.getTotalPrice())}
                    ORIGINAL PRICE {priceEuro(this.getWizzClubTotalPrice())}
                    <button className="button button--medium button--primary">Join Discount Club</button>
                </div>
            </div>
        );
    }
}

export default LeftPanel;