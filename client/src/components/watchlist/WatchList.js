import React, { Component } from 'react';
import { Container } from 'reactstrap';
import RiskCalculator from './RiskCalculator';
import AlertWatchlist from './AlertWatchlist';


export default class WatchList extends Component {
    render() {
        return (
            <Container className="flexSplit">
                
                <div className="calculator">
                    <h1 style={{marginBottom: "0.5rem"}}>Risk Calculator</h1>
                    <RiskCalculator /> 
                </div>
                
            
                <div className="alertWatchlist">
                    <h1 style={{marginBottom: "0.5rem"}}>Watchlist</h1>
                    <AlertWatchlist /> 
                </div>
            </Container>
        )
    }
}