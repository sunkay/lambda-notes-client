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

it.skip('Passing props and setting state', () =>{
  const wrapper = shallow(<Jest isAuthenticated={true} /> );

  wrapper.setState({isLoading: false});
  expect(wrapper.find(ListGroup).length).toBe(1);
  expect(wrapper.find(".notes").length).toBe(1);
});

it.skip('Spy on a method : notes and see if it called', () =>{
  const spy = jest.spyOn(Jest.prototype, 'notes');
  const wrapper = shallow(<Jest isAuthenticated={true} /> );

  wrapper.setState({isLoading: false});

  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveBeenCalledTimes(1);

  spy.mockReset();
  spy.mockRestore();
});

it('SpyOn a method and overwrite its implementation to return different data', async () =>{

  const spy = jest.spyOn(Jest.prototype, 'notes').
    mockImplementation(() => {
      console.log("In promise Mock Impl");
      return Promise.resolve([
            {
              noteId: 1,
              content: "Mocked Promise Content",
              createdAt: 1522596848355
            }
      ]);
    });

  const wrapper = await shallow(<Jest isAuthenticated={true} /> );

  wrapper.setState({isLoading: false});
  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveBeenCalledTimes(1);
  console.log(wrapper.debug());
  //expect(wrapper.find('[header="Test2 Content"]').length).toBe(1);
  //spy.mockReset();
  //spy.mockRestore();
});



