import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as Actions from '../actions';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { useFormik } from 'formik';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import PostOnProfile from './PostOnProfile';
import UpdatePasswordModal from './UpdatePasswordModal';
import { SnackbarProvider } from 'notistack';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.1)',
            outline: '1px solid slategrey'
        }
    },
    root: {
        minHeight: '100vh',
        flexWrap: 'wrap',
        display: 'grid'
    },
    profilePaper: {
        margin: '2%',
        display: 'flex',
    },
    avatar: {
        width: theme.spacing(30),
        height: theme.spacing(30),
    },
    locationBox: {
        margin: '1%',
        width: '20%',
    },
    descriptionBox: {
        margin: '1%',
        width: '40%',
    },
    ratingBox: {
        margin: '1%',
        width: '20%',
    },
    inputFile: {
        display: 'none'
    },
    photoCameraIcon: {
        float: 'right',
        cursor: 'pointer'
    },
    photoCameraSubmitBtnTrue: {
        display: 'true'
    },
    photoCameraSubmitBtnFalse: {
        display: 'none'
    },
    editLocationFalse: {
        display: 'none',
    },
    editLocationTrue: {
        display: 'true'
    },
    editLocationIcon: {
        float: 'right',
        marginRight: '50%',
        cursor: 'pointer'
    },
    editDescriptionFalse: {
        display: 'none',
    },
    editDescriptionTrue: {
        width: '80%',
        display: 'true'
    },
    editDescriptionIcon: {
        float: 'right',
        cursor: 'pointer'
    },
    updatePasswordButton: {
        float: 'right',
        marginRight: '2%'
    },
    postPaper: {
        margin: '2%',
        display: 'flex',
        flexWrap: 'wrap',
    },
    recentPost: {
        margin: '2%',
        marginLeft: '2%',
        padding: '1%',
    },
    postPaperHeading: {
        marginLeft: '2%',
        width: '20%'
    },
    togglePostsButton: {
        textAlign: 'center',
        marginBottom: '1%'
    },
    toggleButtonsDisplay: {
        display: 'none'
    }
}));

