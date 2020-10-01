import React from 'react';
import { shallow } from 'enzyme';
import ProfilePage from '../ProfilePage';

it('ProfilePage Page matches snapshot', () => {
  const wrapper = shallow(<ProfilePage />);
  expect(wrapper).toMatchSnapshot();
})