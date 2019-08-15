import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { setPortfolioValue, getTotalPortfolio } from '../../actions/watchActions'


class Progress extends Component {


    componentDidMount(){
        this.updateTotal();
    }


    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;


        if (name === "portfolio"){

            let newRisks = value * (this.props.riskPercent * .01);
            this.props.setPortfolioValue(value, newRisks)
            this.updateTotal();
        }
    }

    updateTotal = () => {
        const { items } = this.props.item;
        let totalPl = 0;

        if(items.length > 0 ){
            totalPl = items.reduce((accum, currentVal) => (
                {pL: accum.pL + currentVal.pL}
            ));

            this.props.getTotalPortfolio(totalPl.pL);
        }
    }


    render() {
        const { items } = this.props.item;
        let totalPL = 0;
        let winLoseRatio = 0;
        let totalR = 0;
        let avgWin = 0;
        let avgLoss = 0;

       //Make sure array is not empty (trades available)
        if(items.length > 0){
             //Calculate total PL
            totalPL = items.reduce((accum, currentVal) => (
                {pL: accum.pL + currentVal.pL}
            ));

            let wins = items.filter(trade => {
                return trade.winLose == "Win"
            })

            winLoseRatio = (wins.length / items.length) * 100

            //Calculate total R
            totalR = items.reduce((accum, currentVal) => ( 
                 {rMultiple: accum.rMultiple + currentVal.rMultiple}
            ));

            //Calcualte average win
            let winners = items.filter(trade => {
                if(trade.pL >= 0){
                    return trade.pL
                }
            })
            let totalWins = winners.reduce((accum, currentVal) =>(
                {pL: accum.pL + currentVal.pL}
            ))
            avgWin = totalWins.pL / winners.length

            //Calculate average loss
            let losers = items.filter(trade => {
                if(trade.pL < 0){
                    return trade.pL
                }
            })

            let totalLosers = losers.reduce((accum, currentVal) => (
                {pL: accum.pL + currentVal.pL}
            ))
            avgLoss = totalLosers.pL / losers.length
        }
       


        return (
            <Container>
                <h1>Progress</h1>
        
                <h3>Account Size: ${this.props.totalPortfolio.toFixed(2)}</h3>
                <h3>Risk Per Trade: {this.props.riskPercent}% (${this.props.riskDollarValue.toFixed(2)}) of total account size.</h3>
                <h3>Number of Trades: {items.length}</h3>
                <h3>Total R: {totalR.rMultiple.toFixed(2)}</h3>
                {totalPL.pL > 0 ? <h3>Total P/L ${totalPL.pL.toFixed(2)}</h3> : <h3>Total P/L -${Math.abs(totalPL.pL.toFixed(2))}</h3> }
                <h3>W/L: {winLoseRatio.toFixed(2)}%</h3>
                <h3>Average Win: ${avgWin.toFixed(2)}</h3>
                <h3>Average Loss: -${Math.abs(avgLoss).toFixed(2)}</h3>

                <label>Original Account Size</label>
                <input className="portfolioValue input" value={this.props.portfolio} placeholder={this.props.portfolio} name="portfolio" onChange={this.handleChange} size="4" /> 
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    portfolio: state.watch.portfolio,
    riskPercent: state.watch.riskPercent,
    riskDollarValue: state.watch.riskDollarValue,
    item: state.item,
    totalPortfolio: state.watch.totalPortfolio
});

export default connect(mapStateToProps, { setPortfolioValue, getTotalPortfolio })(Progress)