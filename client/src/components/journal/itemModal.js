import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

import { connect } from 'react-redux';
import { addItem } from '../../actions/itemActions';
import PropTypes from 'prop-types';


class ItemModal extends Component{
    state = {
        modal: false,
        name: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        const name = e.target.name

        if(name == "win"){
            this.setState({
                winLose: "win"
            })
        }
        else if(name == "lose"){
            this.setState({
                winLose: "lose"
            })
        }
        else{
            this.setState({
                [e.target.name]: e.target.value
            })
        }
       
    }

    // Helper function to calculate 1R per trade
    calcR = (buy, stop, shares) => {
        if (buy > stop){
            return (buy - stop) * shares
        }
        else{
            return (stop - buy) * shares
        }
    }

    calcRMultiple = (buy, exit, stop, shares, r) => {
        if( buy > stop ){
            console.log("buy: " + buy + ", stop: " + stop + ", exit: " + exit + ", shares: " + shares + ", r: " + r)
            return ((exit - buy) * shares) / r
        }
        else{
            return ((buy - exit) * shares) / r
        }
    }


    onSubmit = e => {
        e.preventDefault();


        //initialize win lose values
        const WIN = "Win"
        const LOSE = "Lose"
        
        let calcPL; // Initialize P/L 
        let winLoseResult; // Initialize win/lose 
        let r; // initial 1 R risk value per trade


        // Calculate P/L 
        if(parseFloat(this.state.entry) > parseFloat(this.state.stopPrice)) {
            calcPL = (this.state.exit - this.state.entry) * this.state.numShares;

            //Assign win/lose for long position
            if(parseFloat(this.state.exit) > parseFloat(this.state.entry)){
                winLoseResult = WIN;
            }
            else{
                winLoseResult = LOSE
            }

            //calculate 1R
            r = this.calcR(parseFloat(this.state.entry,10), parseFloat(this.state.stopPrice), this.state.numShares)
        }
        else{
            calcPL = (this.state.entry - this.state.exit) * this.state.numShares;
            
            //Assign win/lose for short position
            if(parseFloat(this.state.exit) < parseFloat(this.state.entry)){
                winLoseResult = WIN;
            }
            else{
                winLoseResult = LOSE
            }

            //calculate 1R
            r = this.calcR(parseFloat(this.state.stopPrice), parseFloat(this.state.entry), parseFloat(this.state.numShares))
        }


        //Calculate R multiple with PL
        const rMultiple = this.calcRMultiple(parseFloat(this.state.entry), parseFloat(this.state.exit), parseFloat(this.state.stopPrice), parseFloat(this.state.numShares), r)
      

        const newItem = {
            ticker: this.state.ticker,
            numShares: this.state.numShares,
            entry: this.state.entry,
            exit: this.state.exit,
            stopPrice: this.state.stopPrice,
            pL: calcPL,
            entryDate: this.state.entryDate,
            exitDate: this.state.exitDate,
            winLose: winLoseResult,
            note: this.state.note,
            risk: r,
            rMultiple: rMultiple,
            tradeIMG: this.state.tradeIMG
        
        }


        this.props.addItem(newItem);

        this.toggle();
    }

    render(){
        return (
            <div>

                { this.props.isAuthenticated ? <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}>
                    
                    Add Trade</Button> : <h4 className="mb-3 ml-4">Please log in to manage items</h4> }
                

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>

                    <ModalHeader toggle={this.toggle}>Add To Trades</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit} >
                            <FormGroup className="itemModal">
                                <Label for="item"><i>Ticker</i></Label>
                                <Input
                                    type="text"
                                    name="ticker"
                                    id="item"
                                    placeholder="Add ticker name"
                                    onChange={this.onChange}
                                    />
                                <Label for="item"><i>Number of Shares</i></Label>
                                <Input
                                    type="number"
                                    step="1"
                                    name="numShares"
                                    id="item"
                                    placeholder="Add number of shares"
                                    onChange={this.onChange}
                                    />
                                <Label for="item"><i>Entry</i></Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    name="entry"
                                    id="item"
                                    placeholder="Add entry price"
                                    onChange={this.onChange}
                                    />
                                <Label for="item"><i>Stop</i></Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    name="stopPrice"
                                    id="item"
                                    placeholder="Add stop price"
                                    onChange={this.onChange}
                                    />
                                <Label for="item"><i>Exit</i></Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    name="exit"
                                    id="item"
                                    placeholder="Add exit price"
                                    onChange={this.onChange}
                                    />
                                <Label for="item"><i>Entry Date</i></Label>
                                <Input
                                    type="date"
                                    name="entryDate"
                                    id="item"
                                    onChange={this.onChange}
                                    />
                                <Label for="item"><i>Exit Date</i></Label>
                                <Input
                                    type="date"
                                    name="exitDate"
                                    id="item"
                                    onChange={this.onChange}
                                    />


                                <Label for="item"><i>Note</i></Label>
                                <textarea 
                                    rows="4"
                                    name="note"
                                    placeholder="Additional notes..."
                                    onChange={this.onChange}></textarea>


                                 <Label for="item"><i>Chart Reference Image</i></Label>
                                <Input
                                    type="text"
                                    name="tradeIMG"
                                    id="item"
                                    placeholder="Link to image of trade"
                                    onChange={this.onChange}
                                    />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block>
                                        Add Trade</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addItem })(ItemModal)