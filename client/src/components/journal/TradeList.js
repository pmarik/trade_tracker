import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { getItems, deleteItem } from '../../actions/itemActions';
import { connect } from 'react-redux';
import { Container, Button, Table } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types'
import ItemModal from './itemModal';



class TradeList extends Component{
   static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
   }

    componentDidMount(){
       this.props.getItems();
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
        
        
        return(
           <Container>
               <h3>Trade Journal</h3>
               <ItemModal /> 
               <Table className="table" hover>
                   <thead className="thead-light">
                       <tr>
                           <th>Ticker</th>
                           <th>Date Exit</th>
                           <th>Entry</th>
                           <th>Exit</th>
                           <th>P/L</th>
                           <th>W/L</th>
                       </tr>
                   </thead>
                   <tbody>
                
                        
                            {items.map(({ _id, ticker, entry, exit, fees, pL, date }) => (
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                            <tr>
                                                <td>{ticker}</td>
                                                <td>{this.reverseDate(date.substring(0,10))}</td>
                                                <td>{entry}</td>
                                                <td>{exit}</td>
                                                <td>{pL}</td>
                                                <td>{fees}</td>
                                                <td>       <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                        >&times;</Button></td>
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