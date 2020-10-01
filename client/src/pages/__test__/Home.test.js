import React from 'react';
import { shallow } from 'enzyme';
import Home from '../Home';

it('Home Page matches snapshot', () => {
  const wrapper = shallow(<Home />);
  expect(wrapper).toMatchSnapshot();
})