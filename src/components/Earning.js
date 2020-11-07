import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, Paper } from '@material-ui/core';
import { ThemeProvider } from "@material-ui/styles";
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../components/NavBar';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';
import { Redirect } from 'react-router-dom';
import BarChart from '../components/BarChart';
import * as Actions from '../actions';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        display: 'grid',
        flexWrap: 'wrap'
    },
    charts: {
        display: 'flex',
        margin: '1%',
    },
    lineChart: {
        maxWidth: '49%',
        minWidth: '49%',
        minHeight: '49%',
        maxHeight: '49%'
    },
    pieChart: {
        maxWidth: '49%',
        minWidth: '49%',
        minHeight: '49%',
        maxHeight: '49%'
    },
    barChart: {
        flexDirection: 'column',
        margin: '1%',
        marginBottom: '5%'
    },
    numericEarnings: {
        margin: '1%'
    }
}));

function Earning() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const viewMode = useSelector(state => state.userReducer.viewMode);
    const token = useSelector(state => state.userReducer.token);
    const numericEarning = useSelector(state => state.braintreeReducer.numericEarning);

    const theme = createMuiTheme({
        palette: {
            type: viewMode
        }
    });

    useEffect(() => dispatch(Actions.getNumericEarning()),
        [dispatch]);

    if (!token) {
        return <Redirect to="/login" />
    }

    return (
        <ThemeProvider theme={theme}>
            <Paper className={classes.root}>
                <NavBar />
                <Paper className={classes.numericEarnings}>
                    <h1>Earnings</h1>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h3 style={{ marginRight: '20%' }}>Total Earnings: RS.{numericEarning.totalEarned ? numericEarning.totalEarned : '0'}</h3>
                        <h3 style={{}}>Total Pending Clearnence: RS.{numericEarning.pendingClearence ? numericEarning.pendingClearence : '0'}</h3>
                        <h3 style={{ marginLeft: '20%' }}>Total Withdraw Money: RS.{numericEarning.withdraw ? numericEarning.withdraw : '0'}</h3>
                    </div>
                </Paper>
                <div className={classes.charts}>
                    <div className={classes.lineChart}>
                        <LineChart />
                    </div>
                    <div className={classes.pieChart}>
                        <PieChart />
                    </div>

                </div>
                <div className={classes.barChart}>
                    <BarChart />
                </div>
            </Paper>
            <Footer />
        </ThemeProvider>
    );
}

export default Earning;