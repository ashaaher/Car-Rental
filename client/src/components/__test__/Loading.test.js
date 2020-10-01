import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Loading from '../Loading';

it('Loading Page matches snapshot', () => {
  const wrapper = shallow(<Loading />);
  expect(wrapper).toMatchSnapshot();
})