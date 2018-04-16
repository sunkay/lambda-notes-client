import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

//import ReactDOM from 'react-dom';
//import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
//import { LinkContainer } from 'react-router-bootstrap';

import Jest from './Jest';

it.skip('renders lander when unauthenticated', () =>{
  const wrapper = shallow(<Jest />);
  expect(wrapper.find(Link).length).toBe(2);
  expect(wrapper.find("#logout").length).toBe(0);
});

it('renders notes when authenticated', () =>{
  const wrapper = shallow(<Jest isAuthenticated={true} /> );

  wrapper.setState({isLoading: false});
  expect(wrapper.find(ListGroup).length).toBe(1);
  expect(wrapper.find(".notes").length).toBe(1);
});


