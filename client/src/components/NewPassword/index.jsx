import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './styles.js';

export default function NewPassword() {
    const classes = useStyles();
    const history = useHistory();
    const { token } = useParams();

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        password: '',
        passwordCheck: '',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const validatePassword = () => {
        const regex = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.{6,})");

        return regex.test(form.password);
    };

    const comparePasswords = () => {
        return form.password === form.passwordCheck;
    };

    const validateForm = () => {
        return validatePassword() && comparePasswords();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        const data = {
            password: form.password,
            token: token,
        };

        axios.post('/api/newPassword', data)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    text: res.data,
                });

                history.push('/');
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    text: err.response.data.errorMessage,
                })
                    .then(() => history.push('/'))
                    .catch(err => console.log(err));
            });
    };

    return (
        <div className={classes.container}>
            <div className={classes.headerContainer}>
                <h2>Reset your password</h2>
                <p>Please enter your new password in the fields below.</p>
            </div>
            <div className={classes.fieldsContainer}>
                <div className={classes.textDiv}>
                    <TextField
                        label="New password"
                        name='password'
                        type='Password'
                        value={form.password}
                        className={classes.textField}
                        onChange={handleChange}
                    />
                    {form.password.length > 0 && !validatePassword() &&
                        <span className={classes.error}>Min 6 characters (letters and numbers)</span>
                    }
                </div>
                <div className={classes.textDiv}>
                    <TextField
                        label="Confirm new password"
                        name='passwordCheck'
                        type='Password'
                        value={form.passwordCheck}
                        className={classes.textField}
                        onChange={handleChange}
                    />
                    {form.passwordCheck.length > 0 && !comparePasswords() &&
                        <span className={classes.error}>Passwords do not match</span>
                    }
                </div>
                {loading ?
                    <CircularProgress className={classes.loading} />
                    :
                    <Button
                        variant="contained"
                        disabled={!validateForm()}
                        className={classes.button}
                        onClick={handleSubmit}
                    >
                        Reset Password
                    </Button>
                }
            </div>
        </div>
    );
};