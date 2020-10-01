import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withOktaAuth } from '@okta/okta-react';

import config from '../app.config';
import {
  withStyles,
  CardContent,
  CardActions,
  Button,
  TextField,
  Card,
  Typography,
} from '@material-ui/core';
import { Form, Field } from 'react-final-form';
import ErrorSnackbar from '../components/ErrorSnackbar';
import { required, composeValidators, mustBeNumber, validateCardNumber } from '../utils/validations';

const styles = theme => ({
  modalCard: {
    width: '60%',
    maxWidth: 800,
    margin: 'auto'
  },
  modalCardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
});

export default withStyles(styles)(withOktaAuth(
  class RegistrationForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        sessionToken: null,
        error: null
      };

      this.oktaAuth = new OktaAuth({ issuer: config.issuer, pkce: false, cookies: config.cookies });
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.checkAuthentication();
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    async checkAuthentication() {
      const sessionToken = await this.props.authService.getIdToken();
      if (sessionToken) {
        this.setState({ sessionToken });
      }
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    async handleSubmit(data) {
      if (data.password !== data.repeatPassword) {
        this.setState({
          error: {
            message: "Passwords don't match"
          }
        })
        return;
      }
      fetch('/api/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => {
        if (!response.ok) {
          throw new Error('Registration failed');
        }
        this.oktaAuth
          .signIn({
            username: data.email,
            password: data.password
          })
          .then(res =>
            this.setState({
              sessionToken: res.sessionToken
            })
          );
      }).catch(err => {
        this.setState({ error: err })
      });
    }

    render() {
      const { classes } = this.props;
      if (this.state.sessionToken) {
        this.props.authService.redirect({ sessionToken: this.state.sessionToken });
        return null;
      }
      return <Form onSubmit={this.handleSubmit}>
        {({ handleSubmit }) => (<Card className={classes.modalCard}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h5">Registration</Typography>
            <CardContent className={classes.modalCardContent}>
              <Field name="email" validate={required}>
                {({ input, meta }) => <>
                  <TextField label="Email"  {...input} />
                  {meta.error && meta.touched && <span style={{color:"red"}}>{meta.error}</span>}
                </>}
              </Field>
              <Field name="firstName" validate={required}>
                {({ input, meta }) => <>
                  <TextField label="First Name"  {...input} />
                  {meta.error && meta.touched && <span style={{color:"red"}}>{meta.error}</span>}
                </>}
              </Field>
              <Field name="lastName" validate={required}>
                {({ input, meta}) => <>
                  <TextField label="Last Name"  {...input} />
                  {meta.error && meta.touched && <span style={{color:"red"}}>{meta.error}</span>}
                </>}
              </Field>
              <Field name="password" validate={required}>
                {({ input,meta }) => <>
                  <TextField label="Password"  type="password" {...input} />
                  {meta.error && meta.touched && <span style={{color:"red"}}>{meta.error}</span>}
                </>}
              </Field>
              <Field name="repeatPassword" validate={required}>
                {({ input, meta }) => <>
                  <TextField label="Confirm Password" type="password" {...input} />
                  {meta.error && meta.touched && <span style={{color:"red"}}>{meta.error}</span>}
                </>}
              </Field>
              <Field name="address" validate={required}>
                {({ input, meta }) => <>
                <TextField label="Address" multiline
                  rows={4} {...input} />
                  {meta.error && meta.touched && <span style={{color:"red"}}>{meta.error}</span>}
                  </>}
              </Field>
              <Field name="licenceNumber" validate={required}>
                {({ input, meta }) => <>
                  <TextField label="Driving Licence Number"  {...input} />
                  {meta.error && meta.touched && <span style={{color:"red"}}>{meta.error}</span>}
                </>}
              </Field>
              <Field name="stateOfResidence" validate={required}>
                {({ input, meta }) => <>
                  <TextField label="Driving Licence State"  {...input} />
                  {meta.error && meta.touched && <span style={{color:"red"}}>{meta.error}</span>}
                </>}
              </Field>
              <Field name="nameOnCard" validate={required}>
                {({ input, meta }) => <>
                  <TextField label="Name on Card"  {...input} />
                  {meta.error && meta.touched && <span style={{color:"red"}}>{meta.error}</span>}
                </>}
              </Field>
              <Field name="cardNumber" validate={composeValidators(required, mustBeNumber, validateCardNumber)}>
                {({ input, meta }) => <>
                  <TextField label="Card Number"  {...input} />
                  {meta.error && meta.touched && <span style={{color:"red"}}>{meta.error}</span>}
                </>}
              </Field>
              <Field name="cvv" validate={composeValidators(required, mustBeNumber)}>
                {({ input, meta }) => <>
                  <TextField label="CVV"  {...input} />
                  {meta.error && meta.touched && <span style={{color:"red"}}>{meta.error}</span>}
                </>}
              </Field>
              <Field name="expirationDate" validate={required}>
                {({ input, meta }) => <>
                  <TextField label="Expiration Date (MM/YY)"  {...input} />
                  {meta.error && meta.touched && <span style={{color:"red"}}>{meta.error}</span>}
                </>}
              </Field>

            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" disableElevation type="submit">Register</Button>
            </CardActions>
            {this.state.error && (
              <ErrorSnackbar
                onClose={() => this.setState({ error: null })}
                message={this.state.error.message}
              />
            )}
          </form>
        </Card>)}
      </Form>

    }
  }
));
