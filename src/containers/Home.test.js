import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { shallow, mount, render, simulate } from 'enzyme';
import { LinkContainer } from 'react-router-bootstrap';

import Home from './Home';

it('renders lander when unauthenticated', () =>{
  const wrapper = shallow(<Home />);
  expect(wrapper.find(Link).length).toBe(2);
  expect(wrapper.find("#logout").length).toBe(0);
});

it('renders notes when authenticated', () =>{
    const wrapper = shallow(<Home />);
    wrapper.setState({
        notes: []
    });
    wrapper.setProps({isAuthenticated: true})
    //console.log(wrapper.debug());
    expect(wrapper.find('.notes').length).toBe(1);
    expect(wrapper.find(ListGroup).length).toBe(1);
});
