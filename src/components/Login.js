import React from 'react';
import { TextField, Button, FormControl, createMuiTheme } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../actions';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from "@material-ui/styles";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Tooltip from '@material-ui/core/Tooltip';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';

const initialValues = {
    email: '',
    password: ''
}

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
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
    loginText: {
        textAlign: 'center'
    },
    textFields: {
        width: '60%',
        margin: '1%',
        marginLeft: '20%'
    },
    loginBtn: {
        margin: '1%',
        marginLeft: '40%'
    },
    darkModeIcon: {
        float: 'right',
        '&:hover': {
            cursor: 'pointer'
        }
    }
}));

function Login() {
    const classes = useStyles();
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
    const redirectToRegister = useSelector(state => state.userReducer.redirectToRegister);
    const viewMode = useSelector(state => state.userReducer.viewMode);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues,
        onSubmit: values => {
            dispatch(Actions.login(values));
            formik.resetForm();
        },
        validationSchema
    });

    function handleRedirectToRegister() {
        dispatch(Actions.redirectToRegister());
    }

    function handleDarkMode() {
        if (viewMode === 'dark') {
            dispatch(Actions.lightMode())
        }
        else {
            dispatch(Actions.darkMode());
        }
    }

    const theme = createMuiTheme({
        palette: {
            type: viewMode
        }
    });

    if (isLoggedIn) {
        return (
            <Redirect to="/" />
        );
    }

    if (redirectToRegister) {
        return (
            <Redirect to="/register" />
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
                    <h1 className={classes.loginText}>Login Here!</h1>
                    <form onSubmit={formik.handleSubmit}>
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
                        <br></br>
                        <Button className={classes.loginBtn} variant="contained" color="primary" type="submit">
                            Login
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleRedirectToRegister}>
                            Register?
                        </Button>
                    </form>
                </Paper>
            </Paper>
        </ThemeProvider>
    );
}

export default Login;