import React from 'react';
import { FormControl, TextField, Button, createMuiTheme } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../actions';
import { Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from '@material-ui/core/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Tooltip from '@material-ui/core/Tooltip';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('First name is required'),
    password: Yup.string().required("This field is required").min(8, 'Minimum length should be 8'),
    confirmPassword: Yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Both password need to be the same"
        )
    })
});

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        justifyContent: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            width: theme.spacing(60),
            height: theme.spacing(60),
        },

    },
    secondPaper: {
        marginTop: '5%',
        border: '1px solid black'
    },
    registerText: {
        textAlign: 'center'
    },
    nameTextFields: {
        margin: '1%',
        width: '48%'
    },
    textFields: {
        margin: '1%',
        width: '98%',
    },
    registerBtn: {
        margin: '1%',
        marginLeft: '58%'
    },
    darkModeIcon: {
        float: 'right',
        '&:hover': {
            cursor: 'pointer'
        }
    }
}));

function Register() {
    const classes = useStyles();
    const redirectToLogin = useSelector(state => state.userReducer.redirectToLogin);
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    const viewMode = useSelector(state => state.userReducer.viewMode);

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues,
        onSubmit: values => {
            dispatch(Actions.addUser(values));
            formik.resetForm();
            dispatch(Actions.redirectToLogin());
        },
        validationSchema
    });

    const theme = createMuiTheme({
        palette: {
            type: viewMode
        }
    });

    function handleRedirectToLogin() {
        dispatch(Actions.redirectToLogin());
    }

    function handleDarkMode() {
        if (viewMode === 'dark') {
            dispatch(Actions.lightMode())
        }
        else {
            dispatch(Actions.darkMode());
        }
    }

    if (isLoggedIn) {
        return (
            <Redirect to="/" />
        );
    }

    if (redirectToLogin) {
        return (
            <Redirect to="/login" />
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Paper className={classes.root}>
                <Paper className={classes.secondPaper}>
                    {viewMode === 'light' ?
                        <Tooltip title="Enable Dark Mode">
                            <Brightness4Icon className={classes.darkModeIcon} onClick={handleDarkMode} />
                        </Tooltip>
                        :
                        <Tooltip title="Enable Light Mode">
                            <BrightnessHighIcon className={classes.darkModeIcon} onClick={handleDarkMode} />
                        </Tooltip>
                    }
                    <h1 className={classes.registerText}>Register Here!</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl className={classes.nameTextFields}>
                            <TextField
                                label="First name *"
                                variant="outlined"
                                type="text"
                                name="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.firstName && formik.touched.firstName}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                        </FormControl>

                        <FormControl className={classes.nameTextFields}>
                            <TextField
                                label="Last name *"
                                variant="outlined"
                                type="text"
                                name="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.lastName && formik.touched.lastName}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />
                        </FormControl>

                        <FormControl className={classes.textFields}>
                            <TextField
                                label="Email *"
                                variant="outlined"
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.email && formik.touched.email}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </FormControl>

                        <FormControl className={classes.textFields}>
                            <TextField
                                label="Password *"
                                variant="outlined"
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.password && formik.touched.password}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </FormControl>

                        <FormControl className={classes.textFields}>
                            <TextField
                                label="Confirm Password *"
                                variant="outlined"
                                type="password"
                                name="confirmPassword"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.confirmPassword && formik.touched.confirmPassword}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            />
                        </FormControl>

                        <Button className={classes.registerBtn} variant="contained" color="primary" type="submit">
                            Register
                        </Button>

                        <Button variant="contained" color="secondary" onClick={handleRedirectToLogin}>
                            Login?
                        </Button>
                    </form>
                </Paper>
            </Paper>
        </ThemeProvider>
    );
}

export default Register;