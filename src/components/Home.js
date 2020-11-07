import React, { useEffect } from 'react';
import { createMuiTheme, Paper } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";
import NavBar from './NavBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import * as Actions from '../actions';
import PostOnHome from './PostOnHome';
import Footer from './Footer';

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
        minHeight: '100vh',
        flexWrap: 'wrap',
        display: 'grid',
    },
    secondPaper: {
        maxWidth: '80%',
        display: 'grid',
        marginLeft: '10%',
        marginTop: '1%'
    },
    card: {
        maxWidth: '60%',
        marginLeft: '20%',
        border: '1px solid black',
    },
    textArea: {
        background: 'dark',
        minWidth: '99%',
    },
    postCardTitle: {
        marginBottom: '5%',
        minWidth: '99%',
    },
    cardActions: {
        float: 'right'
    },
    postsDiv: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    cardAlternateDiv: {
        maxWidth: '20%',
        marginLeft: '45%',
    }
}));

const initialValues = {
    title: '',
    description: '',
    image: null
}

const validationSchema = Yup.object({
    title: Yup.string().required('Email is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.string().required('Image is required')
});

function Home() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const token = useSelector(state => state.userReducer.token);
    const viewMode = useSelector(state => state.userReducer.viewMode);
    const allPosts = useSelector(state => state.postReducer.allPosts);
    const linearProgress = useSelector(state => state.postReducer.linearProgress);
    const isAddPost = useSelector(state => state.postReducer.isAddPost);

    const theme = createMuiTheme({
        palette: {
            type: viewMode
        }
    });

    const postAdFormik = useFormik({
        initialValues,
        onSubmit: values => {
            dispatch(Actions.addPost(values.image, values.title, values.description));
            postAdFormik.resetForm();
        },
        validationSchema
    });

    function handleAddNewPostButtonClicked() {
        postAdFormik.resetForm();
        dispatch(Actions.toggleAddNewPostCard());
    }

    useEffect(() => {
        dispatch(Actions.toggleLinearProgress());
        if (token) {
            dispatch(Actions.allPosts());
        }
    }, [dispatch, token]);

    if (!token) {
        return <Redirect to="/login" />
    }

    return (
        <ThemeProvider theme={theme}>
            <Paper className={classes.root}>
                <div className={classes.secondPaperParentDiv}>
                    <NavBar linearProgress={linearProgress} />
                    <div className={classes.secondPaper}>

                        <Card className={classes.card}>
                            <CardContent>
                                <h3>Post Ad</h3>
                                <form onSubmit={postAdFormik.handleSubmit}>
                                    <TextField
                                        className={classes.postCardTitle}
                                        id="filled-basic"
                                        label="Title"
                                        variant="filled"
                                        color="secondary"
                                        name="title"
                                        onClick={handleAddNewPostButtonClicked}
                                        value={postAdFormik.values.title}
                                        onChange={postAdFormik.handleChange}
                                    />
                                    {isAddPost ?
                                        <TextField
                                            className={classes.textArea}
                                            aria-label="minimum height"
                                            variant="filled"
                                            label="Description ..."
                                            color="secondary"
                                            name="description"
                                            multiline={true}
                                            rows={6}
                                            value={postAdFormik.values.description}
                                            onChange={postAdFormik.handleChange}
                                        />
                                        :
                                        ''
                                    }
                                    {isAddPost ?
                                        <CardActions className={classes.cardActions}>
                                            <Button type="submit" variant="contained" color="default" onClick={handleAddNewPostButtonClicked}>Cancel</Button>
                                            <Button variant="contained" color="secondary"><label htmlFor="image" style={{ cursor: 'pointer' }}>Add Image</label></Button>
                                            <input id="image"
                                                type="file"
                                                name="image"
                                                style={{ display: 'none' }}
                                                onChange={(event) => {
                                                    postAdFormik.setFieldValue("image", event.currentTarget.files[0]);
                                                }}
                                                accept="image/x-png,image/jpeg"
                                            />
                                            <Button type="submit" variant="contained" color="primary">Post</Button>
                                        </CardActions>
                                        :
                                        ''
                                    }
                                </form>
                            </CardContent>
                        </Card>


                        <div className={classes.postsDiv}>
                            {allPosts.length > 0 ? allPosts.map(post =>
                                <div key={post.id}>
                                    <PostOnHome {...post} />
                                </div>
                            ) : <h1>No Posts</h1>}
                        </div>
                    </div>
                </div>
            </Paper>
            <Footer />
        </ThemeProvider >
    );
}

export default Home;