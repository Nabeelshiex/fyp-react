import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import * as Actions from '../actions';

function BidAlertDialog({ open, title, bid }) {
    const dispatch = useDispatch();

    const handleAgree = () => {
        dispatch(Actions.bidAccepted(bid.id));
        dispatch(Actions.toggleBidAlertDialog());
        dispatch(Actions.getSinglePost(bid.postId));
    };

    const handleClose = () => {
        dispatch(Actions.toggleBidAlertDialog());
    };

    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {bid.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>
                        Disagree
                    </Button>
                    <Button color="secondary" autoFocus onClick={handleAgree}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default BidAlertDialog;