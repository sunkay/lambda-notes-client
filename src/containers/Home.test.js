import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
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
    const wrapper = shallow(<Home  />);
    wrapper.setProps({isAuthenticated: true})

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
    expect(wrapper.find('.notes').length).toBe(1);
    expect(wrapper.find(ListGroupItem).length).toBe(0);
});


it('test componentDidMount and fetching mocked data', async () =>{

  const spy = jest.spyOn(Home.prototype, 'notes').
    mockImplementation(() => {
      return Promise.resolve([
            {
                noteId: 1,
                content: "Mocked Test1 Content",
                createdAt: 1522596848355
            },
            {
                noteId: 2,
                content: "Mocked Test2 Content",
                createdAt: 1522596848355
            },
      ]);
    });

  const wrapper = await shallow(<Home isAuthenticated={true} /> );

  wrapper.setState({isLoading: false});
  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveBeenCalledTimes(1);
  //console.log(wrapper.debug());
  expect(wrapper.find(ListGroupItem).length).toBe(3);
  expect(wrapper.find('[header="Mocked Test1 Content"]').length).toBe(1);
  spy.mockReset();
  spy.mockRestore();

});
