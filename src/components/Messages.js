import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createMuiTheme, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";
import clsx from 'clsx';
import NavBar from '../components/NavBar';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Avatar from '@material-ui/core/Avatar';
import * as Actions from '../actions';
import CardActionArea from '@material-ui/core/CardActionArea';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';

function Alert(props) {
    return <MuiAlert elevation={6} icon={false} variant="filled" {...props} />;
}

const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        }
    },

    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    userMessageBoxPaper: {
        display: 'flex',
        margin: '5% 1%',
        minHeight: '10vh',
        maxHeight: 'auto',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        margin: '1%',
    },
    mainContentMessagesBoxPaper: {
        minHeight: '60vh',
        maxHeight: '60vh',
        overflow: 'auto',
    },
    mainContentInputBoxPaper: {
        marginTop: '2%',
        maxHeight: 'auto',
    },
    messageBox: {
        minWidth: '100%',
    },
    messages: {
        display: 'flex',
    },
    loggedInUserMessages: {
        maxWidth: '40%',
        marginLeft: 'auto',
        margin: '1%'
    },
    otherUserMessages: {
        maxWidth: '40%',
        margin: '1%'
    }
}));

const initialValues = {
    message: ''
}

function Messages() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const token = useSelector(state => state.userReducer.token);
    const viewMode = useSelector(state => state.userReducer.viewMode);
    const [open, setOpen] = React.useState(true);
    const users = useSelector(state => state.messageReducer.users);
    const messagesByUser = useSelector(state => state.messageReducer.messagesByUser);
    const loggedInUserId = useSelector(state => state.messageReducer.loggedInUserId);
    const textFieldForMessages = useSelector(state => state.messageReducer.textFieldForMessages);
    const secondUserName = useSelector(state => state.messageReducer.secondUserName);
    const secondUserId = useSelector(state => state.messageReducer.secondUserId);
    const linearProgress = useSelector(state => state.messageReducer.linearProgress);

    const theme = createMuiTheme({
        palette: {
            type: viewMode
        }
    });

    const formik = useFormik({
        initialValues,
        onSubmit: values => {
            dispatch(Actions.addMessage(secondUserId, values.message));
            formik.resetForm();
        }
    });

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function handleUserMessageBoxClicked(user) {
        dispatch(Actions.toggleLinearProgress());
        dispatch(Actions.getMessagesByUser(user.id));
        dispatch(Actions.setsecondUserIdNameForMessages(user.id, user.name));
        dispatch(Actions.getReadMessageCount(user.id));
        dispatch(Actions.getLoggedInUserId());
    }

    useEffect(() => {
        dispatch(Actions.toggleLinearProgress());
        dispatch(Actions.getUsersListForMessages());
        document.getElementById('mainContentMessagesBoxPaper').scrollTo(0, 100000);
    }, [dispatch, messagesByUser]);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(Actions.getMessagesByUser(secondUserId));
            dispatch(Actions.getReadMessageCount(secondUserId));
        }, 10000);
        return () => clearInterval(interval);
    });

    if (!token) {
        return <Redirect to="/login" />
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <NavBar linearProgress={linearProgress} />
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <h1>Messages</h1>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {users.map(user =>
                            <Paper key={user.id} className={classes.userMessageBoxPaper}>
                                <Avatar
                                    className={classes.avatar}
                                    src={`http://127.0.0.1:8000${user.image}`}
                                />
                                <CardActionArea onClick={() => handleUserMessageBoxClicked(user)}>
                                    <h3>{user.name}</h3>
                                    <p>{user.message}</p>
                                </CardActionArea>
                            </Paper>
                        )}
                    </List>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <h1>{secondUserName ? secondUserName : 'Messages'}</h1>
                    <Paper id="mainContentMessagesBoxPaper" className={classes.mainContentMessagesBoxPaper}>
                        {messagesByUser.map(message =>
                            <div key={message.id} className={classes.messages}>
                                {message.senderId === loggedInUserId ?
                                    <div className={classes.loggedInUserMessages}>
                                        <Alert severity="success" >{message.message}</Alert>
                                        <div>
                                            {message.link ?
                                                <NavLink to={message.link}>
                                                    <p>Click here to open</p>
                                                </NavLink>
                                                : ''
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div className={classes.otherUserMessages}>
                                        <Alert severity="info" >{message.message}</Alert>
                                        <div>
                                            {message.link ?
                                                <NavLink to={message.link}>
                                                    <p>Click here to open</p>
                                                </NavLink>
                                                : ''
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        )}
                    </Paper>
                    <Paper className={classes.mainContentInputBoxPaper}>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                className={classes.messageBox}
                                aria-label="minimum height"
                                variant="outlined"
                                label="Type your message here ..."
                                color="primary"
                                autoComplete="off"
                                name="message"
                                disabled={textFieldForMessages}
                                value={formik.values.message}
                                onChange={(event) => {
                                    formik.setFieldValue("message", event.currentTarget.value);
                                }}
                            />
                        </form>
                    </Paper>
                </main>
            </div>
        </ThemeProvider >
    );
}

export default Messages;