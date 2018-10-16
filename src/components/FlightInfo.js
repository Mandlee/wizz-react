import React from 'react';
import moment from "moment/moment";
import {priceEuro} from "../helper";

const FlightInfo = props => {
    const {departure, arrival, carrierCode, fare} = props.ticket;

    return (
        <div className="booking-flow__flight-info flight-info">
            <span className="flight-info__date">
                <span className="flight-info__month"> {moment(departure).format('MMM')} </span>
                <span className="flight-info__day"> {moment(departure).format('DD')} </span>
            </span>
            <span
                className="flight-info__stations">{props.fullNameOrigStation} - {props.fullNameDestStation}</span>
            <span
                className="flight-info__time"> {moment(departure).format('HH:mm')} – {moment(arrival).format('HH:mm')} ({carrierCode})
            </span>
            <div className="booking-flow__title">
                {fare.bundle}
            </div>
            <div className="booking-flow__price">
                {priceEuro(fare.price)}
            </div>
        </div>
    )
};

export default FlightInfo;