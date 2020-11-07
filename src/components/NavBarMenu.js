import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../actions';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    navLinkTextLight: {
        textDecoration: 'none',
        color: 'black'
    },
    navLinkTextDark: {
        textDecoration: 'none',
        color: 'white'
    }
}));

function NavBarMenu() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isNavBarMenu = useSelector(state => state.userReducer.isNavBarMenu);
    const viewMode = useSelector(state => state.userReducer.viewMode);

    function handleClick(event) {
        dispatch(Actions.toggleNavBarMenu(event.currentTarget));
    }

    function handleClose() {
        dispatch(Actions.toggleNavBarMenu(null));
    }

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" style={{ color: 'white' }} onClick={handleClick}>
                More<ArrowDropDownIcon />
            </Button>
            <Menu
                id="NavBarMenu"
                keepMounted
                anchorEl={isNavBarMenu}
                open={Boolean(isNavBarMenu)}
                onClose={handleClose}
            >
                <NavLink className={viewMode === 'light' ? classes.navLinkTextLight : classes.navLinkTextDark} to='/earning'>
                    <MenuItem onClick={handleClose}>Earning</MenuItem>
                </NavLink>
                <MenuItem onClick={handleClose}>Expense</MenuItem>
                <MenuItem onClick={handleClose}>Support</MenuItem>
            </Menu>
        </div>
    );
}

export default NavBarMenu;