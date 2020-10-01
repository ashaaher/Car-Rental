import React from 'react';
import {
  withStyles,
  Typography,
  Card,
  CardContent,
  CardActions,
  Modal,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Link
} from '@material-ui/core';
import { withOktaAuth } from '@okta/okta-react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import { required, composeValidators, mustBeNumber, minValue, maxValue } from '../../utils/validations';

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    width: '60%',
    maxWidth: 800
  },
  modalCardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
});

class VehicleTypeEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, vehicleType, onSave, history, readOnly } = this.props;
    return <Form initialValues={vehicleType} onSubmit={onSave}>
      {({ handleSubmit }) => (
        <Modal
          className={classes.modal}
          onClose={() => history.goBack()}
          open
        >
          <Card className={classes.modalCard}>
            <form onSubmit={handleSubmit}>
              <CardContent className={classes.modalCardContent}>
                <Field name="name" validate={required}>
                  {({ input, meta }) => <>
                    <TextField label="Type of vehicle" disabled={readOnly} {...input} />
                    {meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}
                  </>}
                </Field>
                <Field name="description">
                  {({ input }) => <TextField label="Vehicle Class Description" disabled={readOnly} {...input} />}
                </Field>
                <Field name="rate1" validate={composeValidators(required, mustBeNumber, minValue(0))}>
                  {({ input, meta }) => <>
                    <TextField label="Rate #1" disabled={readOnly} {...input} />
                    {meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}
                  </>}
                </Field>
                <Field name="start1" validate={composeValidators(required, mustBeNumber, minValue(0))}>
                  {({ input, meta }) => <>
                    <TextField label="Start Hour #1" disabled={readOnly} {...input} />
                    {meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}

                  </>}
                </Field>
                <Field name="end1" validate={composeValidators(required, mustBeNumber, minValue(0), maxValue(72))}>
                  {({ input, meta }) => <>
                    <TextField label="End Hour #1" disabled={readOnly} {...input} />
                    {meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}
                  </>}
                </Field>
                <Field name="rate2" validate={composeValidators(mustBeNumber, minValue(0))}>
                  {({ input, meta }) => <>
                    <TextField label="Rate #2" disabled={readOnly} {...input} />
                    {meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}
                  </>}
                </Field>
                <Field name="start2" validate={composeValidators(mustBeNumber, minValue(0))}>
                  {({ input, meta }) => <>
                    <TextField label="Start Hour #2" disabled={readOnly} {...input} />
                    {meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}
                  </>}
                </Field>
                <Field name="end2" validate={composeValidators(mustBeNumber, minValue(0), maxValue(72))}>
                  {({ input, meta }) => <>
                    <TextField label="End Hour #2" disabled={readOnly} {...input} />
                    {meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}
                  </>}
                </Field>
                <Field name="rate3" validate={composeValidators(mustBeNumber, minValue(0))}>
                  {({ input, meta }) => <>
                    <TextField label="Rate #3" disabled={readOnly} {...input} />
                    {meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}
                  </>}
                </Field>
                <Field name="start3" validate={composeValidators(mustBeNumber, minValue(0))}>
                  {({ input, meta }) => <>
                    <TextField label="Start Hour #3" disabled={readOnly} {...input} />
                    {meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}
                  </>}
                </Field>
                <Field name="end3" validate={composeValidators(mustBeNumber, minValue(0), maxValue(72))}>
                  {({ input, meta }) => <>
                    <TextField label="End Hour #3" disabled={readOnly} {...input} />
                    {meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}
                  </>}
                </Field>
              </CardContent>
              {
                readOnly ?
                  <CardActions>
                    <Button size="small" onClick={() => history.goBack()}>Close</Button>
                  </CardActions> :
                  <CardActions>
                    <Button size="small" color="primary" type="submit">Save</Button>
                    <Button size="small" onClick={() => history.goBack()}>Cancel</Button>
                  </CardActions>
              }
            </form>
          </Card>
        </Modal>
      )}
    </Form>
  }
}

export default compose(
  withOktaAuth,
  withRouter,
  withStyles(styles),
)(VehicleTypeEditor);
