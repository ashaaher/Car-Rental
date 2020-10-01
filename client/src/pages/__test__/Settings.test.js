import React from 'react';
import { shallow } from 'enzyme';
import Settings from '../Settings';

it('Settings Page matches snapshot', () => {
  const wrapper = shallow(<Settings />);
  expect(wrapper).toMatchSnapshot();
})