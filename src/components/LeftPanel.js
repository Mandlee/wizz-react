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
                    <h3>Flights</h3>
                    Checked-in bags
                    Return
                    €89
                </div>
                <div className="card card--booking-flow">
                    <h3>Bundle</h3>
                    {this.props.tickets.originTicket &&
                    <h2>
                        {this.props.tickets.originTicket.bundle} - {priceEuro(this.props.tickets.originTicket.price)}
                    </h2>
                    }
                    {this.props.tickets.returnTicket &&
                    <h2>
                        {this.props.tickets.returnTicket.bundle} - {priceEuro(this.props.tickets.returnTicket.price)}
                    </h2>
                    }
                </div>
                <div className="card card--booking-flow">
                    <h3>SERVICES</h3>
                    Priority Boarding
                    €15
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