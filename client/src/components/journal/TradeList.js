import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { getItems, deleteItem } from '../../actions/itemActions';
import { connect } from 'react-redux';
import { Container, Button, Table } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types'
import ItemModal from './itemModal';
import DetailsModal from './DetailsModal'
import UpdateModal from './updateModal';
import DeleteModal from './DeleteModal'


class TradeList extends Component{



   static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
   }

    componentDidMount(){
       this.props.getItems();
    }

    componentDidUpdate(prevProps) {
          window.scrollTo(0, 0);
      }
    
    onDeleteClick = (id) => {
      this.props.deleteItem(id);
    }
    
    reverseDate(date){
        let yr = date.substring(0,4);
        let month = date.substring(5,7);
        let day = date.substring(8,10);
        return `${month}-${day}-${yr}`;
     
    }

  
  

    render(){

        const { items } = this.props.item;
        const itemsCopy = items.slice();
        const reverseditems = itemsCopy.reverse();
        
        return(
           <Container>
               <h1>Trade Journal</h1>
               <ItemModal /> 
              <Table className="table" hover>
                   <thead className="thead-light">
                       <tr>
                           <th>Entry Date</th>
                           <th>Exit Date</th>
                           <th>Ticker</th>
                           <th>#Shares</th>
                           <th>Entry</th>
                           <th>Stop</th>
                           <th>Exit</th>
                           <th>1R</th>
                           <th>R Multiple</th>
                           <th>P/L</th>
                           <th>W/L</th>
                           <th>Details</th>
                           <th></th>
                       </tr>
                   </thead>
                   <tbody>
                
                        
                            {reverseditems.map(({ _id, ticker, numShares, entry, exit, risk, rMultiple, stopPrice, pL, entryDate, exitDate, winLose, note, tradeIMG }) => (
                                <CSSTransition key={_id} timeout={1000} classNames="fade">
                                            <tr>
                                                <td>{this.reverseDate(entryDate.substring(0,10))}</td>
                                                <td>{this.reverseDate(exitDate.substring(0,10))}</td>
                                                <td>{ticker}</td>
                                                <td>{numShares}</td>
                                                <td>${entry}</td>
                                                <td>${stopPrice}</td>
                                                <td>${exit}</td>
                                                <td>${risk.toFixed(2)}</td>
                                                {rMultiple >= 0 ? <td>+{rMultiple.toFixed(2)} R</td> : <td>{rMultiple.toFixed(2)} R</td>}
                                                {pL >= 0 ? <td>${pL.toFixed(2)}</td> : <td>-${Math.abs(pL).toFixed(2)}</td>}
                                                {winLose == "Win" ? <td style={{color: "#0a9618"}}>{winLose}</td> : <td style={{color: "red"}}>{winLose}</td>}
                                                <td> <DetailsModal
                                                    _id={_id}
                                                    entryDate={this.reverseDate(entryDate.substring(0,10))}
                                                    exitDate={this.reverseDate(exitDate.substring(0,10))}
                                                    ticker={ticker} 
                                                    numShares={numShares}
                                                    note={note} 
                                                    entry={entry} 
                                                    exit={parseFloat(exit).toFixed(2)} 
                                                    stopPrice={stopPrice}
                                                    winLose={winLose} 
                                                    pL={pL} 
                                                    tradeIMG={tradeIMG}
                                                    /> </td>
                                                <td> <DeleteModal
                                                        ticker={ticker}
                                                        delete={this.onDeleteClick.bind(this, _id)}/>
                                                </td>
                                            </tr> 
                                       

                                </CSSTransition>
                            ))}
                   </tbody>
               </Table>

           </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { getItems, deleteItem })(TradeList);