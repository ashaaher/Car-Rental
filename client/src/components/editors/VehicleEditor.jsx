import React from 'react';
import {
    withStyles,
    Card,
    CardContent,
    CardActions,
    Modal,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel
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

class VehicleEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, vehicle, onSave, history, readOnly, vehicleTypes, locations } = this.props;
        return <Form initialValues={vehicle} onSubmit={onSave}>
            {({ handleSubmit }) => (
                <Modal
                    className={classes.modal}
                    onClose={() => history.goBack()}
                    open
                >
                    <Card className={classes.modalCard}>
                        <form onSubmit={handleSubmit}>
                            <CardContent className={classes.modalCardContent}>
                                <Field name="vehicleTypeId" validate={required}>
                                    {({ input, meta }) => <>
                                        <InputLabel id="demo-simple-select-label">Type Of Vehicle</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            disabled={readOnly}
                                            autoFocus
                                            {...input}
                                        >
                                            {
                                                vehicleTypes.map(type => {
                                                    return <MenuItem value={type._id}>{type.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                        {meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}
                                    </>}
                                </Field>
                                <Field name="make" validate={required}>
                                    {({ input, meta }) => <>
                                        <TextField label="Make of the vehicle" disabled={readOnly} {...input} />
                                        {meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}
                                    </>}
                                </Field>
                                <Field name="model" validate={required}>
                                    {({ input, meta }) => <>
                                        <TextField label="Model of the Vehicle" disabled={readOnly} {...input} />
                                        {meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}
                                    </>}
                                </Field>
                                <Field name="locationId" validate={required}>
                                    {({ input, meta }) => <>
                                        <InputLabel id="demo-simple-select-label">Location Of Vehicle</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            disabled={readOnly}
                                            autoFocus
                                            {...input}
                                        >
                                            {
                                                locations.map(loc => {
                                                    return <MenuItem value={loc._id}>{loc.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                        {meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}
                                    </>}
                                </Field>
                                <Field name="licencePlateNumber">
                                    {({ input }) => <TextField label="Licence Plate Number" disabled={readOnly} {...input} />}
                                </Field>
                                <Field name="mileage">
                                    {({ input }) => <TextField label="Mileage" disabled={readOnly} {...input} />}
                                </Field>
                                <Field name="stateOfRegistration">
                                    {({ input }) => <TextField label="State Of Registration" disabled={readOnly} {...input} />}
                                </Field>
                                <Field name="condition">
                                    {({ input }) => <TextField label="Vehicle Condition" disabled={readOnly} {...input} />}
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
)(VehicleEditor);
