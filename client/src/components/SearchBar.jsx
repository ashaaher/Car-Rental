import React from 'react';
import {
    withStyles,
    CardContent,
    Button,
    TextField,
    Select,
    MenuItem,
} from '@material-ui/core';
import { withOktaAuth } from '@okta/okta-react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { required } from '../utils/validations';

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
        flexDirection: 'row',
    },
    marginTop: {
        marginTop: theme.spacing(2),
    },
    modalField: {
        width: "25%",
        marginLeft: "20px"
    },
    dateInput: {
        marginLeft: "20px",
        textAlign: "center",
        height: "35px",
        marginTop: "15px",
        fontSize: "14px"
    },
    button: {
        marginLeft: '20px'
    }
});

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, onSearch, locations } = this.props;
        return <Form initialValues={{ locationId: 'all' }} onSubmit={onSearch}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <CardContent className={classes.modalCardContent}>
                        <Field name="searchText" validate={required}>
                            {({ input, meta }) => <>
                                <TextField className={classes.modalField} label="Name of the vehicle" {...input} />
                                {meta.error && meta.touched && <span style={{ color: "red" }}>*</span>}
                            </>}
                        </Field>
                        <Field name="locationId">
                            {({ input }) => <>
                                <Select
                                    className={classes.modalField}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    autoFocus
                                    {...input}
                                >
                                    {
                                        locations.map(loc => {
                                            return <MenuItem value={loc._id}>{loc.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </>}
                        </Field>
                        <Field name="startTime" validate={required}>
                            {({ input, meta }) => <>
                                <DatePicker
                                    className={classes.dateInput}
                                    selected={input.value}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={60}
                                    timeCaption="time"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    placeholderText="Select pickup time"
                                    {...input}
                                />
                                {meta.error && meta.touched && <span style={{ color: "red" }}>*</span>}

                            </>}
                        </Field>
                        <Field name="endTime" validate={required}>
                            {({ input, meta }) => <>
                                <DatePicker
                                    className={classes.dateInput}
                                    selected={input.value}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={60}
                                    timeCaption="time"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    placeholderText="Select return time"
                                    {...input}
                                />
                                {meta.error && meta.touched && <span style={{ color: "red" }}>*</span>}
                            </>}
                        </Field>
                        <Button variant="contained" className={classes.button} size="small" color="primary" type="submit">Search</Button>
                    </CardContent>
                </form>
            )}
        </Form>
    }
}

export default compose(
    withOktaAuth,
    withRouter,
    withStyles(styles),
)(SearchBar);
