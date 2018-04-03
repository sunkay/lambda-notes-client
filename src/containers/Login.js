import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Config from "../config";
import "./Login.css";

import {
    CognitoUserPool,
    AuthenticationDetails,
    CognitoUser
} from "amazon-cognito-identity-js";



export default class Login extends Component{
    constructor(props){
        super(props);


        this.state = {
            email: "",
            password: ""
        };
    }

    login(email, password){
    const userPool = new CognitoUserPool({
        UserPoolId: Config.cognito.USER_POOL_ID,
        ClientId: Config.cognito.APP_CLIENT_ID
    });

    const user = new CognitoUser({Username: email, Pool: userPool});
    const authenticationData = {Username: email, Password: password};
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) => 
        user.authenticateUser(authenticationDetails, {
            onSuccess: result => resolve(),
            onFailure: err => reject(err)
        })
    );
}

    validateForm(){
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
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
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                     >
                     Login
                     </Button>                  
                </form>
            </div>
        );
    }
}