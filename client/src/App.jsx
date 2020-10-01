import React, { Fragment } from 'react';
import {
  CssBaseline,
  withStyles,
} from '@material-ui/core';

import { BrowserRouter as Router } from 'react-router-dom';
import AppWithRouterAccess from './AppWithRouterAccess';

const styles = theme => ({
  main: {
    padding: theme.spacing(0),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
});

const App = ({classes}) => { 
  return (
    <Fragment>
      <CssBaseline />
      <main className={classes.main}>
        <Router>
          <AppWithRouterAccess/>
        </Router>
      </main>
    </Fragment>
  );
}

export default withStyles(styles)(App);