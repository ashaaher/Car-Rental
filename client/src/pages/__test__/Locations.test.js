import React from 'react';
import { shallow } from 'enzyme';
import Locations from '../Locations';

it('Locations Page matches snapshot', () => {
  const wrapper = shallow(<Locations />);
  expect(wrapper).toMatchSnapshot();
})