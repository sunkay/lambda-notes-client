import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import {  FormControl } from "react-bootstrap";

import Login from './Login';

it('renders login page', () =>{
  const wrapper = shallow(<Login />);
  console.log(wrapper.debug());
  expect(wrapper.find(FormControl).length).toBe(2);
   expect(wrapper.find(".Login").length).toBe(1);
});
