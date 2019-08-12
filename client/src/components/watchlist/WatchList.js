import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import RiskCalculator from './RiskCalculator';
import AlertWatchlist from './AlertWatchlist';


export default class WatchList extends Component {
    render() {
        return (
            <Container className="flexSplit">
                
                <div className="calculator">
                    <h1>Risk Calculator</h1>
                    <RiskCalculator /> 
                </div>
                
            
                <div className="alertWatchlist">
                    <h1>Watchlist</h1>
                    <AlertWatchlist /> 
                </div>
            </Container>
        )
    }
}