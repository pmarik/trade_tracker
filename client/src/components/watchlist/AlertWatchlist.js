import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteWatchItem } from '../../actions/watchActions'
import { CSSTransition } from 'react-transition-group';


class AlertWatchlist extends Component {

    

    deleteItem = (id) => {
        this.props.deleteWatchItem(id);
    }

    render() {
        return (
            <div>
                <table className="watchlistTable">
                    <thead>
                        <tr>
                            <th>Ticker</th>
                            <th># Shares</th>
                            <th>Buy</th>
                            <th>Stop</th>
                            <th></th>
                        </tr>
                    </thead>


                    <tbody>
                        {this.props.watchlist.map(({ watchTicker, watchShares, watchBuy, watchStop, watchIsLong, watchId}) => (
                            <CSSTransition key={watchId} timeout={500} classNames="fade">
                                <tr>
                                    <td>{watchTicker}</td>
                                    <td>{watchShares}</td>
                                    <td>{watchBuy}</td>
                                    <td>{watchStop}</td>
                                    <td>
                                        <button onClick={() => this.deleteItem(watchId)} style={{backgroundColor: "#b8757b"}}>X</button>
                                    </td>
                                </tr>
                            </CSSTransition>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    watchlist: state.watch.watchlist,
})

export default connect(mapStateToProps, { deleteWatchItem })(AlertWatchlist);