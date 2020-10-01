import React, { Fragment, Component } from 'react';
import { withOktaAuth } from '@okta/okta-react';
import { withRouter, Route, Redirect, Link } from 'react-router-dom';
import { compose } from 'recompose';
import {
  withStyles,
  Typography,
  Fab,
  Paper,
  List,
  Button,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import VehicleEditor from '../components/editors/VehicleEditor.jsx';
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

class Vehicles extends Component {
  state = {
    loading: true,
    vehicles: [],
    vehicleTypes: [],
    locations: [],
    error: null,
  };

  componentDidMount() {
    this.getVehicles();
  }

  async getVehicles() {
    try {
      const locations = await apiClient('/api/locations', { method: "GET" });
      const vehicleTypes = await apiClient('/api/vehicleTypes', { method: "GET" });
      const vehicles = await apiClient('/api/vehicles', { method: "GET" });
      this.setState({
        loading: false,
        vehicles,
        vehicleTypes,
        locations
      });
    } catch (error) {
      this.setState({ error })
    }

  }

  saveVehicle = async (data) => {

    try {
      let reqBody = {
        make: data.make,
        model: data.model,
        locationId: data.locationId,
        vehicleTypeId: data.vehicleTypeId,
        licencePlateNumber: data.licencePlateNumber,
        stateOfRegistration: data.stateOfRegistration,
        condition: data.condition,
        mileage: data.mileage
      }
      if (data._id) {
        reqBody = patchBody(reqBody);
      }
      const endpoint = data._id ? `/api/vehicles/${data._id}` : '/api/vehicles';
      await apiClient(
        endpoint,
        {
          method: data._id ? "PATCH" : "POST",
          body: JSON.stringify(reqBody)
        }
      );
      this.props.history.goBack();
      this.getVehicles();
    } catch (error) {
      this.setState({error})
    }

  }

  deleteVehicle = async(id) => {
    if (window.confirm(`Are you sure you want to delete?`)) {
      await apiClient(
        `/api/vehicles/${id}`,
        {
          method: "DELETE",
        }
      )
      await this.getVehicles();
    }
  } 

  renderEditor = ({ match: { params: { id } } }) => {
    if (this.state.loading) return null;
    let vehicle = this.state.vehicles.find(v => v._id === id);

    if (vehicle) {
      return <VehicleEditor vehicle={vehicle} vehicleTypes={this.state.vehicleTypes} locations={this.state.locations} onSave={this.saveVehicle} />;
    }

    if (!vehicle && id !== 'new') return <Redirect to="/vehicles" />;

    return <VehicleEditor vehicle={vehicle} vehicleTypes={this.state.vehicleTypes} locations={this.state.locations} onSave={this.saveVehicle} />;
  };

  render() {
    if (this.props.authState.isPending || this.state.loading) {
      return <Loading />;
    }
    const { classes } = this.props;

    return (
      <Fragment>
        <Typography variant="h5">Vehicles</Typography>
        {this.state.vehicles.length > 0 ? (
          <Paper elevation={1} className={classes.posts}>
            <List>
              {this.state.vehicles.map(vehicle => {
                const vehicleType = this.state.vehicleTypes.find(v => v._id === vehicle.vehicleTypeId);
                const vehicleLocation = this.state.locations.find(v => v._id === vehicle.locationId);

                return <ListItem key={vehicle._id} button component={Link} to={`/vehicles/${vehicle._id}`}>
                  <ListItemText
                    primary={vehicle.make}
                    secondary={vehicle.model}
                  />
                  <ListItemText
                    primary={vehicleType ? vehicleType.name : ""}
                    secondary={vehicleLocation ? vehicleLocation.name : ""}
                  />
                  <Button size="small" color="primary" onClick={(event) => {
                    event.preventDefault();
                    this.deleteVehicle(vehicle._id)
                  }}>Delete</Button>
                </ListItem>
              })}
            </List>
          </Paper>
        ) : (
            !this.state.loading && <Typography variant="subtitle1">No vehicles to display</Typography>
          )}
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          component={Link}
          to="/vehicles/new"
        >
          <AddIcon />
        </Fab>
        <Route exact path="/vehicles/:id" render={this.renderEditor} />
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
)(Vehicles);
