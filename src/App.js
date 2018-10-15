import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from "./components/Header";
import SearchFlight from "./components/SearchFlight";
import Booking from "./components/Booking";

import './scss/App.scss';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={SearchFlight}/>
                        <Route path="/booking/select-flight/:originStation/:destinationStation/:departureDate/:arrivalDate/" component={Booking}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
