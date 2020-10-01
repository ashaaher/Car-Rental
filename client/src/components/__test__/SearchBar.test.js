import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import SearchBar from '../SearchBar';

it('SearchBar Page matches snapshot', () => {
  const wrapper = shallow(<SearchBar />);
  expect(wrapper).toMatchSnapshot();
})