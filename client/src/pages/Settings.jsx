import React from 'react';
import {
  Typography,
} from '@material-ui/core';
import {
  withStyles,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Paper
} from '@material-ui/core';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { withOktaAuth } from '@okta/okta-react';
import apiClient, { patchBody } from '../libs/apiClient';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Loading from '../components/Loading';
import { required, composeValidators, mustBeNumber, minValue, maxValue } from '../utils/validations';


const styles = theme => ({
  card: {
    width: '90%',
    maxWidth: 500,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardField: {
    marginTop: theme.spacing(2),
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
});


class Settings extends React.Component {

  state = {
    settings: null,
    error: null
  };

  componentDidMount() {
    this.getSettings();
  }

  async getSettings() {
    try {
      const [settings] = await apiClient('/api/settings', { method: "GET" })
      this.setState({
        settings
      })
    } catch (error) {
      this.setState({ error })
    }

  }

  handleSubmit = async (data) => {
    try {
      await apiClient('/api/settings', {
        method: "PUT",
        body: JSON.stringify(data)
      })
      await this.getSettings();
      alert("Settings saved successfully");
    } catch (error) {
      this.setState({ error })
    }
    
  }

  render() {
    if (this.props.authState.isPending || this.state.loading) {
      return <Loading />;
    }
    const { history, classes } = this.props;
    return <Typography variant="h4" align='center'>
      <Form initialValues={this.state.settings} onSubmit={this.handleSubmit}>
        {({ handleSubmit }) => (<Card className={classes.card}>
          <form onSubmit={handleSubmit}>
            <CardContent className={classes.cardContent}>
              <Paper className={classes.root}>
                <Typography variant="h5" component="h3">
                  Application Settings
                </Typography>
              </Paper>
              <Field name="membershipFee" validate={composeValidators(required, mustBeNumber, minValue(0))}>
                {({ input, meta }) => <>
                  <TextField className={classes.cardField} label="Membership Fee ($)" autoFocus {...input} />
                  {meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}
                </>}
              </Field>
              <Field name="lateFee" validate={composeValidators(required, mustBeNumber, minValue(0))}>
                {({ input, meta }) => <>
                  <TextField className={classes.cardField} label="Late Payment Fee ($)" autoFocus {...input} />
                  {meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}
                </>}
              </Field>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" type="submit">Save</Button>
              <Button size="small" onClick={() => history.goBack()}>Cancel</Button>
            </CardActions>
          </form>
        </Card>
        )}
      </Form>
      {this.state.error && (
        <ErrorSnackbar
          onClose={() => this.setState({ error: null })}
          message={this.state.error.message}
        />
      )}
    </Typography>
  }
}

export default compose(
  withOktaAuth,
  withRouter,
  withStyles(styles),
)(Settings);
