import React from 'react';

class SearchFlight extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            stations: {},
            connectedStations: {},
            currentValue: 'default'
        };

        this.handleOriginStationChange = this.handleOriginStationChange.bind(this);
    }


    searchDepartureStation = React.createRef();
    // searchArrivalStation = React.createRef();

    searchFlight = (event) => {
        event.preventDefault();
        const departureStation = this.searchDepartureStation.current.value;
        const arrivalStation = null; //this.searchArrivalStation.current.value;
        console.log(departureStation);
        this.props.history.push(`/booking/select-flight/${departureStation}/${arrivalStation}`);
    };

    handleOriginStationChange(event) {
        console.log(event.target.value);
        const originStationKey = event.target.value;

        //search station connections
        const originStation = this.state.stations.find((element) => {
            return element.iata === originStationKey;
        });

        //copy connections
        const connectedStations = {...originStation.connections};

        //set state connectedStations
        this.setState({connectedStations});
    }

    componentDidMount() {
        fetch(`https://mock-air.herokuapp.com/asset/stations`)
            .then(response => response.json())
            .then(data => {
                this.setState({stations: data})
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    renderStationsOption = (item) => {
        return (
            <option value={item.iata} key={item.iata}>{item.shortName || item.iata}</option>
        );
    };

    renderConnectedStationsOption = (item) => {
        return (
            <option value={item.iata} key={item.iata}>{this.getStationShortName(item.iata)}</option>
        );
    };

    getStationShortName(iata) {
        const station = this.state.stations.find((element) => {
            return element.iata === iata;
        });
        return station.shortName;
    };

    render() {
        return (
            <div className="search-flight">
                <form className="card" onSubmit={this.searchFlight}>
                    <h2>Search flights</h2>
                    <label htmlFor="originStation">Origin</label>
                    <select id="originStation" value={this.state.value} onChange={this.handleOriginStationChange}
                            ref={this.searchDepartureStation}>
                        <option value="origin" key="origin">Choose origin station</option>
                        {Object.keys(this.state.stations).map(key =>
                            this.renderStationsOption(this.state.stations[key])
                        )}
                    </select>
                    <label htmlFor="destinationStation">Destination</label>
                    <select id="originStation" value={this.state.value} onChange={this.handleChange2}
                            ref={this.searchDepartureStation}>
                        <option value="destination" key="destination">Choose your destination station</option>
                        {Object.keys(this.state.connectedStations).map(key =>
                            this.renderConnectedStationsOption(this.state.connectedStations[key])
                        )}
                    </select>
                    Departure
                    <input type="text" placeholder="Departure"/>
                    Return
                    <input type="text" placeholder="Return"/>
                    <button type="submit" className="button button--primary button--medium">Search</button>
                </form>
            </div>
        )
    }
}

export default SearchFlight;