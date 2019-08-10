import React, { Component } from 'react';
import PortfolioValue from './PortfolioValue'
import Calculator from './Calculator'
import ShareResult from './ShareResult'
import { connect } from 'react-redux';

export default class RiskCalculator extends Component {

    
    state = {
        portfolio: 2000,
        riskPercent: 3,
        riskDollarValue: 60,
        ticker: '',
        buyPrice: '',
        stopPrice: '',
        numShares: '',
        target: 0,
        isLong: false,
        totalPrice: '',
        canAfford: false,
        isVisible: false
    }
    

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

            if (name === "riskPercent"){
                let newRisk = this.state.portfolio * (value * .01);
                this.setState({
                    riskDollarValue: newRisk,
                    [name]: value
                })
            }
            else if (name === "portfolio"){
                let newRisks = value * (this.state.riskPercent * .01);
                this.setState({
                    portfolio: value, 
                    riskDollarValue: newRisks
                })
            }
            else {
                this.setState({
                    [name]: value
                })
            }
       
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isVisible: true
        })
    }


    calculate = () => {
        const numOfShares = this.state.riskDollarValue / (this.state.buyPrice - this.state.stopPrice);
        const totalShares = Math.abs(Math.round(numOfShares));
        const totalPrice = totalShares * this.state.buyPrice;
        let canAfford = false; 

        if(totalPrice < this.state.portfolio - 20) {
            canAfford = true;
        }

        const target = parseInt(this.state.buyPrice) + parseInt(((this.state.buyPrice - this.state.stopPrice) * 2))
       
        if(target < this.state.buyPrice){
            this.setState({
                isLong: false,
                target,
                totalPrice,
                numShares: totalShares,
                canAfford
            })
        }
        else{
            this.setState({
                isLong: true,
                target,
                totalPrice,
                numShares: totalShares,
                canAfford
            })
        }

        console.log(this.state.isLong);

     
    }

    resetCaculator = () => {
        this.setState({
            ticker: '',
            buyPrice: '',
            stopPrice: '',
            numShares: '',
            sellStop: '',
            target: 0,
            direction: 'LONG',
            totalPrice: '',
            isLong: true,
            isVisible: false
        })
    }

    render() {


        return (
            <div>

                <PortfolioValue portfolio={this.state.portfolio} riskPercent={this.state.riskPercent} riskDollarValue={this.state.riskDollarValue} handleChange={this.handleChange} /> 
                <hr /> 
                <Calculator handleSubmit={this.handleSubmit} handleChange={this.handleChange} ticker={this.state.ticker} buyPrice={this.state.buyPrice} stopPrice={this.state.stopPrice} calculate={this.calculate} resetCaculator={this.resetCaculator} /> 
                <hr /> 
                {this.state.isVisible && <ShareResult direction={this.state.direction} numShares={this.state.numShares} totalPrice={this.state.totalPrice} isLong={this.state.isLong} stopPrice={this.state.stopPrice} target={this.state.target} canAfford={this.state.canAfford}/> }


            </div>
        )
    }
}

/*** Must create action to update state when it changes... ***/
/*
const mapStateToProps = state => ({
    watch: state.watch
})

export default connect(mapStateToProps, null)(RiskCalculator)
*/