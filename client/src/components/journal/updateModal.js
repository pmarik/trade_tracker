import React, { Component } from 'react';
import {
    Button,
    Container,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

import { connect } from 'react-redux';
import { updateItem } from '../../actions/itemActions';
import axios from 'axios';



class UpdateTrade extends Component{
    state = {}

    componentDidMount(){
       axios.get(`/api/items/${this.props.match.params.id}`)
        .then(res => {
            this.setState({
                
                _id: res.data._id,
                ticker: res.data.ticker,
                numShares: res.data.numShares,
                entry: res.data.entry,
                exit: res.data.exit,
                stopPrice: res.data.stopPrice,
                entryDate: res.data.entryDate,
                exitDate: res.data.exitDate,
                note: res.data.note,
                tradeIMG: res.data.tradeIMG
            })

        })
        .catch(err => console.log(err))
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


        this.props.updateItem(this.state._id, newItem);

        //window.location = '/journal';
        this.props.history.push('/journal');
    }

    render(){

        return (
                <Container>
                    <strong>Edit Trade</strong>
                        <Form onSubmit={this.onSubmit} >
                            <FormGroup className="itemModal">
                                <Label for="item"><i>Ticker</i></Label>
                                <Input
                                    type="text"
                                    name="ticker"
                                    id="item"
                                    value={this.state.ticker}
                                    onChange={this.onChange}
                                    />
                                <Label for="item"><i>Number of Shares</i></Label>
                                <Input
                                    type="number"
                                    step="1"
                                    name="numShares"
                                    id="item"
                                    value={this.state.numShares}
                                    onChange={this.onChange}
                                    />
                                <Label for="item"><i>Entry</i></Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    name="entry"
                                    id="item"
                                    value={this.state.entry}
                                    onChange={this.onChange}
                                    />
                                <Label for="item"><i>Stop</i></Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    name="stopPrice"
                                    id="item"
                                    value={this.state.stopPrice}
                                    onChange={this.onChange}
                                    />
                                <Label for="item"><i>Exit</i></Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    name="exit"
                                    id="item"
                                    value={this.state.exit}
                                    onChange={this.onChange}
                                    />
                                <Label for="item"><i>Entry Date</i></Label>
                                <Input
                                    type="date"
                                    name="entryDate"
                                    id="item"
                                    onChange={this.onChange}
                                    value={this.state.entryDate}
                                    />
                                <Label for="item"><i>Exit Date</i></Label>
                                <Input
                                    type="date"
                                    name="exitDate"
                                    id="item"
                                    onChange={this.onChange}
                                    value={this.state.exitDate}
                                    />


                                <Label for="item"><i>Note</i></Label>
                                <textarea 
                                    rows="4"
                                    name="note"
                                    placeholder="Additional notes..."
                                    value={this.state.note}
                                    onChange={this.onChange}></textarea>


                                 <Label for="item"><i>Chart Reference Image</i></Label>
                                <Input
                                    type="text"
                                    name="tradeIMG"
                                    id="item"
                                    placeholder="Link to image of trade"
                                    value={this.state.tradeIMG}
                                    onChange={this.onChange}
                                    />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block>
                                        Update Trade</Button>
                            </FormGroup>
                        </Form>
                </Container>
            
        )
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { updateItem })(UpdateTrade)