import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../actions';
import Payment from '../components/Payment';

const useStyles = makeStyles((theme) => ({
    rootDiv: {
        display: 'flex',
        justifyContent: 'center'
    }
}));

function PaymentModal(postId) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isPaymentMethodModal = useSelector(state => state.braintreeReducer.isPaymentMethodModal);

    function handleOpen() {
        dispatch(Actions.togglePaymentMethodModal());
    }

    function handleClose() {
        dispatch(Actions.togglePaymentMethodModal());
    }

    return (
        <div className={classes.rootDiv}>
            <Button variant="outlined" color="primary" onClick={handleOpen}>
                Proceed to Payment
            </Button>
            <Dialog
                open={isPaymentMethodModal}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Please Fill the payment form</DialogTitle>
                <DialogContent>
                    <Payment {...postId} />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default PaymentModal;