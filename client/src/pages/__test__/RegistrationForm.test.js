import React from 'react';
import { shallow } from 'enzyme';
import RegistrationForm from '../RegistrationForm';

it('RegistrationForm Page matches snapshot', () => {
  const wrapper = shallow(<RegistrationForm />);
  expect(wrapper).toMatchSnapshot();
})