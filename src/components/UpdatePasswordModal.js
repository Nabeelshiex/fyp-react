import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../actions';
import { Paper } from '@material-ui/core';
import { useSnackbar } from 'notistack';

const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
}

const validationSchema = Yup.object({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string().required('New Password is required').min(8, 'Minimum length should be 8'),
    confirmNewPassword: Yup.string().when("newPassword", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
            [Yup.ref("newPassword")],
            "Both password fields need to be the same"
        )
    }).required('Field is required')
});

function UpdatePasswordModal() {
    const dispatch = useDispatch();
    const isUpdatePasswordModal = useSelector(state => state.userReducer.isUpdatePasswordModal);
    const open = isUpdatePasswordModal;
    const isPasswordUpdated = useSelector(state => state.userReducer.isPasswordUpdated);
    const { enqueueSnackbar } = useSnackbar();

    function handleClickOpen() {
        dispatch(Actions.toggleUpdatePasswordModal());
    };

    function handleClose() {
        dispatch(Actions.toggleUpdatePasswordModal());
    };

    const formik = useFormik({
        initialValues,
        onSubmit: values => {
            dispatch(Actions.updatePassword(values));
            formik.resetForm();
            handleClose();
        },
        validationSchema
    });

    if (isPasswordUpdated) {
        enqueueSnackbar('Password Updated', { variant: 'success' });
        dispatch(Actions.isPasswordUpdatedHideSnakeBar());
    }

    return (
        <Paper>
            <Button variant="outlined" onClick={handleClickOpen}>
                Change Password
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Change Your Password?</DialogTitle>
                <DialogContent>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <TextField
                                label="Old Password"
                                color="secondary"
                                fullWidth={true}
                                type="password"
                                name="oldPassword"
                                value={formik.values.oldPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.oldPassword && formik.touched.oldPassword}
                                helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                            />
                        </div>
                        <div>
                            <TextField
                                label="New Password"
                                fullWidth={true}
                                type="password"
                                name="newPassword"
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.newPassword && formik.touched.newPassword}
                                helperText={formik.touched.newPassword && formik.errors.newPassword}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Confirm New Password"
                                fullWidth={true}
                                type="password"
                                name="confirmNewPassword"
                                value={formik.values.confirmNewPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors.confirmNewPassword && formik.touched.confirmNewPassword}
                                helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
                            />
                        </div>
                        <DialogActions>
                            <Button type="submit" variant="outlined" autoFocus>
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </Paper>
    );
}

export default UpdatePasswordModal;