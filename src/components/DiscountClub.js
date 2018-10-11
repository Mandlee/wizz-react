import React from 'react';

const DiscountClub = props => {
    return (
        <div className="card card__discount-promo">
            <div className="discount-club-promo">
                <button className="button button--secondary button--medium">Show Discount Club fares</button>
                <ul className="discount-club-promo__list">
                    <li>€10 discount on flights</li>
                    <li>€5 discount on baggages</li>
                </ul>
                <button className="button button--link button--medium discount-club-promo__cta">Read More</button>
            </div>
        </div>
    )
};

export default DiscountClub;