import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles.js';

export default function UpdatePassword({ changeModal }) {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
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

    };

    const handleSubmit = (e) => {

    };

    const formButtons = () => {
        if (validated) {
            return (
                <Button
                    variant="contained"
                    disabled={!validateForm()}
                    className={classes.login}
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
                    className={classes.login}
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
                <p className={classes.subHeader}>
                    Update my info
                            <span className={classes.subLink} onClick={() => changeModal('password')}> Log In</span>
                </p>
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