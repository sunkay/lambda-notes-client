import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

export default class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }
}