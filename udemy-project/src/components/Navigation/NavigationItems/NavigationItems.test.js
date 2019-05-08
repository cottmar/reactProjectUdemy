import React from 'react';
import { configure, shallow }from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from '../NavigationItem/NavigationItem';

// describe is a function that takes two arguments.
// the first argument is a description of the test we are doing. What we see in console output
//  the second argument is the testing function. Normal JS function where you describe and write the test.
// writing "it" - describes us to write one individual test. It also takes 2 arguments. 
// the first argument is the description of what it should do
// the second argument is another js function where we write our testing logic.
// we want to create an instance of the component as it would be rendered to the dom through react
// ENZYNE allows us to just render the compononet stand alone independent of the entire application. Now we can write UNIT TESTS

// shallow is the best way to rendering component, it renders with all its content but it isn't deeply rendered. Content of them isn't rendered which helps in running isolated tests
// inside expect we are checking for what we expect to happen

// we are shallowly rendering the NavigationItems and storing the result in the wrapper const.

// this connects enzyme
configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  })
  it ('should render two <NavigationItem /> elements if not authenticated.', () => {
      expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
  it ('should render three <NavigationItem /> elements if it IS authenticated.', () => {
      // wrapper = shallow(<NavigationItems isAuthenticated />);
      wrapper.setProps({isAuthenticated: true});
      expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it ('should navigate to /logout', () => {
    // wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
});
});

// describe('<NavigationItems />', () => {
//   it ('should render two <NavigationItem /> elements if not authenticated.', () => {
//     const wrapper = shallow(<NavigationItems />);
//       expect(wrapper.find(NavigationItem)).toHaveLength(2);
//   });
//   it ('should render three <NavigationItem /> elements if it IS authenticated.', () => {
//     const wrapper = shallow(<NavigationItems isAuthenticated />);
//       expect(wrapper.find(NavigationItem)).toHaveLength(3);
//   });
// });