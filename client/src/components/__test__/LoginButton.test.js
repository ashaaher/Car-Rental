import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import LoginButton from '../LoginButton';

it('LoginButton Page matches snapshot', () => {
  const wrapper = shallow(<LoginButton />);
  expect(wrapper).toMatchSnapshot();
})