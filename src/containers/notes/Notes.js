import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import { API } from "aws-amplify";

import "./Notes.css";
import config from "../../config";

export default class Notes extends Component{
    constructor(props){
        super(props);

        this.file = null;

        this.state = {
            isLoading: false,
            note: null,
            content: "",
            attachmentURL: null
        };
    }

    async componentDidMount() {
        try{
            let attachmentURL;
            const note = await this.getNote();
            const {content, attachment} = note;

            if(attachment){
                attachmentURL = await Storage.vault.get(attachment);
            }

            this.setState({
                note,
                content,
                attachmentURL
            });
        } catch(e){
            console.log("Notes:componentDidMount " + e);
            alert(e);
        }
    }

    getNote(){
        return API.get("notes", `/notes/${this.props.match.params.id}`);
    }

    validateForm() {
        return this.state.content.length > 0;
    }

    formatFilename(str) {
        return str.replace(/^\w+-/, "");
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleFileChange = event => {
        this.file = event.target.files[0];
    }

    handleSubmit = async event => {
        event.preventDefault();

        if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
            alert("Please pick a file smaller than 5MB");
            return;
        }

        this.setState({ isLoading: true });
    }

    handleDelete = async event => {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
        );

        if (!confirmed) {
            return;
        }

        this.setState({ isDeleting: true });
    }


    render(){
        console.log("Notes:render:state: ", this.state);
        return (
            <div className="Notes">
                {
                    this.state.note &&
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="content">
                                <FormControl
                                    autoFocus
                                    value={this.state.content}
                                    onChange={this.handleChange}
                                    componentClass="textarea"
                                />
                            </FormGroup>
                            { this.state.note.attachment && 
                                <FormGroup controlId="file">
                                    <ControlLabel>Attachment</ControlLabel>
                                    <FormControl.static>
                                        <a
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          href={this.state.attachmentURL}
                                        >
                                          {this.formatFilename(this.state.note.attachment)}
                                        </a>                                          
                                    </FormControl.static>
                                </FormGroup>                              
                            }
                            <FormGroup controlId="file">
                                {!this.state.note.attachment &&
                                <ControlLabel>Attachment</ControlLabel>}
                                <FormControl onChange={this.handleFileChange} type="file" />
                            </FormGroup>
                            <LoaderButton
                                block
                                bsSize="large"
                                bsStyle="primary"
                                disabled={!this.validateForm()}
                                type="submit"
                                isLoading={this.state.isLoading}
                                text="Save"
                                loadingText="Saving..."
                            />
                            <LoaderButton
                                block
                                bsStyle="danger"
                                bsSize="large"
                                isLoading={this.state.isDeleting}
                                onClick={this.handleDelete}
                                text="Delete"
                                loadingText="Deleting…"
                            />
                        </form>}
                    </div>
        );
    }
}