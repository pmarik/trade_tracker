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
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onSubmit = e => {
        e.preventDefault();

        let calcPL;

        if(parseInt(this.state.entry, 10) > parseInt(this.state.stopPrice, 10)) {
            calcPL = (this.state.exit - this.state.entry) * this.state.numShares;
            console.log("long " + this.state.ticker)
            console.log(typeof this.state.entry)
        }
        else{
            calcPL = (this.state.entry - this.state.exit) * this.state.numShares;
            console.log("short " + this.state.ticker)
            console.log(typeof this.state.entry);
        }
      

        const newItem = {
            ticker: this.state.ticker,
            numShares: this.state.numShares,
            entry: this.state.entry,
            exit: this.state.exit,
            stopPrice: this.state.stopPrice,
            pL: calcPL,
            entryDate: this.state.entryDate,
            exitDate: this.state.exitDate,
            strategy: this.state.strategy,
            winLose: this.state.winLose,
            note: this.state.note
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
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Ticker</Label>
                                <Input
                                    type="text"
                                    name="ticker"
                                    id="item"
                                    placeholder="Add ticker name"
                                    onChange={this.onChange}
                                    />
                                <Label for="item"># Shares</Label>
                                <Input
                                    type="number"
                                    step="1"
                                    name="numShares"
                                    id="item"
                                    placeholder="Add number of shares"
                                    onChange={this.onChange}
                                    />
                                <Label for="item">Entry</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    name="entry"
                                    id="item"
                                    placeholder="Add entry price"
                                    onChange={this.onChange}
                                    />
                                <Label for="item">Exit</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    name="exit"
                                    id="item"
                                    placeholder="Add exit price"
                                    onChange={this.onChange}
                                    />
                                <Label for="item">Stop Price</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    name="stopPrice"
                                    id="item"
                                    placeholder="Add stop price"
                                    onChange={this.onChange}
                                    />
                                <Label for="item">Entry Date</Label>
                                <Input
                                    type="date"
                                    name="entryDate"
                                    id="item"
                                    onChange={this.onChange}
                                    />
                                <Label for="item">Exit Date</Label>
                                <Input
                                    type="date"
                                    name="exitDate"
                                    id="item"
                                    onChange={this.onChange}
                                    />
                                <Label for="item">Stratgy</Label>
                                <Input
                                    type="text"
                                    name="strategy"
                                    id="item"
                                    placeholder="Strategy behind trade"
                                    onChange={this.onChange}
                                    />

                            {/**==========================================**/}
                                <Label for="item">W/L</Label>
                                <Input
                                    type="text"
                                    name="winLose"
                                    id="item"
                                    placeholder="win/lose"
                                    onChange={this.onChange}
                                    />
                            {/**==========================================**/}


                                <Label for="item">Note</Label>
                                <Input
                                    type="text"
                                    name="note"
                                    id="item"
                                    placeholder="Addtional notes"
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