import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { setPortfolioValue } from '../../actions/watchActions'

class Progress extends Component {


    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "portfolio"){
            let newRisks = value * (this.props.riskPercent * .01);
            this.props.setPortfolioValue(value, newRisks)
        }
    }

    render() {
        const { items } = this.props.item;
        let totalPL = 0;
        let portfolioTotal = this.props.portfolio;

        if(items.length > 0){
            totalPL = items.reduce((accum, currentVal) => (
                {pL: accum.pL + currentVal.pL}
            ));

            portfolioTotal = parseInt(this.props.portfolio, 10) + parseInt(totalPL.pL, 10);
        }

      

        

        return (
            <Container>
                <h1>Progress</h1>
        
                <label>Original Account Size</label>
                <input className="portfolioValue input" value={this.props.portfolio} placeholder={this.props.portfolio} name="portfolio" onChange={this.handleChange} size="4" /> 

              
                <h3>Account Size: {portfolioTotal}</h3>
                <h3>Risk Per Trade: {this.props.riskPercent}% $({this.props.riskDollarValue})</h3>
                <h4>Number of Trades: {items.length}</h4>
                <h4>Total R</h4>
                <h4>Total P/L ${totalPL.pL}</h4>
                <h4>W/L %</h4>

            </Container>
        )
    }
}

const mapStateToProps = state => ({
    portfolio: state.watch.portfolio,
    riskPercent: state.watch.riskPercent,
    riskDollarValue: state.watch.riskDollarValue,
    item: state.item
});

export default connect(mapStateToProps, {setPortfolioValue})(Progress)