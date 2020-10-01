import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Navigation from '../Navigation';

it('Navigation Page matches snapshot', () => {
  const wrapper = shallow(<Navigation />);
  expect(wrapper).toMatchSnapshot();
})