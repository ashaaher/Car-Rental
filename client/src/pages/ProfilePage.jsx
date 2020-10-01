import React from 'react';
import { withOktaAuth } from '@okta/okta-react';
import {
  Typography,
  Button,
  CardContent,
  CardActions
} from '@material-ui/core';
import apiClient from '../libs/apiClient';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Loading from '../components/Loading';

export default withOktaAuth(
  class ProfilePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = { loading: true, error: null, user: null };
      this.getCurrentUser = this.getCurrentUser.bind(this);
    }

    async getCurrentUser() {
      this.props.authService.getUser().then(user => this.setState({ user, loading: false }));
    }

    componentDidMount() {
      this.getCurrentUser();
    }

    async deleteUser() {
      try {
        await apiClient(`/api/users/${this.state.user.sub}`, { method: "DELETE" })
        this.props.authService.logout();
      } catch (error) {
        this.setState({ error })
      }
    }

    render() {
      if (this.props.authState.isPending || this.state.loading) {
        return <Loading />;
      }
      if (!this.state.user) return null;
      const startDate = new Date(this.state.user.updated_at * 1000);
      return (
        <section className="user-profile">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Name
            </Typography>
            <Typography variant="h5" gutterBottom>
              {this.state.user.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Email
            </Typography>
            <Typography variant="h5" gutterBottom>
              {this.state.user.email}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              User Since
              </Typography>
            <Typography variant="h5" gutterBottom>
              {startDate.toLocaleString()}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Membership Valid Upto
              </Typography>
            <Typography variant="h5" gutterBottom>
              {new Date(startDate.setMonth(startDate.getMonth() + 6)).toLocaleString()}
            </Typography>
            <CardActions>
              <Button variant="contained" onClick={() => { this.deleteUser() }}>Cancel Subscription</Button>
            </CardActions>
          </CardContent>
          {this.state.error && (
            <ErrorSnackbar
              onClose={() => this.setState({ error: null })}
              message={this.state.error.message}
            />
          )}
        </section>
      );
    }
  }
);
