import React, { Component } from 'react';
import { withOktaAuth } from '@okta/okta-react';
import {
  Typography,
} from '@material-ui/core';

export default withOktaAuth(class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.authState.isPending) { 
      return <div>Loading...</div>;
    }

    return (
      <Typography variant="h4" align="center" component="h3">
          Welcome to Car Rental Application
      </Typography>
    );
  }
});