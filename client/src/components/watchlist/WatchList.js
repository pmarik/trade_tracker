import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import RiskCalculator from './RiskCalculator';
import AlertWatchlist from './AlertWatchlist';


export default class WatchList extends Component {
    render() {
        return (
            <Container className="flexSplit">
                
                <div className="calculator boxStyle">
                    <h1>Risk Calculator</h1>
                    <RiskCalculator /> 
                </div>
                
            
                <div className="alertWatchlist boxStyle">
                    <h1>Watchlist</h1>
                    <AlertWatchlist /> 
                </div>
            </Container>
        )
    }
}