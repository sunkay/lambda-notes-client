import React, { Component } from "react";
import { HelpBlock, FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { LinkContainer } from 'react-router-bootstrap';
import "./Login.css";
import { Auth } from "aws-amplify";


export default class Login extends Component{
    constructor(props){
        super(props);


        this.state = {
            isLoading: false,
            email: "",
            password: ""
        };
    }

    validateForm(){
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});

        try{
            await Auth.signIn(this.state.email, this.state.password);
            this.props.userHasAuthenticated(true);
            this.props.history.push("/");
        } catch(e) {
            this.props.userHasAuthenticated(false);
            console.log(e.message);
            this.setState({isLoading: false});
        }
    }

    render(){
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </FormGroup>  
                    <HelpBlock>
                        <LinkContainer to="/changepwd">
                          <Button bsStyle="link">Forgot Password</Button>
                        </LinkContainer>
                    </HelpBlock>                    
                    <LoaderButton
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Login"
                        loadingText="Logging in..."
                     />
                </form>
            </div>
        );
    }
}