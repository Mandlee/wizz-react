import React from "react";
import {randomPricePercentage} from "../helper";

class DateChart extends React.Component {

    renderCharts(flightDate) {
        const DIVS_NUMBER = 10;
        let divs = [];

        for (let i = 0; i < DIVS_NUMBER; i++) {
            // note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            const styles = {
                transform: `translateY(${randomPricePercentage()}%)`
            };

            divs.push(<div className={i === 5 ? 'more-dates__day more-dates__day--selected' : 'more-dates__day'} key={i}>
                <span>TUE {i + 1}</span>
                <div className="more-dates__price-indicator">
                    <div className="more-dates__price-indicator__bar" style={styles}></div>
                </div>
            </div>);
        }
        return divs
    }


    render() {
        return (
            <React.Fragment>
                <div className="more-dates__header">More dates</div>
                <div className="more-dates">
                    {this.renderCharts()}
                </div>
            </React.Fragment>
        )
    }
}

export default DateChart;