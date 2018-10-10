import React from 'react';

const SoldOut = props => {
    return (
        <div className="sold-out">
            <p>
                <i className="icon icon__sold-out"/>
            </p>
            <span>Sorry, No flights on this date.</span>
        </div>
    )
};

export default SoldOut;