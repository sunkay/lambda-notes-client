import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import "./NewNote.css";
import config from "../../config";
//import { Auth } from "aws-amplify";


export default class NewNote extends Component{
    constructor(props){
        super(props);

        this.file = null;

        this.state = {
            isLoading: false,
            content: ""
        };
    }

    validateForm(){
        return this.state.content.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
            alert("Please pick a file smaller than 5MB");
            return
        }

        this.setState({isLoading: true});
    }

    render(){
        return (
            <div className="NewNote">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="content">
                        <FormControl
                            autoFocus
                            value={this.state.content}
                            onChange={this.handleChange}
                            componentClass="textarea"
                        />
                    </FormGroup>
                    <FormGroup controlId="file">
                        <ControlLabel>Attachment</ControlLabel>
                        <FormControl
                            type="file"
                            onChange={this.handleFileChange}
                        />
                    </FormGroup>  
                    <LoaderButton
                        block
                        bsSize="large"
                        bsStyle="primary"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Create"
                        loadingText="Creating..."
                     />
                </form>
            </div>
        );
    }
}