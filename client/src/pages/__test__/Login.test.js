import React from 'react';
import { shallow } from 'enzyme';
import Login from '../Login';

jest.mock('@okta/okta-react', () => ({
  useOktaAuth: () => {
  return {
    authState: {},
    authService: {}
  };
}
}));

it('Login Page matches snapshot', () => {
  const wrapper = shallow(<Login />);
  expect(wrapper).toMatchSnapshot();
})