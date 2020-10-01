import React from 'react';
import {
  withStyles,
  Card,
  CardContent,
  CardActions,
  Modal,
  Button,
  TextField,

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

class LocationEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, locationV, onSave, history, readOnly } = this.props;
    return <Form initialValues={locationV} onSubmit={onSave}>
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
                    <TextField label="Name of the location" disabled={readOnly} {...input} />
                    {meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}
                  </>}
                </Field>
                <Field name="capacity" validate={composeValidators(required, mustBeNumber, minValue(1))}>
                  {({ input, meta }) => <><TextField label="Capacity of Vehicles" disabled={readOnly} {...input} />
                    {meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}
                  </>}
                </Field>
                <Field name="address" validate={required}>
                  {({ input, meta }) => <><TextField label="Address" multiline
                    rows={4} disabled={readOnly} {...input} />
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
)(LocationEditor);
