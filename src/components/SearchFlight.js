import React from 'react';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {DateRangePicker} from 'react-dates';
import moment from 'moment';
import {getStations} from "../api";
import Loading from "./Loading";

class SearchFlight extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            stations: {},
            connectedStations: {},
            origin: {},
            destination: {},
            startDate: null,
            endDate: null,
            errors: {},
            loading: true
        };

        this.handleOriginStationChange = this.handleOriginStationChange.bind(this);
        this.handleDestinationStationChange = this.handleDestinationStationChange.bind(this);
    }


    searchDepartureStation = React.createRef();
    searchArrivalStation = React.createRef();

    searchFlight = (event) => {
        event.preventDefault();

        if (this.isValidForm()) {
            const departureStation = this.searchDepartureStation.current.value;
            const arrivalStation = this.searchArrivalStation.current.value;
            const startDate = this.state.startDate.format('YYYY-MM-DD');
            const endDate = this.state.endDate ? this.state.endDate.format('YYYY-MM-DD') : ``;
            this.props.history.push(`/booking/select-flight/${departureStation}/${arrivalStation}/${startDate}/${endDate}`);
        }
    };

    handleOriginStationChange(event) {
        console.log(event.target.value);
        const origin = event.target.value;

        this.updateConnectedStations(origin);

        //set state connectedStations
        this.setState({origin});
    }

    handleDestinationStationChange(event) {
        this.setState({destination: event.target.value});
    }

    updateConnectedStations(originStationKey) {
        //search station connections
        const originStation = this.state.stations.find(element => element.iata === originStationKey);

        if (originStation) {
            //copy connections
            const connectedStations = {...originStation.connections};

            //set state
            this.setState({connectedStations});
        }
    }

    componentDidMount() {
        const localStorageRef = localStorage.getItem('lastSearch');

        getStations().then((stations) => {
            this.setState({stations});

            // set state loaded
            const loading = false;
            this.setState({loading});

            if (localStorageRef) {
                const localStorageState = JSON.parse(localStorageRef);

                this.updateConnectedStations(localStorageState.origin);

                this.setState({
                    origin: localStorageState.origin,
                    destination: localStorageState.destination,
                    startDate: localStorageState.startDate ? moment(localStorageState.startDate) : localStorageState.startDate,
                    endDate: localStorageState.endDate ? moment(localStorageState.endDate) : localStorageState.endDate
                })
            }
        });

        //After back booking flight page, set apps state station null for header
        this.props.setStations(null);
    }

    componentDidUpdate() {
        const savedItem = {
            origin: this.searchDepartureStation.current.value,
            destination: this.searchArrivalStation.current.value,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        };
        localStorage.setItem(
            'lastSearch',
            JSON.stringify(savedItem)
        );
    }

    renderStationsOption = (item) => {
        return (
            <option value={item.iata} key={item.iata}>{item.shortName}</option>
        );
    };

    renderConnectedStationsOption = (item) => {
        return (
            <option value={item.iata} key={item.iata}>{this.getStationShortName(item.iata)}</option>
        );
    };

    getStationShortName(iata) {
        const {shortName} = this.state.stations.find(element => element.iata === iata);
        return shortName;
    };

    isValidForm() {
        let errors = {};
        let isValidForm = true;

        // Not select origin station
        if (this.searchDepartureStation.current.value === 'origin') {
            isValidForm = false;
            errors['origin'] = 'Select origin station'
        }

        // Not select destination station
        if (this.searchArrivalStation.current.value === 'destination') {
            isValidForm = false;
            errors['destination'] = 'Select your destination'
        }

        // Not select start flight date
        if (!this.state.startDate) {
            isValidForm = false;
            errors['startDate'] = 'Select your flight date'
        }

        this.setState({errors});

        return isValidForm
    }

    render() {
        return (
            <React.Fragment>
                {this.state.loading &&
                <Loading isFullPage={true}/>
                }
                <div className="search-flight">
                    <form className="card search-flight__card" onSubmit={this.searchFlight}>
                        <h2 className="search-flight__heading">Search flights</h2>
                        <label htmlFor="originStation" className="search-flight__label">Origin</label>
                        <select id="originStation" className="search-flight__station-select" value={this.state.origin}
                                onChange={this.handleOriginStationChange}
                                ref={this.searchDepartureStation}>
                            <option value="origin" key="origin">Choose origin station</option>
                            {Object.keys(this.state.stations).map(key =>
                                this.renderStationsOption(this.state.stations[key])
                            )}
                        </select>
                        {this.state.errors['origin'] &&
                        <span style={{color: "red"}}>{this.state.errors['origin']}</span>
                        }
                        <label htmlFor="destinationStation" className="search-flight__label">Destination</label>
                        <select id="originStation" className="search-flight__station-select"
                                value={this.state.destination}
                                onChange={this.handleDestinationStationChange}
                                ref={this.searchArrivalStation}>
                            <option value="destination" key="destination">Choose your destination station</option>
                            {Object.keys(this.state.connectedStations).map(key =>
                                this.renderConnectedStationsOption(this.state.connectedStations[key])
                            )}
                        </select>
                        {this.state.errors['destination'] &&
                        <span style={{color: "red"}}>{this.state.errors['destination']}</span>
                        }
                        <label htmlFor="originStation" className="search-flight__label">Date</label>
                        <div className="search-flight__select-date">
                            <DateRangePicker
                                startDateId="startDateId"
                                endDateId="endDateId"
                                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                onDatesChange={({startDate, endDate}) => this.setState({startDate, endDate})}
                                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                onFocusChange={focusedInput => this.setState({focusedInput})} // PropTypes.func.isRequired,
                            />
                            {this.state.errors['startDate'] &&
                            <span style={{color: "red"}}>{this.state.errors['startDate']}</span>
                            }
                        </div>
                        <button type="submit" className="button button--primary button--medium">Search</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default SearchFlight;