import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles({
    rootPaper: {
        border: '2px solid white'
    },
    root: {
        minHeight: '30vh'
    },
    rootDiv: {
        display: 'flex',
        flexDirection: 'row'
    },
    firstDiv: {
        flexDirection: 'column',
        margin: '1% 1%',
        minWidth: '31%',
    },
    divider: {
        backgroundColor: 'grey',
    },
    secondDiv: {
        textAlign: 'center',
        margin: '1%'
    }
});

function Footer() {
    const classes = useStyles();
    const viewMode = useSelector(state => state.userReducer.viewMode);

    return (
        <Paper className={viewMode === 'dark' ? classes.rootPaper : ''}>
            <AppBar position="static" color={viewMode === 'light' ? 'primary' : 'inherit'} className={classes.root}>
                <div className={classes.rootDiv}>
                    <div className={classes.firstDiv}>
                        <h2>Farmer Facilitator System</h2>
                        <p>This website is for online selling and puchasing agriculture products. You can post your AD with-in no time.</p>
                        <div style={{ display: 'flex', margin: '1%' }}>
                            <AddIcCallIcon />
                            <p style={{ marginLeft: '2%' }}>+92 321 7131003</p>
                        </div>
                        <div style={{ display: 'flex', margin: '1%' }}>
                            <ContactMailIcon />
                            <p style={{ marginLeft: '2%' }}>farmer@company.com</p>
                        </div>
                    </div>
                    <div className={classes.firstDiv}>
                        <h2>Quick Links</h2>
                        <ul>
                            <li>
                                <NavLink to="/" style={{ color: 'white' }}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/profile" style={{ color: 'white' }}>
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/messages" style={{ color: 'white' }}>
                                    Messages
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/earning" style={{ color: 'white' }}>
                                    Earnings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/messages" style={{ color: 'white' }}>
                                    Expenses
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/earning" style={{ color: 'white' }}>
                                    Support
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className={classes.firstDiv}>
                        <h2>Our Team</h2>
                        <div style={{ display: 'flex' }}>
                            <Avatar src="http://127.0.0.1:8000/images/team/nabeel.jpeg" />
                            <h3 style={{ marginLeft: '2%' }}>Nabeel Asif</h3>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <Avatar src="http://127.0.0.1:8000/images/team/shoaib.jpg" />
                            <h3 style={{ marginLeft: '2%' }}>Muhammad Shoaib</h3>
                        </div>
                        <a href="https://www.facebook.com/nabeelshiex/" style={{ color: 'white' }}><FacebookIcon fontSize="large" /></a>
                        <a href="https://www.facebook.com/nabeelshiex/" style={{ color: 'white' }}><LinkedInIcon fontSize="large" /></a>
                        <a href="https://www.facebook.com/nabeelshiex/" style={{ color: 'white' }}><TwitterIcon fontSize="large" /></a>
                    </div>
                </div>
                <Divider className={classes.divider} variant="middle" />
                <div className={classes.secondDiv}>
                    &copy; {new Date().getFullYear()} Copyright: <NavLink to="/" style={{ color: 'white' }}> Farmer Facilitator System </NavLink>
                </div>
            </AppBar>
        </Paper>
    );
}

export default Footer;