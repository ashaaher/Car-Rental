import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Redirect } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const Login = ({ issuer }) => { 
  const { authState } = useOktaAuth();

  if (authState.isPending) { 
    return <div>Loading...</div>;
  }
  return authState.isAuthenticated ?
    <Redirect to={{ pathname: '/' }}/> :
    <LoginForm issuer={issuer} />;
};

export default Login;