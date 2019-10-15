import React, { Component } from 'react';
import { Container, Button, Table } from 'reactstrap';
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

            if(winners.length > 0){
                let totalWins = winners.reduce((accum, currentVal) =>(
                    {pL: accum.pL + currentVal.pL}
                ))
                avgWin = totalWins.pL / winners.length
            }
            

            //Calculate average loss
            let losers = items.filter(trade => {
                if(trade.pL < 0){
                    return trade.pL
                }
            })

           
            if(losers.length > 0){
                let totalLosers = losers.reduce((accum, currentVal) => (
                    {pL: accum.pL + currentVal.pL}
                ))
                avgLoss = totalLosers.pL / losers.length
            }
            
            
        }
       
        const styles = {
            pTitle: {
                color: "rgba(38, 43, 62, 0.6)",
                marginBottom: "0"
            },
            pValue: {
                color: "#262B3E",
                fontSize: "1.5rem",
                fontWeight: "bold"
            }
        }

        return (
            <Container>
                <h1>Current Portfolio</h1>
                <div className="progressWrapper">
                    <div className="progressRow yellow_underline">
                        <div><p style={styles.pTitle}>Account Size</p><p style={styles.pValue}>${this.props.totalPortfolio.toFixed(2)}</p></div>
                        <div><p style={styles.pTitle}>Total P/L</p><p style={styles.pValue}>{totalPL.pL > 0 ? <td>${totalPL.pL.toFixed(2)}</td> : <td>-${Math.abs(totalPL.pL.toFixed(2))}</td> }</p></div>
                        <div><p style={styles.pTitle}>Number of Trades</p><p style={styles.pValue}>{items.length}</p></div>
                    </div>

                    <div className="progressRow yellow_underline">
                        <div><p style={styles.pTitle}>Average Win</p><p style={styles.pValue}>${avgWin.toFixed(2)}</p></div>
                        <div><p style={styles.pTitle}>Average Loss</p><p style={styles.pValue}>-${Math.abs(avgLoss).toFixed(2)}</p></div>
                        <div><p style={styles.pTitle}>Win/Lose Ratio</p><p style={styles.pValue}>{winLoseRatio.toFixed(2)}%</p></div>

                    </div>
                    
                    <div>
                        <label style={{display: "inline"}}>Original Account Size $</label>
                        <input className="portfolioValue input" value={this.props.portfolio} placeholder={this.props.portfolio} name="portfolio" onChange={this.handleChange} size="1" /> 
                    </div>
                </div>
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