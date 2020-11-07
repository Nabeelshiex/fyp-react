import React, { useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../actions';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { NavLink } from 'react-router-dom';
// import like from '../sounds/facebook-messenger-tone-wapking-fm-mp3-17015-19072-43455.mp3';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';
import NavBarMenu from '../components/NavBarMenu';
import Tooltip from '@material-ui/core/Tooltip';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    darkModeIcon: {
        margin: '1%',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    navLink: {
        color: 'white'
    },
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4)
    }
}));

function NavBar(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const viewMode = useSelector(state => state.userReducer.viewMode);
    const unReadMessageCount = useSelector(state => state.messageReducer.unReadMessageCount);
    const allPostsCountFromDB = useSelector(state => state.postReducer.allPostsCountFromDB);
    const allCurrentPostsCount = useSelector(state => state.postReducer.allCurrentPostsCount);
    const imageForNavBar = useSelector(state => state.userReducer.imageForNavBar);
    // const linearProgress = useSelector(state => state.userReducer.linearProgress);

    // const likeAudio = new Audio(like);

    // const playSound = audioFile => {
    //     audioFile.play();
    // };

    function handleDarkMode() {
        if (viewMode === 'dark') {
            dispatch(Actions.lightMode())
        }
        else {
            dispatch(Actions.darkMode());
        }
    }

    function handleLogout() {
        dispatch(Actions.logout());
    }

    function handleNotiIconClicked() {
        dispatch(Actions.allPosts());
    }

    useEffect(() => {
        dispatch(Actions.getImageForNavBar());
    }, [dispatch]);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(Actions.getUnReadMessageCount());
            dispatch(Actions.getCountOfAllPosts());
        }, 5000);
        return () => clearInterval(interval);
    });

    return (
        <div className={classes.grow}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <Tooltip title="Home">
                            <NavLink to='/' className={classes.navLink}>
                                Farmer Facilitator System
                            </NavLink>
                        </Tooltip>
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />

                    <NavBarMenu />

                    <div className={classes.sectionDesktop}>
                        <NavLink className={classes.navLink} to='/messages'>
                            <Tooltip title="Messages">
                                <IconButton aria-label="show 4 new mails" color="inherit">
                                    <Badge badgeContent={unReadMessageCount} color="secondary">
                                        {/* <div style={{ display: 'none' }}>
                                        {unReadMessageCount && playSound(likeAudio)}
                                    </div> */}
                                        <MailIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                        </NavLink>
                        <Tooltip title="New Post Notifications">
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                <Badge
                                    badgeContent={(allPostsCountFromDB - allCurrentPostsCount >= 0) ? allPostsCountFromDB - allCurrentPostsCount : 0}
                                    color="secondary">
                                    <NotificationsIcon onClick={handleNotiIconClicked} />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <NavLink to='/profile' className={classes.navLink}>
                            <Tooltip title="Profile">
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <Avatar className={classes.avatar} alt="user" src={imageForNavBar} />
                                </IconButton>
                            </Tooltip>
                        </NavLink>
                    </div>
                    {viewMode === 'light' ?
                        <Tooltip title="Enable Dark Mode">
                            <Brightness4Icon className={classes.darkModeIcon} onClick={handleDarkMode} />
                        </Tooltip>
                        :
                        <Tooltip title="Enable Light Mode">
                            <BrightnessHighIcon className={classes.darkModeIcon} onClick={handleDarkMode} />
                        </Tooltip>
                    }
                    <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            {props.linearProgress ? <LinearProgress color="secondary" /> : ''}
        </div>
    );
}

export default NavBar;