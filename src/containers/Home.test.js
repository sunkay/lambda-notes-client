import React from 'react';
import ReactDOM from 'react-dom';
import { Link, MemoryRouter } from 'react-router-dom';
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { shallow, mount, render, simulate } from 'enzyme';

import Home from './Home';

it('renders lander when unauthenticated', () =>{
  const wrapper = shallow(<Home />);
  expect(wrapper.find(Link).length).toBe(2);
  expect(wrapper.find("#logout").length).toBe(0);
});

it('renders notes when authenticated', () =>{
    const wrapper = shallow(<Home />);
    wrapper.setProps({isAuthenticated: true})
    //console.log(wrapper.debug());
    expect(wrapper.find('.notes').length).toBe(1);
    expect(wrapper.find(ListGroup).length).toBe(1);
});

it('renders a correct list of notes when authenticated', () =>{
    const wrapper = shallow(<Home />);
    wrapper.setState({
        isLoading: false,
        notes: [
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
    });
    wrapper.setProps({isAuthenticated: true})
    //console.log(wrapper.debug());
    expect(wrapper.find('.notes').length).toBe(1);
    expect(wrapper.find(ListGroupItem).length).toBe(3);
});

it('renders an empty list of notes when isLoading is true', () =>{
    const wrapper = shallow(<Home />);
    wrapper.setState({
        isLoading: true,
        notes: [
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
    });
    wrapper.setProps({isAuthenticated: true})
    //console.log(wrapper.debug());
    expect(wrapper.find('.notes').length).toBe(1);
    expect(wrapper.find(ListGroupItem).length).toBe(0);
});

it('mount test', () =>{
    const wrapper = mount(<MemoryRouter><Home /></MemoryRouter>);
    wrapper.setProps({
        children: React.cloneElement(wrapper.props().children, { isAuthenticated: true }),
    });
    //console.log(wrapper.find(Home).instance());
    const spy = jest.spyOn(wrapper.find(Home).instance(), 'notes').mockImplementation(() => {
        notes: [
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
        
    });

    wrapper.find(Home).instance().forceUpdate();    

    console.log(wrapper.debug());

    expect(spy).toHaveBeenCalled();
    expect(wrapper.find('.notes').length).toBe(1);
    expect(wrapper.find(ListGroupItem).length).toBe(0);
});
