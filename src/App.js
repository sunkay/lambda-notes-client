import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import Routes from "./Routes";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect> 
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Scratch</Link>
            </Navbar.Brand>
            <Navbar.Toggle /> 
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem href="/signup">Signup</NavItem> 
              <NavItem href="/login">Login</NavItem>
            </Nav>    
         </Navbar.Collapse>
        </Navbar.Header> 
        </Navbar>
        <Routes /> 
      </div>
    );
  }
}

export default App;