import React, { Component } from 'react';
import { connect } from 'react-redux';



class AlertWatchlist extends Component {


    render() {


        return (
            <div>
                <thead>
                    <th>Ticker</th>
                    <th># Shares</th>
                    <th>Buy</th>
                    <th>Stop</th>
                </thead>


                <tbody>
                    {this.props.watchlist.map(({watchTicker, watchShares, watchBuy, watchStop}) => (
                        <tr>
                            <td>{watchTicker}</td>
                            <td>{watchShares}</td>
                            <td>{watchBuy}</td>
                            <td>{watchStop}</td>
                        </tr>
                    ))}
                </tbody>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    watchlist: state.watch.watchlist,
    ticker: state.watch.ticker,
    numShares: state.watch.numShares,
    buyPrice: state.watch.buyPrice,
    stopPrice: state.watch.stopPrice,
    target: state.watch.target

})

export default connect(mapStateToProps, null)(AlertWatchlist);