function UserProfile(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const name = useSelector(state => state.userReducer.user.name);
    const image = useSelector(state => state.userReducer.user.image);
    const uploadingImage = useSelector(state => state.userReducer.uploadingImage);
    const description = useSelector(state => state.userReducer.user.description);
    const location = useSelector(state => state.userReducer.user.location);
    const rating = useSelector(state => state.userReducer.user.rating);
    const sameUserVisitProfile = useSelector(state => state.userReducer.user.sameUserVisitProfile);
    const token = useSelector(state => state.userReducer.token);
    const viewMode = useSelector(state => state.userReducer.viewMode);
    const editLocation = useSelector(state => state.userReducer.editLocation);
    const editDescription = useSelector(state => state.userReducer.editDescription);
    const allUserPosts = useSelector(state => state.postReducer.allUserPosts);
    const recentPosts = useSelector(state => state.postReducer.recentPosts);
    const togglePosts = useSelector(state => state.postReducer.togglePosts);
    const linearProgress = useSelector(state => state.userReducer.linearProgress);

    const theme = createMuiTheme({
        palette: {
            type: viewMode
        }
    });

    const imageFormik = useFormik({
        initialValues: {
            image: null
        },
        onSubmit: values => {
            dispatch(Actions.uploadImage(values.image));
            dispatch(Actions.toggleImageUploadBtn());
        }
    });

    const locationFormik = useFormik({
        initialValues: {
            location: ''
        },
        onSubmit: values => {
            dispatch(Actions.uploadLocation(values));
            dispatch(Actions.toggleEditLocation());
        }
    });

    const descriptionFormik = useFormik({
        initialValues: {
            description: ''
        },
        onSubmit: values => {
            dispatch(Actions.uploadDescription(values));
            dispatch(Actions.toggleEditDescription());
        }
    });

    function handleEditLocationIconClicked() {
        dispatch(Actions.toggleEditLocation());
    }

    function handleEditDescriptionIconClicked() {
        dispatch(Actions.toggleEditDescription());
    }

    function handlePhotoCameraIconClicked() {
        dispatch(Actions.toggleImageUploadBtn());
    }

    function handleTogglePostButton() {
        dispatch(Actions.togglePosts());
    }

    useEffect(() => {
        dispatch(Actions.toggleLinearProgress());
        if (!props.match.params.userId) {
            dispatch(Actions.getLoggedInUser());
        } else {
            dispatch(Actions.getLoggedInUserWithUserId(props.match.params.userId));
        }
    }
        , [dispatch, props.match.params.userId]);

    useEffect(() => {
        if (!props.match.params.userId) {
            dispatch(Actions.getRecentPosts());
        } else {
            dispatch(Actions.getRecentPosts2(props.match.params.userId));
        }
    }
        , [dispatch, props.match.params.userId]);

    useEffect(() => {
        if (!props.match.params.userId) {
            dispatch(Actions.getAllUserPosts());
        } else {
            dispatch(Actions.getAllUserPosts2(props.match.params.userId));
        }
    }
        , [dispatch, props.match.params.userId]);

    if (!token) {
        return <Redirect to="/login" />
    }

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                <Paper className={classes.root}>
                    <div>
                        <NavBar linearProgress={linearProgress} />
                        <Paper className={classes.profilePaper}>
                            <div>
                                <label htmlFor="imageUpload">
                                    {sameUserVisitProfile && <PhotoCameraIcon className={classes.photoCameraIcon} onClick={handlePhotoCameraIconClicked} />}
                                </label>

                                <form onSubmit={imageFormik.handleSubmit}>
                                    <input
                                        className={classes.inputFile}
                                        id="imageUpload"
                                        type="file"
                                        name="image"
                                        onChange={(event) => {
                                            imageFormik.setFieldValue("image", event.currentTarget.files[0]);
                                        }}
                                        accept="image/x-png,image/jpeg" />
                                    <Button
                                        className={uploadingImage ? classes.photoCameraSubmitBtnTrue : classes.photoCameraSubmitBtnFalse}
                                        type="submit"
                                    >
                                        Upload
                                </Button>
                                </form>
                                <Avatar className={classes.avatar} alt="No Image" src={image} />
                            </div>

                            <div className={classes.locationBox}>
                                <h1 className={classes.userName}>{name}</h1>
                                <label htmlFor="location">{sameUserVisitProfile && <EditIcon className={classes.editLocationIcon} onClick={handleEditLocationIconClicked} />}</label>
                                <h3>Location:</h3>
                                <form onSubmit={locationFormik.handleSubmit}>
                                    <TextField
                                        className={editLocation ? classes.editLocationTrue : classes.editLocationFalse}
                                        id="location"
                                        type="text"
                                        name="location"
                                        value={locationFormik.values.location}
                                        onChange={locationFormik.handleChange}
                                    />
                                </form>
                                <p className={editLocation ? classes.editLocationFalse : classes.editLocationTrue}>
                                    {location ? location : 'Not added yet'}
                                </p>
                            </div>

                            <div className={classes.descriptionBox}>
                                <label htmlFor="description">
                                    <h2>Description</h2>
                                    {sameUserVisitProfile && <EditIcon className={classes.editDescriptionIcon} onClick={handleEditDescriptionIconClicked} />}
                                </label>
                                <form onSubmit={descriptionFormik.handleSubmit}>
                                    <TextareaAutosize
                                        id="description"
                                        className={editDescription ? classes.editDescriptionTrue : classes.editDescriptionFalse}
                                        rowsMin={6}
                                        value={descriptionFormik.values.description}
                                        onChange={descriptionFormik.handleChange}
                                    />
                                    <Button
                                        className={editDescription ? classes.editDescriptionTrue : classes.editDescriptionFalse}
                                        type="submit"
                                    >
                                        Submit
                                </Button>
                                </form>
                                <p className={editDescription ? classes.editLocationFalse : classes.editDescriptionTrue}>
                                    {description ? description : 'No Description'}
                                </p>
                            </div>

                            <div className={classes.ratingBox}>
                                <h2>Reviews</h2>
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    <Typography component="legend">Client's Rating</Typography>
                                    <Rating name="read-only" value={rating ? rating : 0} readOnly />
                                </Box>
                            </div>
                        </Paper>
                        <div className={classes.updatePasswordButton}>
                            {sameUserVisitProfile && <UpdatePasswordModal />}
                        </div>
                        <h2 className={classes.postPaperHeading}>Recent Posts</h2>
                        <div className={classes.postPaper}>
                            {togglePosts ? recentPosts.map(recentPost =>
                                <div key={recentPost.id} className={classes.recentPost}>
                                    <PostOnProfile {...recentPost} />
                                </div>
                            ) : allUserPosts.map(recentPost =>
                                <div key={recentPost.id} className={classes.recentPost}>
                                    <PostOnProfile {...recentPost} />
                                </div>
                            )}
                        </div>
                        <div className={classes.togglePostsButton}>
                            <Button
                                className={togglePosts ? classes.togglePostsButton : classes.toggleButtonsDisplay}
                                variant="contained"
                                color="primary"
                                onClick={handleTogglePostButton}
                            >
                                Show All
                        </Button>
                        </div>
                        <div className={classes.togglePostsButton}>
                            <Button
                                className={togglePosts ? classes.toggleButtonsDisplay : classes.togglePostsButton}
                                variant="contained"
                                color="primary"
                                onClick={handleTogglePostButton}
                            >
                                Show Less
                        </Button>
                        </div>
                    </div>
                </Paper>
                <Footer />
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default UserProfile;