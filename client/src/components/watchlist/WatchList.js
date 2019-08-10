import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import RiskCalculator from './RiskCalculator';
import AlertWatchlist from './AlertWatchlist';


export default class WatchList extends Component {
    render() {
        return (
            <Container>
                <h1>Watchlist</h1>
                <div className="calculator">
                    <RiskCalculator /> 
                </div>
                <div className="AlertWatchlist">
                    <AlertWatchlist /> 
                </div>
            </Container>
        )
    }
}