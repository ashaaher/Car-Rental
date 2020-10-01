import React, { Component } from 'react';
import {
  withStyles,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { withOktaAuth } from '@okta/okta-react';
import { compose } from 'recompose';
import SearchBar from '../components/SearchBar';
import apiClient from '../libs/apiClient';
import ErrorSnackbar from '../components/ErrorSnackbar';
import { withRouter, useHistory } from 'react-router-dom';
import Loading from '../components/Loading';

const styles = theme => ({
  mainContainer: {
    margin: theme.spacing(3)
  },
  posts: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
    maxHeight: '500px',
    overflow: 'auto',
    margin: theme.spacing(3),
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

class CustomerVehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      locations: [],
      vehicles: [],
      error: null,
      startTime: null,
      endTime: null
    }
  }

  componentDidMount() {
    this.getInitialData();
  }

  async getInitialData() {
    try {
      const locations = await apiClient('/api/locations', { method: "GET" });
      this.setState({
        loading: false,
        locations
      });
    } catch (error) {
      this.setState({ loading: false, error })
    }

  }

  async getVehicles(searchParams) {
    try {
      const { startTime, endTime } = searchParams;
      if (startTime > endTime) {
        throw new Error("Start time cannot be earlier than return time")
      }
      if(Math.floor(Math.abs(startTime - endTime) / 36e5) > 72) {
        throw new Error("Cannot book for more than 72 hours")
      }
      let searchQuery = { search: {} };
      if (searchParams.searchText) {
        searchQuery.search.searchText = searchParams.searchText;
      }
      if (searchParams.locationId && searchParams.locationId !== 'all') {
        searchQuery.search.locationId = searchParams.locationId;
      }
      const vehicles = await apiClient(
        '/api/vehicles/search',
        {
          method: "POST",
          body: JSON.stringify(searchQuery)
        }
      );
      this.setState({
        vehicles,
        startTime,
        endTime
      })
    } catch (error) {
      this.setState({
        error
      })
    }


  }

  async bookVehicle(vehicle) {
    if (window.confirm(`Selected vehicle will be booked for time period specified, Are you sure?`)) {
      try {
        if (this.state.startTime && this.state.endTime) {
          const user = this.props.authService ? await this.props.authService.getUser() : null;
          await apiClient(
            `/api/bookings`,
            {
              method: "POST",
              body: JSON.stringify({
                vehicleId: vehicle._id,
                userId: user.sub,
                startTime: this.state.startTime.toISOString(),
                endTime: this.state.endTime.toISOString()
              })
            }
          )
          alert("Booking successfully done, Please check your current booking page")
        } else {
          this.setState({
            error: {
              message: "Please select correct pickup and dropoff time"
            }
          })
        }
      } catch (error) {
        this.setState({error: {
          message: "Error occured while booking the vehicle, make sure you cancel the previous booking or Please try again"
        }})
      }
    }
  }

  render() {
    if (this.props.authState.isPending || this.state.loading) {
      return <Loading />;
    }
    const { classes } = this.props;

    return (
      <div className={classes.mainContainer}>
        <SearchBar locations={[{ _id: "all", name: "All Locations" }, ...this.state.locations]} onSearch={(data) => {
          this.getVehicles(data);
        }} />
        {this.state.vehicles.length > 0 ? (
          <Paper elevation={1} className={classes.posts}>
            <List>
              {this.state.vehicles.map(vehicle => {
                const vehicleLocation = this.state.locations.find(v => v._id === vehicle.locationId);

                return <ListItem key={vehicle._id} >
                  <ListItemText
                    primary={vehicle.make}
                    secondary={vehicle.model}
                  />
                  <ListItemText
                    secondary={vehicleLocation ? vehicleLocation.name : ""}
                  />
                  <Button size="small" color="primary" onClick={() => {
                    this.bookVehicle(vehicle)
                  }}>Book</Button>

                </ListItem>
              })}
            </List>
          </Paper>
        ) : (
            !this.state.loading && <Typography variant="subtitle1">No vehicles to display for selected search options</Typography>
          )}
        {this.state.error && (
          <ErrorSnackbar
            onClose={() => this.setState({ error: null })}
            message={this.state.error.message}
          />
        )}
      </div>
    );
  }
}

export default compose(
  withOktaAuth,
  withRouter,
  withStyles(styles),
)(CustomerVehicles);
