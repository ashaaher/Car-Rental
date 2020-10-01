import React, { Component } from 'react';
import { withOktaAuth } from '@okta/okta-react';
import {
  withStyles,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField
} from '@material-ui/core';
import { compose } from 'recompose';
import apiClient, { patchBody } from '../libs/apiClient';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ErrorSnackbar from '../components/ErrorSnackbar';
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
  dateInput: {
    height: '35px'
  }
});

class Bookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      booking: null,
      pricing: null,
      actualReturnTime: null,
      condition: null
    }
  }

  componentDidMount() {
    this.getBookings();
  }

  async getBookings() {
    try {
      const user = this.props.authService ? await this.props.authService.getUser() : null;
      const [booking] = await apiClient(`/api/bookings/${user.sub}`, { method: "GET" });
      if (booking) {
        const vehicle = await apiClient(`/api/vehicles/${booking.vehicleId}`, { method: "GET" })
        this.setState({
          loading: false,
          booking: {
            vehicle,
            ...booking
          }
        });
      } else {
        this.setState({
          loading: false,
          booking: null
        });
      }
    } catch (error) {
      this.setState({ loading: false, error })
    }

  }

  async getPrice(cancel) {
    try {
      if (cancel) {
        const pricing = await apiClient(
          `/api/bookings/${this.state.booking._id}/price/${new Date().toISOString()}`,
          { method: "GET" }
        )
        this.setState({
          pricing
        })
      }else if (this.state.actualReturnTime) {
        const pricing = await apiClient(
          `/api/bookings/${this.state.booking._id}/price/${this.state.actualReturnTime.toISOString()}`,
          { method: "GET" }
        )
        this.setState({
          pricing
        })
      } else {
        this.setState({
          error: {
            message: "Please select date on which vehicle was returned"
          }
        })
      }
    } catch (error) {
      this.setState({ error })
    }
  }

  async deleteBooking() {
    try {
      await apiClient(
        `/api/bookings/${this.state.booking._id}`,
        { method: "DELETE" }
      )
      await this.getBookings();
    } catch (error) {
      this.setState({ error })
    }
  }


  render() {
    if (this.props.authState.isPending || this.state.loading) {
      return <Loading />;
    }
    const { classes } = this.props;

    return (
      <div className={classes.mainContainer}>
        {this.state.booking ? <Card className={classes.modalCard}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Vehicle
              </Typography>
            <Typography variant="h5" gutterBottom>
              {this.state.booking.vehicle ? `${this.state.booking.vehicle.make} ${this.state.booking.vehicle.model}` : ""}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Booking Start Time
              </Typography>
            <Typography variant="h5" gutterBottom>
              {new Date(this.state.booking.startTime).toLocaleString()}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Booking Return Time
              </Typography>
            <Typography variant="h5" gutterBottom>
              {new Date(this.state.booking.endTime).toLocaleString()}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Select return Time
            </Typography>
            <DatePicker
              className={classes.dateInput}
              selected={this.state.actualReturnTime ? this.state.actualReturnTime : null}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="Select return time"
              onChange={(value) => { this.setState({ actualReturnTime: value }) }}
            />
            <Typography color="textSecondary" gutterBottom>
              Condition At Return/Comments
            </Typography>
            <TextField
              value={this.state.value}
              onChange={(value) => { this.setState({ condition: value }) }}
            />

            <CardActions>
              <Button variant="contained" onClick={() => { this.getPrice(true) }}>Cancel Booking</Button>
              <Button variant="contained" color="primary" onClick={() => { this.getPrice() }}>Return Vehicle</Button>
            </CardActions>
          </CardContent>
          {this.state.pricing ? <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Price that will be charged to your card
              </Typography>
            <Typography variant="h5" gutterBottom>
              {this.state.pricing ? `${Math.round(this.state.pricing.totalPrice)}` : ""}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Hours
              </Typography>
            <Typography variant="h5" gutterBottom>
              {this.state.pricing ? `${Math.round(this.state.pricing.totalHours)}` : ""}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Late Fee
              </Typography>
            <Typography variant="h5" gutterBottom>
              {this.state.pricing ? `${Math.round(this.state.pricing.lateFee)}` : ""}
            </Typography>
            <CardActions>
              <Button variant="contained" onClick={() => { this.setState({ pricing: null }) }}>Cancel</Button>
              <Button variant="contained" color="primary" onClick={() => { this.deleteBooking() }}>Confirm</Button>
            </CardActions>
          </CardContent> : null}
        </Card> : <Typography variant="subtitle1">No current booking found</Typography>}
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
  withStyles(styles),
)(Bookings);