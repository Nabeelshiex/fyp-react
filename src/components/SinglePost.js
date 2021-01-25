import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../actions";
import { Redirect } from "react-router-dom";
import { createMuiTheme, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import NavBar from "../components/NavBar";
import Avatar from "@material-ui/core/Avatar";
import { NavLink } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import PaymentModal from "../components/PaymentModal";
import Alert from "@material-ui/lab/Alert";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import BidAlertDialog from "./BidAlertDialog";
import Typography from "@material-ui/core/Typography";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  rootPaper: {
    minHeight: "100vh",
    overflowX: "hidden",
  },
  postPaper: {
    minHeight: "60vh",
    maxHeight: "60vh",
    margin: "1%",
    display: "flex",
  },
  postAvatar: {
    margin: "1%",
    minHeight: "55vh",
    minWidth: "55vh",
    marginLeft: "5%",
  },
  postDetailsSection: {
    margin: "1%",
    maxWidth: "50vh",
    minWidth: "50vh",
    overflowY: "scroll",
  },
  bidDetailsSection: {
    margin: "1%",
    maxWidth: "50vh",
    minWidth: "60vh",
    overflowY: "scroll",
  },
  userDiv: {
    margin: "1%",
  },
  hideDisplayInputBid: {
    display: "none",
  },
  winner: {
    color: "green",
  },
  hideRatingForm: {
    display: "",
  },
}));

const initialValues = {
  bidPrice: "",
  bidMessage: "",
};

