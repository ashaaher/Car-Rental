import React from 'react';
import { shallow } from 'enzyme';
import Bookings from '../Bookings';

it('Bookings Page matches snapshot', () => {
  const wrapper = shallow(<Bookings />);
  expect(wrapper).toMatchSnapshot();
})