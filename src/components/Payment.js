import React, { useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../actions';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    rootDiv: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
}));

function Payment(postId) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const clientToken = useSelector(state => state.braintreeReducer.brainTreeClientToken);
    const instance = useSelector(state => state.braintreeReducer.instance);

    useEffect(() => dispatch(Actions.getBrainTreeClientToken())
        , [dispatch]);

    async function buy() {
        const { nonce } = await instance.requestPaymentMethod();
        dispatch(Actions.brainTreeCheckout({ nonce, ...postId }));
    }

    if (!clientToken) {
        return (
            <div className={classes.rootDiv}>
                <h1>Loading...</h1>
            </div>
        );
    } else {
        return (
            <div className={classes.rootDiv}>
                <DropIn
                    options={{ authorization: clientToken }}
                    onInstance={(instance) => (dispatch(Actions.setBrainTreeInstance(instance)))}
                />
                <Button variant="outlined" onClick={buy}>Buy</Button>
            </div>
        );
    }
}

export default Payment;