function SinglePost(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.postReducer.singlePost);
  const token = useSelector((state) => state.userReducer.token);
  const viewMode = useSelector((state) => state.userReducer.viewMode);
  const bidAlertDialogBox = useSelector(
    (state) => state.postReducer.bidAlertDialogBox,
  );
  const bidForAlertDialog = useSelector(
    (state) => state.postReducer.bidForAlertDialog,
  );
  const loggedInUserId = useSelector(
    (state) => state.messageReducer.loggedInUserId,
  );
  const isReviewSubmitted = useSelector(
    (state) => state.postReducer.isReviewSubmitted,
  );

  let highestBid = 0;

  const theme = createMuiTheme({
    palette: {
      type: viewMode,
    },
  });

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (values.bidPrice > highestBid + 99) {
        dispatch(
          Actions.addBid({
            postId: post.id,
            price: values.bidPrice,
            message: values.bidMessage,
          }),
        );
        dispatch(Actions.getSinglePost(props.match.params.postId));
      } else {
        alert("Please enter a valid price");
      }
      formik.resetForm();
    },
    validationSchema: Yup.object({
      bidPrice: Yup.number()
        .required("Field is required")
        .min(0, "Field must be greater than 0"),
      bidMessage: Yup.string().required("Field is required"),
    }),
  });

  const ratingForm = useFormik({
    initialValues: {
      rating: null,
    },
    onSubmit: (values) => {
      dispatch(
        Actions.createReview({
          review: values.rating,
          postId: post.id,
          reviewTo: post.user.id,
        }),
      );
    },
    validationSchema: Yup.object({
      rating: Yup.number().required("Field is required"),
    }),
  });

  function handleAcceptBidClicked(bid) {
    dispatch(Actions.toggleBidAlertDialog());
    dispatch(Actions.setBidForAlertDialog(bid));
  }

  useEffect(() => {
    dispatch(Actions.getSinglePost(props.match.params.postId));
    dispatch(Actions.getLoggedInUserId());
    dispatch(Actions.checkReview(props.match.params.postId));
  }, [dispatch, props.match.params.postId]);

  if (!token) {
    return <Redirect to='/login' />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.rootPaper}>
        <NavBar />
        <div className={classes.userDiv}>
          <NavLink
            style={{ color: "#f50057", textDecoration: "none" }}
            to={`/profile/${post.user ? post.user.id : "0"}`}>
            <h1>
              {post.user
                ? post.user.first_name + " " + post.user.last_name
                : ""}
              (
              <Rating
                name='read-only'
                value={post.user ? post.user.rating : 0}
                readOnly
              />
              )
            </h1>
          </NavLink>
        </div>
        <Paper className={classes.postPaper}>
          <Avatar
            className={classes.postAvatar}
            variant='square'
            alt='No Image'
            src={`http://127.0.0.1:8000${post.image}`}
          />
          <div className={classes.postDetailsSection}>
            <h3 style={{ float: "right", marginRight: "2%" }}>
              {post.isActive ? "(Active)" : "(Sold)"}
            </h3>
            <h2 style={{ maxWidth: "70%" }}>{post.title}</h2>
            <p>{post.description}</p>
            <b>Category: {post.category}</b>
          </div>
          <div className={classes.bidDetailsSection}>
            <h1>Bids</h1>
            {post.bids_for_single_post ? (
              post.bids_for_single_post.map((bid) => (
                <Paper key={bid.id} className={classes.bidMapDiv}>
                  <div
                    className={
                      post.soldTo
                        ? post.soldTo === bid.user.id
                          ? classes.winner
                          : ""
                        : ""
                    }>
                    <h3 style={{ textAlign: "center" }}>
                      {bid.user.first_name + " " + bid.user.last_name}{" "}
                      {"Rs." + bid.price}
                    </h3>
                    <p>{bid.message}</p>
                  </div>
                  <div style={{ display: "none" }}>
                    {highestBid < bid.price ? (highestBid = bid.price) : ""}
                  </div>
                  <Button
                    className={
                      post.user
                        ? !(
                            post.user.remember_token ===
                              localStorage.getItem("token") && post.isActive
                          )
                          ? classes.hideDisplayInputBid
                          : ""
                        : ""
                    }
                    color='secondary'
                    onClick={() => handleAcceptBidClicked(bid)}>
                    Accept Bid
                  </Button>
                </Paper>
              ))
            ) : (
              <b>No Bids</b>
            )}
            <form
              autoComplete='off'
              onSubmit={formik.handleSubmit}
              className={
                post.user
                  ? post.user.remember_token ===
                      localStorage.getItem("token") || !post.isActive
                    ? classes.hideDisplayInputBid
                    : ""
                  : ""
              }>
              <TextField
                className={classes.displayInputBid}
                type='number'
                color='secondary'
                label='Put Your Bid Price'
                variant='filled'
                name='bidPrice'
                placeholder={`Bid must greater than ${highestBid + 99}`}
                value={formik.values.bidPrice}
                required={true}
                fullWidth={true}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextField
                className={classes.displayInputBid}
                type='text'
                color='secondary'
                label='Conditional message'
                variant='filled'
                name='bidMessage'
                placeholder='Type your condition'
                value={formik.values.bidMessage}
                required={true}
                fullWidth={true}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Button
                className={classes.bidSubmitButton}
                type='submit'
                variant='contained'
                color='secondary'>
                Place Bid
              </Button>
            </form>
          </div>
        </Paper>
        {/* {post.bids_for_single_post ?
                    !post.isActive && post.bids_for_single_post[0].user.remember_token === localStorage.getItem('token') && !post.isPaid
                        ? <PaymentModal postId={props.match.params.postId} />
                        : '' : ''} */}

        {post.bids_for_single_post ? (
          !post.isActive && !post.isPaid && post.soldTo === loggedInUserId ? (
            <PaymentModal postId={props.match.params.postId} />
          ) : (
            ""
          )
        ) : (
          ""
        )}

        <div style={{ justifyContent: "center", display: "flex" }}>
          {post.bids_for_single_post ? (
            !post.isActive && post.soldTo === loggedInUserId && post.isPaid ? (
              <div>
                <Alert variant='filled' severity='success'>
                  {"You Successfully Paid"}
                </Alert>
                {!isReviewSubmitted && (
                  <form
                    onSubmit={ratingForm.handleSubmit}
                    className={classes.hideRatingForm}>
                    <Typography component='legend'>Give your review</Typography>
                    <Rating
                      name='rating'
                      value={parseInt(ratingForm.values.rating, 10)}
                      onChange={ratingForm.handleChange}
                    />
                    <Button type='submit' variant='contained' color='secondary'>
                      Submit Review
                    </Button>
                  </form>
                )}
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {post.bids_for_single_post ? (
            !post.isActive &&
            post.user.remember_token === localStorage.getItem("token") &&
            post.isPaid ? (
              <Alert variant='filled' severity='success'>
                Successfully Received Payment
              </Alert>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {post.bids_for_single_post ? (
            !post.isActive &&
            post.user.remember_token === localStorage.getItem("token") &&
            !post.isPaid ? (
              <Alert variant='filled' severity='warning'>
                Waiting for Payment
              </Alert>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>

        <BidAlertDialog
          open={bidAlertDialogBox}
          title='Are you sure you want to accept this bid?'
          bid={bidForAlertDialog}
        />
      </Paper>
      <Footer />
    </ThemeProvider>
  );
}

export default SinglePost;
