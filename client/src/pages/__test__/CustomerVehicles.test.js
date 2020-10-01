import React from 'react';
import { shallow } from 'enzyme';
import CustomerVehicles from '../CustomerVehicles';

it('CustomerVehicles Page matches snapshot', () => {
  const wrapper = shallow(<CustomerVehicles />);
  expect(wrapper).toMatchSnapshot();
})