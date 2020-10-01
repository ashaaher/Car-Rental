import React, { Component, Fragment } from 'react';
import { withOktaAuth } from '@okta/okta-react';
import { withRouter } from 'react-router-dom';
import {
  withStyles,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { compose } from 'recompose';

import ErrorSnackbar from '../components/ErrorSnackbar';
import apiClient, { patchBody } from '../libs/apiClient';
import Loading from '../components/Loading';

const styles = theme => ({
  posts: {
    marginTop: theme.spacing(2),
    maxHeight: "580px",
    overflow: 'auto',
    margin: '50px'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
});

class Users extends Component {
  state = {
    loading: true,
    users: [],
    error: null,
  };

  componentDidMount() {
    this.getUsers();
  }

  async getUsers() {
    try {
      const users = await apiClient('/api/users', { method: "GET" });
      this.setState({
        loading: false,
        users
      });
    } catch (error) {
      this.setState({error})
    }
    
  }

  async revokeMembership(user) {
    if (window.confirm(`Are you sure you want to revoke user?`)) {
      await apiClient(
        `/api/users/${user.id}`,
        {
          method: "DELETE",
        }
      )
      await this.getUsers();
    }
  }

  render() {
    if (this.props.authState.isPending || this.state.loading) {
      return <Loading />;
    }
    const { classes } = this.props;

    return (
      <Fragment>
        <Typography variant="h5">Users</Typography>
        {this.state.users.length > 0 ? (
          <Paper elevation={1} className={classes.posts}>
            <List>
              {this.state.users.map(user => (
                <ListItem key={user.profile.email}>
                  <ListItemText
                    primary={user.profile.firstName}
                    secondary={user.profile.lastName}
                  />
                  <ListItemText
                    primary={user.profile.email}
                  />
                  <ListItemSecondaryAction>
                    <Button onClick={() => this.revokeMembership(user)} color="inherit">
                      Revoke
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
            !this.state.loading && <Typography variant="subtitle1">No users to display</Typography>
          )}
        {this.state.error && (
          <ErrorSnackbar
            onClose={() => this.setState({ error: null })}
            message={this.state.error.message}
          />
        )}
      </Fragment>
    );
  }
}

export default compose(
  withOktaAuth,
  withRouter,
  withStyles(styles),
)(Users);
