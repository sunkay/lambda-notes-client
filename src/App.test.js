import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { shallow, mount, render, simulate } from 'enzyme';
import { LinkContainer } from 'react-router-bootstrap';

import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App.WrappedComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders login and signup buttons when unauthenticated', () =>{
  const wrapper = shallow(<App.WrappedComponent />);
  wrapper.setState({
      isAuthenticated: false,
      isAuthenticating: false
  });
  expect(wrapper.find(LinkContainer).length).toBe(2);
  expect(wrapper.find("#logout").length).toBe(0);

});

it('does not render login, signup and renders logout buttons when authenticated', () =>{
  const wrapper = shallow(<App.WrappedComponent />);
  wrapper.setState({
      isAuthenticated: true,
      isAuthenticating: false
  });
  expect(wrapper.find(LinkContainer).length).toBe(0);
  expect(wrapper.find("#logout").length).toBe(1);
});

/*
it('renders login page after logout button is clicked', () =>{
  const wrapper = shallow(<App.WrappedComponent />);
  wrapper.setState({
      isAuthenticated: true,
      isAuthenticating: false
  });

  wrapper.find("#logout").simulate('click');
  expect(wrapper.find(LinkContainer).length).toBe(2);    
});
*/