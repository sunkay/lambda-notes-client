import React, { Component } from "react";
import { HelpBlock, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import "./ChangePassword.css";
import { Auth } from "aws-amplify";

export default class ChangePassword extends Component{
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            email: "",
            password: "",
            confirmationCode: "",
            phase1: true
        };
    }

    validateChangePasswordForm(){
        return(
            this.state.email.length > 0
        );   
    }

    validateConfirmationPasswordChangeForm() {
        return(
            this.state.confirmationCode.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});

        try {
            await Auth.forgotPassword(this.state.email);
            this.setState({phase1: false});

        } catch(e){
            console.log(e.message);
            alert(e.message);
        }

        this.setState({isLoading: false});
    }

    handleConfirmationSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});

        try{
            await Auth.forgotPasswordSubmit(
                this.state.email, 
                this.state.confirmationCode,
                this.state.password
            );
            await Auth.signIn(
                this.state.email,
                this.state.password
            );

            this.props.userHasAuthenticated(true);
            this.props.history.push("/")
        } catch(e){
            console.log(e.message);
            alert(e.message);            
            this.setState({isLoading: false});
        }
    }

    renderConfirmationForm(){
        return (
            <form onSubmit={this.handleConfirmationSubmit}>
                <FormGroup controlId="confirmationCode" bsSize="large">
                    <ControlLabel>Confirmation Code</ControlLabel>
                    <FormControl
                        autoFocus
                        type="tel"
                        value={this.state.confirmationCode}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <HelpBlock>
                    Please check your email for the code.
                </HelpBlock>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </FormGroup>  
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                    />
                </FormGroup>  

                <LoaderButton
                    block
                    bsSize="large"
                    disabled={!this.validateConfirmationPasswordChangeForm()}
                    type="submit"
                    isLoading={this.state.isLoading}
                    text="Signup"
                    loadingText="Signing up..."
                    />
            </form>
        );
    }
    
    renderForm(){
        return (
            <form onSubmit={this.handleSubmit}>
                <HelpBlock>
                    Forgot or Change Password, please enter your email address in the box below...
                </HelpBlock>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    bsSize="large"
                    disabled={!this.validateChangePasswordForm()}
                    type="submit"
                    isLoading={this.state.isLoading}
                    text="Change Password"
                    loadingText="Change Password..."
                    />
            </form>
        );
    }

    render(){
        return(
            <div className="ChangePassword">
                {this.state.phase1
                    ? this.renderForm()
                    : this.renderConfirmationForm()
                }
            </div>
        );
    }
}