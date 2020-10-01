import React, { Fragment, Component } from 'react';
import { withOktaAuth } from '@okta/okta-react';
import { withRouter, Route, Redirect, Link } from 'react-router-dom';
import { compose } from 'recompose';
import {
  withStyles,
  Typography,
  Fab,
  Button,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';

import VehicleTypeEditor from '../components/editors/VehicleTypeEditor';
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

class VehicleType extends Component {
  state = {
    loading: true,
    vehicleTypes: [],
    error: null,
  };

  componentDidMount() {
    this.getVehicleTypes();
  }

  async getVehicleTypes() {
    try {
      const vehicleTypes = await apiClient('/api/vehicleTypes', { method: "GET" });
      this.setState({
        loading: false,
        vehicleTypes
      });
    } catch (error) {
      this.setState({ loading: false, error })
    }

  }

  saveVehicleType = async (data) => {
    try {
      let reqBody = {
        name: data.name,
        description: data.description,
        rates: []
      }
      if (data.rate1) {
        reqBody.rates.push({
          rate: data.rate1,
          start: data.start1,
          end: data.end1
        })
      }
      if (data.rate2) {
        reqBody.rates.push({
          rate: data.rate2,
          start: data.start2,
          end: data.end2
        })
      }
      if (data.rate3) {
        reqBody.rates.push({
          rate: data.rate3,
          start: data.start3,
          end: data.end3
        })
      }
      if (data._id) {
        reqBody = patchBody(reqBody)
      }

      const endpoint = data._id ? `/api/vehicleTypes/${data._id}` : '/api/vehicleTypes';
      await apiClient(
        endpoint,
        {
          method: data._id ? "PATCH" : "POST",
          body: JSON.stringify(reqBody)
        }
      );
      await this.getVehicleTypes();
      this.props.history.goBack();
    } catch (error) {
      this.setState({ error })
    }

  }
  deleteVehicleType = async (id) => {
    if (window.confirm(`Are you sure you want to delete?`)) {
      try {
        await apiClient(
          `/api/vehicleTypes/${id}`,
          {
            method: "DELETE",
          }
        );
        await this.getVehicleTypes();
      } catch (error) {
        this.setState({ error })
      }
    }

  }
  renderEditor = ({ match: { params: { id } } }) => {
    if (this.state.loading) return null;
    let vehicleType = this.state.vehicleTypes.find(v => v._id === id);

    if (vehicleType) {
      const vehicleTypeRates = {};
      const v = vehicleType.rates;
      vehicleTypeRates.rate1 = v[0] ? v[0].rate : null
      vehicleTypeRates.start1 = v[0] ? v[0].start : null
      vehicleTypeRates.end1 = v[0] ? v[0].end : null
      vehicleTypeRates.rate2 = v[1] ? v[1].rate : null
      vehicleTypeRates.start2 = v[1] ? v[1].start : null
      vehicleTypeRates.end2 = v[1] ? v[1].end : null
      vehicleTypeRates.rate3 = v[2] ? v[2].rate : null
      vehicleTypeRates.start3 = v[2] ? v[2].start : null
      vehicleTypeRates.end3 = v[2] ? v[2].end : null

      return <VehicleTypeEditor vehicleType={{ ...vehicleType, ...vehicleTypeRates }} onSave={this.saveVehicleType} />;
    }

    if (!vehicleType && id !== 'new') return <Redirect to="/vehicletype" />;

    return <VehicleTypeEditor vehicleType={vehicleType} onSave={this.saveVehicleType} />;
  };

  render() {
    if (this.props.authState.isPending || this.state.loading) {
      return <Loading />;
    }
    const { classes } = this.props;

    return (
      <Fragment>
        <Typography variant="h5">Vehicle Types</Typography>
        {this.state.vehicleTypes.length > 0 ? (
          <Paper elevation={1} className={classes.posts}>
            <List>
              {this.state.vehicleTypes.map(vehicleType => {
                return <ListItem key={vehicleType._id} button component={Link} to={`/vehicletype/${vehicleType._id}`}>
                  <ListItemText
                    primary={vehicleType.name}
                    secondary={vehicleType.description}
                  />
                  <ListItemText
                    primary={`Rate/hour: $${vehicleType.rates[0] ? vehicleType.rates[0].rate : ''}`}
                  />
                  <Button size="small" color="primary" onClick={(event) => {
                    event.preventDefault();
                    this.deleteVehicleType(vehicleType._id)
                  }}>Delete</Button>
                </ListItem>
              })}
            </List>
          </Paper>
        ) : (
            !this.state.loading && <Typography variant="subtitle1">No vehicle types to display</Typography>
          )}
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          component={Link}
          to="/vehicletype/new"
        >
          <AddIcon />
        </Fab>
        <Route exact path="/vehicletype/:id" render={this.renderEditor} />
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
)(VehicleType);