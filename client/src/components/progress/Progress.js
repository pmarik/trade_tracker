import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import { connect } from 'react-redux';

class Progress extends Component {

    render() {
        const { items } = this.props.item;

        const totalPL = items.reduce((accum, currentVal) => (
            {pL: accum.pL + currentVal.pL}
        ));

        const portfolioTotal = this.props.portfolio + totalPL.pL;

        return (
            <Container>
                <h1>Progress</h1>
                <h3>Account Size: {this.props.portfolio}</h3>
                <h3>Total Account Size: {portfolioTotal}</h3>
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

export default connect(mapStateToProps, null)(Progress)