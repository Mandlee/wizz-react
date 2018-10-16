import React from "react";
import {randomPricePercentage} from "../helper";
import moment from "moment";
import closeIcon from '../svgs/close.svg'

class DateChart extends React.Component {

    renderCharts = (flightDate) => {
        const DIVS_NUMBER = 30;
        const startDate = moment(flightDate).subtract(DIVS_NUMBER / 2, 'day');
        let divs = [];

        for (let i = 0; i < DIVS_NUMBER; i++) {
            const percentage = randomPricePercentage();
            const styles = {
                transform: `translateY(${percentage}%)`
            };
            let indicator;


            if (percentage <= 30) {
                indicator = <div className="more-dates__price-indicator__bar--no-flight">
                    <img className="more-dates__price-indicator__bar__close-img" src={closeIcon} alt="No flight"/>
                </div>
            } else {
                indicator = <div className="more-dates__price-indicator__bar" style={styles}/>
            }

            let divClassName = 'more-dates__day';

            if (moment(startDate).add(i, 'day').isSame(flightDate)) {
                divClassName += ' more-dates__day--selected'
            }

            if (percentage <= 30) {
                divClassName += ' more-dates__day--no-flight'
            }


            divs.push(<div className={divClassName} key={i} onClick={()=> this.props.onSelectDate(moment(startDate).add(i, 'day'), this.props.ticketType)}>
                <span>{moment(startDate).add(i, 'day').format(`ddd D`)}</span>
                <div className="more-dates__price-indicator">
                    {indicator}
                </div>
            </div>);
        }
        return divs
    };

    shouldComponentUpdate() {
        //rendering just once
        return false;
    }

    render() {
        return (
            <React.Fragment>
                <div className="more-dates__header">
                    <span className="more-dates__header__title">More dates</span>
                    <div className="more-dates__header__btn-container">
                        <button className="button button--link button--small discount-club-promo__cta">Calendar</button>
                        <button
                            className="button button--link button--link--inactive button--small discount-club-promo__cta">Chart
                        </button>
                    </div>
                </div>
                <div className="more-dates">
                    <div className="more-dates__control-icon"><i className="icon icon__left-arrow"/></div>
                    <div className="more-dates__date-bars">{this.renderCharts(this.props.selectedDate)}</div>
                    <div className="more-dates__control-icon"><i className="icon icon__right-arrow"/></div>
                </div>
            </React.Fragment>
        )
    }
}

export default DateChart;