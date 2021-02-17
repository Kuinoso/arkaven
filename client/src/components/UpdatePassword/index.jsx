import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles.js';

export default function UpdatePassword({ id, changeModal, openModal, closeModal }) {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [token, setToken] = useState(null);
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        check: '',
    });

    const handleChange = (e) => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value,
        });
    };

    const validateCurrentPassword = () => {
        return passwords.current.length > 0;
    };

    const validatePassword = () => {
        const regex = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.{6,})");

        return regex.test(passwords.new);
    };

    const comparePasswords = () => {
        return passwords.check === passwords.new;
    };

    const validateForm = () => {
        return validatePassword() && comparePasswords();
    };

    const handleValidation = (e) => {
        setLoading(true);

        const data = {
            password: passwords.current,
        };

        axios.post(`/api/updatePassword/${id}`, data)
            .then(res => {
                setLoading(false);
                setValidated(true);
                setToken(res.data.token);
            })
            .catch(err => {
                setLoading(false);
                closeModal();

                Swal.fire(err.response.data.errorMessage)
                    .then(() => openModal())
                    .catch(err => console.log(err));
            });
    };

    const handleSubmit = (e) => {
        setLoading(true);

        const data = {
            password: passwords.new,
            token: token,
        };

        axios.post('/api/newPassword', data)
            .then(res => {
                closeModal();

                Swal.fire(res.data);
            })
            .catch(err => {
                closeModal();

                Swal.fire(err.response.data.errorMessage);
            });
    };

    const formButtons = () => {
        if (validated) {
            return (
                <Button
                    variant="contained"
                    disabled={!validateForm()}
                    className={classes.submit}
                    onClick={handleSubmit}
                >
                    Change Password
                </Button>
            );
        } else {
            return (
                <Button
                    variant="contained"
                    disabled={!validateCurrentPassword()}
                    className={classes.submit}
                    onClick={handleValidation}
                >
                    Continue
                </Button>
            );
        };
    };

    return (
        <div className={classes.container}>
            <div className={classes.headerContainer}>
                <h2 className={classes.header}>Reset password</h2>
                <p className={classes.subLink} onClick={() => changeModal('info')}>Update my info</p>
            </div>
            <div className={classes.fieldsContainer}>
                {validated ?
                    <div>
                        <div className={classes.textDiv}>
                            <TextField
                                label="Enter your new password"
                                name='new'
                                value={passwords.new}
                                type='Password'
                                className={classes.textField}
                                onChange={handleChange}
                            />
                            {!validatePassword() && passwords.new.length > 0 &&
                                <span className={classes.error}>Min 6 characters (letters and numbers)</span>
                            }
                        </div>
                        <div className={classes.textDiv}>
                            <TextField
                                label="Confirm new password"
                                name='check'
                                value={passwords.check}
                                type='Password'
                                className={classes.textField}
                                onChange={handleChange}
                            />
                            {!comparePasswords() && passwords.check.length > 0 &&
                                <span className={classes.error}>Passwords do not match</span>
                            }
                        </div>
                    </div>
                    :
                    <div className={classes.textDiv}>
                        <TextField
                            label="Enter your current password"
                            name='current'
                            value={passwords.current}
                            type='Password'
                            className={classes.textField}
                            onChange={handleChange}
                        />
                    </div>
                }
                {loading ?
                    <CircularProgress className={classes.loading} />
                    :
                    formButtons()
                }
            </div>
        </div>
    );
};