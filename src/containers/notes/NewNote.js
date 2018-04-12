import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import { API } from "aws-amplify";

import "./NewNote.css";
import config from "../../config";
import { s3Upload } from "../../libs/awsLib";

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

    handleFileChange = async event => {
        this.file = event.target.files[0];
    }

    handleSubmit = async event => {
        event.preventDefault();

        if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
            alert("Please pick a file smaller than 5MB");
            return
        }

        this.setState({isLoading: true});

        try{

            const attachment = this.file
                ? await s3Upload(this.file)
                : null;
            console.log("NewNote attachment ", attachment);
            await this.createNote({
                attachment,
                content: this.state.content
            });
            this.props.history.push("/");
        } catch(e){
            console.log("NewNote:handleSubmit --> event: ", e);            
            alert(e);
            this.setState({isLoading: false});
        }
    }

    createNote(note){
        return API.post("notes", "/notes", {
            body: note
        });
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