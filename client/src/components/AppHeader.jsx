import React from 'react';
import { Link } from 'react-router-dom';

import {
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import { withOktaAuth } from '@okta/okta-react';
import LoginButton from "./LoginButton";
import { withRouter } from 'react-router-dom';

const styles = {
  flex: {
    flex: 1,
  },
  tabLink: {
    display: "flex",
    alignItems: "center",
  }
};

class AppHeader extends React.Component {
  state = {
    authenticated: false,
    user: null,
    role: "admin",
    value: 0,
  };

  componentDidUpdate() {
    this.checkAuthentication();
  }

  componentDidMount() {
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = this.props.authState ? this.props.authState.isAuthenticated : false;
    const user = this.props.authService ? await this.props.authService.getUser() : null;
    const role = user && user.groups && user.groups.includes("CarRentalApp Admin") ? "admin": "user";
    if (authenticated !== this.state.authenticated) {
      this.setState({
        authenticated,
        role
      })
    }
  }
  
  handleChange = (event, newValue) => {
    // event.preventDefault();
    this.setState({value: newValue});
  };
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Car Rental System
          </Typography>
          {
            this.state.authenticated ?
              <>
                {
                  this.state.role === "admin" ?
                    <Tabs>
                      <Tab key="profile" label="Home" component={Link} className={this.props.classes.tabLink} to="/"></Tab>
                      <Tab key="vehicletype" label="Vehicle Types" component={Link} className={this.props.classes.tabLink} to="/vehicletype"></Tab>
                      <Tab key="settings" label="Settings" component={Link} className={this.props.classes.tabLink} to="/settings"></Tab>
                      <Tab key="locations" label="Locations" component={Link} className={this.props.classes.tabLink} to="/locations"></Tab>
                      <Tab key="vehicles" label="Vehicles" component={Link} className={this.props.classes.tabLink} to="/vehicles"></Tab>
                      <Tab key="users" label="Users" component={Link} className={this.props.classes.tabLink} to="/users"></Tab>

                    </Tabs> :
                    <Tabs>
                      <Tab key="home" label="Home" component={Link} className={this.props.classes.tabLink} to="/"></Tab>
                      <Tab key="customervehicles" label="Search Vehicles" component={Link} className={this.props.classes.tabLink} to="/customervehicles"></Tab>
                      <Tab key="bookings" label="My Bookings" component={Link} className={this.props.classes.tabLink} to="/bookings"></Tab>
                      <Tab key="profile" label="Profile" component={Link} className={this.props.classes.tabLink} to="/profile"></Tab>
                    </Tabs>
                }
              </>
              : null
          }


          <div className={this.props.classes.flex} />
          <LoginButton />
        </Toolbar>
      </AppBar>
    );
  }

}

export default withRouter(withOktaAuth(withStyles(styles)(AppHeader)));
