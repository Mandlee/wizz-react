import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from "./components/Header";
import SearchFlight from "./components/SearchFlight";
import Booking from "./components/Booking";

import './scss/App.scss';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            originStation: null,
            destinationStation: null
        }
    }

    setStations = (originStation, destinationStation) =>{
        console.log(originStation, destinationStation);
        this.setState({originStation, destinationStation})
    };

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header {...this.state}/>
                    <Switch>
                        <Route exact path="/" component={SearchFlight}/>
                        <Route path="/booking/select-flight/:originStation/:destinationStation/:departureDate/:arrivalDate?"
                               render={(props) => <Booking setStations={this.setStations} {...props} />}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
