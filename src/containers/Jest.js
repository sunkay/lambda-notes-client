import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "aws-amplify";
import "./Home.css";

class Home extends Component{

    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            notes: []
        }
    }

    //async componentDidMount(){
    async componentDidMount(){
        if (!this.props.isAuthenticated){
            return;
        }

        try{
            //const notes = await this.notes();
            const notes = this.notes();
            this.setState({ notes });
        } catch(e){
            console.log(" Home:componentDidMount -> " + e);
            alert(e);
        }
        this.setState({ isLoading: false});
    }

    notes(){
        //return API.get("notes", "/notes");
        return (
                [
                {
                    noteId: 1,
                    content: "Test1 Content",
                    createdAt: 1522596848355
                },
                {
                    noteId: 2,
                    content: "Test2 Content",
                    createdAt: 1522596848355
                }
            ]
        );
    }

    renderNotesList(notes){
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

export default Home;
