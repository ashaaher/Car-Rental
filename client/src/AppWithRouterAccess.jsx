import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import Home from './pages/Home';
import Login from './pages/Login';
import ProfilePage from './pages/ProfilePage';
import RegistrationForm from './pages/RegistrationForm.jsx';
import CustomerVehicles from './pages/CustomerVehicles.jsx';
import Settings from './pages/Settings.jsx';
import Locations from './pages/Locations.jsx';
import Vehicles from './pages/Vehicles.jsx';
import Users from './pages/Users.jsx';
import VehicleType from './pages/VehicleType.jsx';
import Bookings from './pages/Bookings.jsx';
import config from './app.config';
import AppHeader from './components/AppHeader';


const AppWithRouterAccess = () => { 
  const history = useHistory();
  const onAuthRequired = () => { 
    history.push('/login');
  };

  return (
    <Security issuer={config.issuer}
              pkce={false}
              cookies={config.cookies}
              clientId={config.client_id}
              redirectUri={window.location.origin + '/implicit/callback'}
              onAuthRequired={onAuthRequired}
              >
      <AppHeader />
      <SecureRoute path='/' exact={true} component={Home} />

      <SecureRoute path='/vehicletype' component={VehicleType} />
      <SecureRoute path='/settings' component={Settings} />
      <SecureRoute path='/locations' component={Locations} />
      <SecureRoute path='/vehicles' component={Vehicles} />
      <SecureRoute path='/users' component={Users} />

      <SecureRoute path='/customervehicles' component={CustomerVehicles} />
      <SecureRoute path='/bookings' component={Bookings} />
      <SecureRoute path='/profile' component={ProfilePage} />

      <Route path='/login' render={() => <Login issuer={config.issuer} />} />
      <Route path="/register" component={RegistrationForm} />
      <Route path='/implicit/callback' component={LoginCallback} />
    </Security>
  );
};
export default AppWithRouterAccess;