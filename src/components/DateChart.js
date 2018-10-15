import React from "react";
import {randomPricePercentage} from "../helper";
import moment from "moment";

class DateChart extends React.Component {

    renderCharts = (flightDate) => {
        const DIVS_NUMBER = 30;
        const startDate = moment(flightDate).subtract(DIVS_NUMBER / 2, 'day');
        let divs = [];

        for (let i = 0; i < DIVS_NUMBER; i++) {
            const styles = {
                transform: `translateY(${randomPricePercentage()}%)`
            };

            divs.push(<div
                className={moment(startDate).add(i, 'day').isSame(flightDate) ? 'more-dates__day more-dates__day--selected' : 'more-dates__day'}
                key={i}>
                <span>{moment(startDate).add(i, 'day').format(`ddd D`)}</span>
                <div className="more-dates__price-indicator">
                    <div className="more-dates__price-indicator__bar" style={styles}/>
                </div>
            </div>);
        }
        return divs
    };

    shouldComponentUpdate() {
        //rendering once
        return false;
    }

    render() {
        return (
            <React.Fragment>
                <div className="more-dates__header">More dates</div>
                <div className="more-dates">
                    <div className="more-dates__control-icon-left"><i className="icon icon__left-arrow"/></div>
                    <div className="more-dates__date-bars">{this.renderCharts(this.props.selectedDate)}</div>
                    <div className="more-dates__control-icon-right"><i className="icon icon__right-arrow"/></div>
                </div>
            </React.Fragment>
        )
    }
}

export default DateChart;