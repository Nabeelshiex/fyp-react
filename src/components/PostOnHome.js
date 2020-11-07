import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../actions';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import BidAlertDialog from './BidAlertDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        maxHeight: 'auto',
        maxWidth: '83vh',
        minWidth: '83vh',
        marginTop: '5%',
        marginBottom: '5%',
        padding: '2%',
        border: '1px solid black'
    },
    rootDiv: {
        maxHeight: '70%',
        maxWidth: '100%',
        minHeight: '70%',
        minWidth: '100%'
    },
    navLink: {
        color: '#f50057',
        textDecoration: 'none',
    },
    biddingSystemPaper: {
        margin: '1%'
    },
    postStatus: {
        float: 'right',
    },
    biddingDiv: {
        display: 'flex',
        flexDirection: 'column'
    },
    biddingContentDiv: {
        margin: '0 2%',
        marginBottom: '2%'
    },
    hideDisplayInputBid: {
        display: 'none'
    },
    displayInputBid: {
        maxWidth: '48%',
        margin: '0 1%'
    },
    bidSubmitButton: {
        margin: '1%'
    }
}));

const initialValues = {
    bidPrice: '',
    bidMessage: ''
}

function PostOnHome({ id, title, description, image, user_id, user, isActive, bids }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const bidAlertDialogBox = useSelector(state => state.postReducer.bidAlertDialogBox);
    const bidForAlertDialog = useSelector(state => state.postReducer.bidForAlertDialog);

    let highestBid = 0;

    const formik = useFormik({
        initialValues,
        onSubmit: values => {
            if (values.bidPrice > (highestBid + 99)) {
                dispatch(Actions.addBid({ postId: id, price: values.bidPrice, message: values.bidMessage }));
            }
            else {
                alert('Please enter a valid price');
            }
            formik.resetForm();
        },
        validationSchema: Yup.object({
            bidPrice: Yup.number().required('Field is required').min(0, 'Field must be greater than 0'),
            bidMessage: Yup.string().required('Field is required')
        })
    });

    function handleAcceptBidClicked(bid) {
        dispatch(Actions.toggleBidAlertDialog());
        dispatch(Actions.setBidForAlertDialog(bid));
    }
    return (
        <Paper className={classes.root}>
            <h3 className={classes.postStatus}>
                {isActive ? 'Active' : 'Sold'}
            </h3>
            <div className={classes.rootDiv}>
                <NavLink className={classes.navLink} to={`/profile/${user_id}`}>
                    <h3>{user.first_name + ' ' + user.last_name}</h3>
                </NavLink>
                <NavLink className={classes.navLink} to={`/post/${id}`}>
                    <h2>{title}</h2>
                </NavLink>
                <p>{description}</p>
                <CardMedia
                    component="img"
                    alt="No image"
                    height="100%"
                    image={`http://127.0.0.1:8000${image}`}
                    title="Contemplative Reptile"
                />
                <Paper className={classes.biddingSystemPaper}>
                    <p><b>Place your bid price here.</b></p>
                    <div className={classes.biddingDiv}>
                        {bids.map(bid =>
                            <div key={bid.id} className={classes.biddingContentDiv}>
                                <b>
                                    {bid.user.first_name + ' ' + bid.user.last_name + ' (Rs.' + bid.price + ') '}</b>{bid.message}
                                <Button
                                    className={!((user.remember_token === localStorage.getItem('token')) && isActive) ? classes.hideDisplayInputBid : ''}
                                    color="secondary"
                                    onClick={() => handleAcceptBidClicked(bid)}>
                                    Accept Bid
                                </Button>
                                <b>
                                    <div style={{ display: 'none' }}>
                                        {highestBid < bid.price ? highestBid = bid.price : ''}
                                    </div>
                                </b>
                            </div>
                        )}
                    </div>
                    <b>
                        {highestBid === 0 ? 'No bids' : !(isActive) ? '' : 'Current winning bid is ' + highestBid}
                    </b>
                    <form
                        onSubmit={formik.handleSubmit}
                        className={(user.remember_token === localStorage.getItem('token')) || !(isActive) ? classes.hideDisplayInputBid : ''}
                    >
                        <TextField
                            className={classes.displayInputBid}
                            type="number"
                            color="secondary"
                            label="Put Your Bid Price"
                            variant="filled"
                            name="bidPrice"
                            placeholder={`Bid must greater than ${highestBid + 99}`}
                            value={formik.values.bidPrice}
                            required={true}
                            fullWidth={true}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <TextField
                            className={classes.displayInputBid}
                            type="text"
                            color="secondary"
                            label="Conditional message"
                            variant="filled"
                            name="bidMessage"
                            placeholder="Type your condition"
                            value={formik.values.bidMessage}
                            required={true}
                            fullWidth={true}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <Button className={classes.bidSubmitButton} type="submit" variant="contained" color="secondary">
                            Place Bid
                        </Button>
                    </form>
                </Paper>
            </div>

            <BidAlertDialog
                open={bidAlertDialogBox}
                title="Are you sure you want to accept this bid?"
                bid={bidForAlertDialog}
            />
        </Paper>
    )
}

export default PostOnHome;