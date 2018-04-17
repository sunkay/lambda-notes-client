import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "aws-amplify";
import "./Home.css";

class Jest extends Component{

    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            notes: []
        }
    }

    async componentDidMount(){
        if (!this.props.isAuthenticated){
            return;
        }

        try{
            const notes =  await this.notes();
            this.setState({ notes });
        } catch(e){
            console.log(" Home:componentDidMount -> " + e);
            alert(e);
        }
        this.setState({ isLoading: false});
    }

    notes(){
        return new Promise((resolve, reject) => {
                resolve([
                    {
                        noteId: 1,
                        content: "Promise Content",
                        createdAt: 1522596848355
                    }
                ]);
        });
    }

    renderNotesList(notes){
        console.log("RenderNotesList: ", notes);
        return [{}].concat(notes).map(
            (note, i) =>
            i !== 0
                ? <ListGroupItem
                    key={note.noteId}
                    href={`/notes/${note.noteId}`}
                    onClick={this.handleNoteClick}
                    header={note.content.trim().split("\n")[0]}
                >
                    {"Created: " + new Date(note.createdAt).toLocaleString()}
                </ListGroupItem>
                : <ListGroupItem
                    key="new"
                    href="/notes/new"
                    onClick={this.handleNoteClick}
                >
                    <h4>
                    <b>{"\uFF0B"}</b> Create a new note
                    </h4>
                </ListGroupItem>
        );
    }

    renderLander(){
        return(
            <div className="lander">
                <h1>Scratch</h1>
                <p>A lambda serverless app</p>
                <div>
                    <Link to="/login" className="btn btn-info btn-lg">
                      Login
                    </Link>
                    <Link to="/signup" className="btn btn-success btn-lg">
                      Signup
                    </Link>
                </div>
            </div>
        );
    }

    renderNotes(){
        return(
            <div className="notes">
                <PageHeader> Your Notes </PageHeader>
                <ListGroup>
                    {!this.state.isLoading 
                      && this.renderNotesList(this.state.notes)
                    }
                </ListGroup>
            </div>            
        );
    }

    render(){
        //console.log(this.props)
        return (
            <div className="Home">
                {
                    this.props.isAuthenticated 
                    ? this.renderNotes()
                    : this.renderLander()
                }
            </div>
        );
    }
}

export default Jest;
