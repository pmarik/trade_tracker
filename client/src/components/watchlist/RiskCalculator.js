import React, { Component } from 'react';
import PortfolioValue from './PortfolioValue'
import Calculator from './Calculator'
import ShareResult from './ShareResult'
import { connect } from 'react-redux';
import { setRiskPercent, setPortfolioValue, calculateRisk, resetStateCalculator, handleCalculatorChange, addWatchlistItem, getTotalPortfolio} from '../../actions/watchActions'
import uuid from 'uuid';

class RiskCalculator extends Component {

    
    state = {
        isLong: false,
        canAfford: false,
        isVisible: false
    }

    componentDidMount(){
        const { items } = this.props.item;
        let totalPl = 0;

        if(items.length > 0 ){
            totalPl = items.reduce((accum, currentVal) => (
                {pL: accum.pL + currentVal.pL}
            ));

            this.props.getTotalPortfolio(totalPl.pL);
          
        }
      

    }
    

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

            if (name === "riskPercent"){
                let newRisk = this.props.totalPortfolio * (value * .01);
                this.props.setRiskPercent(value, newRisk)
            }
           
            else {
                this.props.handleCalculatorChange(name, value)
            }
       
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isVisible: true
        })
    }


    calculate = () => {
        const numOfShares = this.props.riskDollarValue / (this.props.buyPrice - this.props.stopPrice);
        const totalShares = Math.abs(Math.round(numOfShares));
        const totalPrice = totalShares * this.props.buyPrice;
        let canAfford = false; 

        if(totalPrice < this.props.totalPortfolio - 20) {
            canAfford = true;
        }

        const target = parseFloat(this.props.buyPrice) + parseFloat(((this.props.buyPrice - this.props.stopPrice) * 2))
       
        if(target < this.props.buyPrice){
            this.setState({
                isLong: false,
                canAfford
            })
        }
        else{
            this.setState({
                isLong: true,
                canAfford
            })
        }

        this.props.calculateRisk(target, totalPrice, totalShares)

        if(canAfford){
            const id = uuid();
            this.props.addWatchlistItem(this.props.ticker, totalShares, this.props.buyPrice, this.props.stopPrice, id)
        }
     
    }

    resetCaculator = () => {
        this.setState({
            isLong: true,
            isVisible: false
        })

        this.props.resetStateCalculator();
    }

    render() {


        return (
            <div>
                <PortfolioValue portfolio={this.props.totalPortfolio} riskPercent={this.props.riskPercent} riskDollarValue={this.props.riskDollarValue} handleChange={this.handleChange} /> 
                <hr /> 
                <Calculator handleSubmit={this.handleSubmit} handleChange={this.handleChange} ticker={this.props.ticker} buyPrice={this.props.buyPrice} stopPrice={this.props.stopPrice} calculate={this.calculate} resetCaculator={this.resetCaculator} /> 
                <hr /> 
                {this.state.isVisible && <ShareResult numShares={this.props.numShares} totalPrice={this.props.totalPrice} isLong={this.state.isLong} stopPrice={this.props.stopPrice} target={this.props.target} canAfford={this.state.canAfford}/> }


            </div>
        )
    }
}


const mapStateToProps = state => ({
    watchlist: state.watch.watchlist,
    portfolio: state.watch.portfolio,
    riskPercent: state.watch.riskPercent,
    riskDollarValue: state.watch.riskDollarValue,
    ticker: state.watch.ticker,
    buyPrice: state.watch.buyPrice,
    stopPrice: state.watch.stopPrice,
    numShares: state.watch.numShares,
    target: state.watch.target,
    totalPrice: state.watch.totalPrice,
    totalPortfolio: state.watch.totalPortfolio,
    item: state.item
})

export default connect(mapStateToProps, {setRiskPercent, setPortfolioValue, getTotalPortfolio, calculateRisk, resetStateCalculator, handleCalculatorChange, addWatchlistItem })(RiskCalculator)




