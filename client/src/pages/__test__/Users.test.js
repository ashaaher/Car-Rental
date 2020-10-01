import React from 'react';
import { shallow } from 'enzyme';
import Users from '../Users';

it('Users Page matches snapshot', () => {
  const wrapper = shallow(<Users />);
  expect(wrapper).toMatchSnapshot();
})