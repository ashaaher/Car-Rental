import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import AppHeader from '../AppHeader';

it('AppHeader Page matches snapshot', () => {
  const wrapper = shallow(<AppHeader />);
  expect(wrapper).toMatchSnapshot();
})