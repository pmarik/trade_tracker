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

        const newItem = {
            ticker: this.state.ticker,
            entry: this.state.entry,
            exit: this.state.exit,
            fees: this.state.fees,
            pL: this.state.pL,
            date: this.state.date
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
                                <Label for="item">Fees</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    name="fees"
                                    id="item"
                                    placeholder="Add fee price"
                                    onChange={this.onChange}
                                    />
                                <Label for="item">P/L</Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    name="pL"
                                    id="item"
                                    placeholder="Add profit or loss amount"
                                    onChange={this.onChange}
                                    />
                                <Label for="item">Exit</Label>
                                <Input
                                    type="date"
                                    name="date"
                                    id="item"
                                    onChange={this.onChange}
                                    />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block>
                                        Add Item</Button>
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