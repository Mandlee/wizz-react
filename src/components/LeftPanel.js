import React from 'react';

const LeftPanel = props => (
    <div className="left-panel">
        <h3>Flights</h3>
        Checked-in bags
        Return
        €129
        €89
        <h3>Bundle</h3>
        Basic
        <h3>PASSENGERS</h3>
        Cabin bags
        Checked-in bags
        Seats
        €10
        €0
        €0
        <h3>SERVICES</h3>
        Priority Boarding
        €15
        <button className="button button--medium button--dark">Total</button>
        BOOKING & PAYMENT

        <div className="card">
            DISCOUNT Club price
            total €182
            ORIGINAL PRICE €226
            <button className="button button--medium button--primary">Join Discount Club</button>
        </div>
    </div>
);

export default LeftPanel;