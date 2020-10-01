import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import LoginForm from '../LoginForm';

it('LoginForm Page matches snapshot', () => {
  const wrapper = shallow(<LoginForm />);
  expect(wrapper).toMatchSnapshot();
})