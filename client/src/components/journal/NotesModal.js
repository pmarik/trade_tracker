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


class NotesModal extends Component{
    state = {
        modal: false,
        name: ''
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        const name = e.target.name
       
    }


    onSubmit = e => {
        e.preventDefault();

        this.toggle();
    }

    render(){

        const positivePL = (<span>${this.props.pL.toFixed(2)}</span>)
        const negativePL = (<span>-${Math.abs(this.props.pL).toFixed(2)}</span>)

        return (
            <div>

                <Button
                    color="dark"
                    onClick={this.toggle}>
                   VIEW</Button> 
                

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className="notesModel">
                    
                    

                    <ModalHeader toggle={this.toggle}>{this.props.ticker} Notes</ModalHeader>
                    <ModalBody>
                        <p><strong>Entry Price:</strong> ${this.props.entry}</p>
                        <p><strong>Exit Price:</strong> ${this.props.exit}</p>
                        <p><strong>Result</strong> - {this.props.winLose} for {this.props.pL > 0 ? positivePL : negativePL}</p>
                        <h5>Strategy/Thoughts</h5>
                        <div className="noteText">
                            <p>{this.props.note}</p>
                         </div>
                        <img src={`${this.props.tradeIMG}`}/> 

                    </ModalBody>
                </Modal>
            </div>
        )
    }
}



export default NotesModal