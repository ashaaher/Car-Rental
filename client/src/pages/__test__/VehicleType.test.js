import React from 'react';
import { shallow } from 'enzyme';
import VehicleType from '../Bookings';

it('VehicleType Page matches snapshot', () => {
  const wrapper = shallow(<VehicleType />);
  expect(wrapper).toMatchSnapshot();
})