import React, { Fragment, Component } from 'react';
import { withOktaAuth } from '@okta/okta-react';
import { withRouter, Route, Redirect, Link } from 'react-router-dom';
import { compose } from 'recompose';
import {
  withStyles,
  Typography,
  Fab,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import LocationEditor from '../components/editors/LocationEditor';
import ErrorSnackbar from '../components/ErrorSnackbar';
import apiClient, { patchBody } from '../libs/apiClient';
import Loading from '../components/Loading';

const styles = theme => ({
  posts: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
    maxHeight: '500px',
    overflow: 'auto',
    margin: '40px',
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

class Locations extends Component {
  state = {
    loading: true,
    locations: [],
    error: null,
  };

  componentDidMount() {
    this.getLocations();
  }

  async getLocations() {
    try {
      const locations = await apiClient('/api/locations', { method: "GET" });
      this.setState({
        loading: false,
        locations
      });
    } catch (error) {
      this.setState({loading: false, error })
    }

  }

  saveLocation = async (data) => {
    try {
      let reqBody = {
        name: data.name,
        address: data.address,
        capacity: data.capacity
      }
      if(data._id) {
        reqBody = patchBody(reqBody);
      }
      const endpoint = data._id ? `/api/locations/${data._id}` : '/api/locations';
      await apiClient(
        endpoint,
        {
          method: data._id ? "PATCH" : "POST",
          body: JSON.stringify(reqBody)
        }
      );
    } catch (error) {
      this.setState({ error })
    }
    this.props.history.goBack();
    this.getLocations();
  }

  deleteLocation = async(id) => {
    if (window.confirm(`Are you sure you want to delete?`)) {
      try {
        await apiClient(
          `/api/locations/${id}`,
          {
            method: "DELETE",
          }
        )
        await this.getLocations();
      } catch (error) {
        this.setState({ error })
      }
      
    }
    
  } 

  renderEditor = ({ match: { params: { id } } }) => {
    if (this.state.loading) return null;
    let locationV = this.state.locations.find(v => v._id === id);

    if (locationV) {
      return <LocationEditor locationV={locationV} onSave={this.saveLocation} />;
    }

    if (!locationV && id !== 'new') return <Redirect to="/locations" />;

    return <LocationEditor locationV={locationV} onSave={this.saveLocation} />;
  };

  render() {
    if (this.props.authState.isPending || this.state.loading) {
      return <Loading />;
    }
    const { classes } = this.props;

    return (
      <Fragment>
        <Typography variant="h5">Locations</Typography>
        {this.state.locations.length > 0 ? (
          <Paper elevation={1} className={classes.posts}>
            <List>
              {this.state.locations.map(location => {
                return <ListItem key={location._id} button component={Link} to={`/locations/${location._id}`}>
                  <ListItemText
                    primary={location.name}
                    secondary={`Capacity : ${location.capacity}`}
                  />
                  <ListItemText
                    primary={`Address: ${location.address}`}
                  />
                  <Button size="small" color="primary" onClick={(event) => {
                    event.preventDefault();
                    this.deleteLocation(location._id)
                  }}>Delete</Button>
                </ListItem>
              })}
            </List>
          </Paper>
        ) : (
            !this.state.loading && <Typography variant="subtitle1">No locations to display</Typography>
          )}
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          component={Link}
          to="/locations/new"
        >
          <AddIcon />
        </Fab>
        <Route exact path="/locations/:id" render={this.renderEditor} />
        {this.state.error && (
          <ErrorSnackbar
            onClose={() => this.setState({ error: null })}
            message={this.state.error.message}
          />
        )}
      </Fragment>
    );
  }
};

export default compose(
  withOktaAuth,
  withRouter,
  withStyles(styles),
)(Locations);