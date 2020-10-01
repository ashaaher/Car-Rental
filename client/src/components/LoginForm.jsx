import React, { useState } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { useOktaAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';
import config from '../app.config';

import {
  withStyles,
  CardContent,
  CardActions,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';


const styles = theme => ({
  card: {
    width: '90%',
    maxWidth: 500,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 500,
    margin: 'auto'
  },
  cardField: {
    marginTop: theme.spacing(4),
  },
  marginTop: {
    marginTop: theme.spacing(3),
  },
});

const LoginForm = ({ issuer, classes }) => { 

  const { authService } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const oktaAuth = new OktaAuth({ issuer: issuer, pkce: false, cookies: config.cookies });
    oktaAuth.signIn({ username, password })
      .then(res => setSessionToken(res.sessionToken))
      .catch(err => console.log('Found an error', err));
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  if (sessionToken) {
    authService.redirect({ sessionToken });
    return null;
  }

  return (
    
    <form className={classes.root} onSubmit={handleSubmit}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h5" component="h3">
          Car Rental Application
        </Typography>
        <TextField
          id="username" label="Username"
          value={username}
          onChange={handleUsernameChange} 
        />
        <TextField
          id="password" type="password"
          label="Password"
          value={password}
          onChange={handlePasswordChange} 
          />
          <CardActions>
            <Button variant="contained" color="primary" disableElevation type="submit">Login</Button>
            <Button variant="contained" component={Link} to="/register" disableElevation>Register</Button>
          </CardActions>
      </CardContent>
    </form>
  );
};
export default withStyles(styles)(LoginForm);