/**
 author: Vijaylaxmi Nagurkar
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';
import Locations from './pages/Locations';
import ProfilePage from './pages/ProfilePage';
import RegistrationForm from './pages/RegistrationForm';
import Settings from './pages/Settings';
import Users from './pages/Users';
import Vehicles from './pages/Vehicles';
import VehicleType from './pages/VehicleType';
import AppHeader from './components/AppHeader';
import Loading from './components/Loading';
import LoginButton from './components/LoginButton';
import LoginForm from './components/LoginForm';
import Navigation from './components/Navigation';
import SearchBar from './components/SearchBar';






it('App renders without crashing enzyme', () => {
  shallow(<App />);
});

it('App matches snapshot', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
})
it('Locations Page matches snapshot', () => {
  const wrapper = shallow(<Locations />);
  expect(wrapper).toMatchSnapshot();
})

it('AppHeader Page matches snapshot', () => {
  const wrapper = shallow(<AppHeader />);
  expect(wrapper).toMatchSnapshot();
})
it('ProfilePage Page matches snapshot', () => {
  const wrapper = shallow(<ProfilePage />);
  expect(wrapper).toMatchSnapshot();
})
it('RegistrationForm Page matches snapshot', () => {
  const wrapper = shallow(<RegistrationForm />);
  expect(wrapper).toMatchSnapshot();
})
it('Settings Page matches snapshot', () => {
  const wrapper = shallow(<Settings />);
  expect(wrapper).toMatchSnapshot();
})
it('Users Page matches snapshot', () => {
  const wrapper = shallow(<Users />);
  expect(wrapper).toMatchSnapshot();
})
it('Vehicles Page matches snapshot', () => {
  const wrapper = shallow(<Vehicles />);
  expect(wrapper).toMatchSnapshot();
})
it('VehicleType Page matches snapshot', () => {
  const wrapper = shallow(<VehicleType />);
  expect(wrapper).toMatchSnapshot();
})
it('Loading Page matches snapshot', () => {
  const wrapper = shallow(<Loading />);
  expect(wrapper).toMatchSnapshot();
})
it('LoginButton Page matches snapshot', () => {
  const wrapper = shallow(<LoginButton />);
  expect(wrapper).toMatchSnapshot();
})
it('LoginForm Page matches snapshot', () => {
  const wrapper = shallow(<LoginForm />);
  expect(wrapper).toMatchSnapshot();
})
it('Navigation Page matches snapshot', () => {
  const wrapper = shallow(<Navigation />);
  expect(wrapper).toMatchSnapshot();
})
it('SearchBar Page matches snapshot', () => {
  const wrapper = shallow(<SearchBar />);
  expect(wrapper).toMatchSnapshot();
})
