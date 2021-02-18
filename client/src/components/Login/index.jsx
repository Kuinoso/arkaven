import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn, getLoggedUser, getUserData } from '../../redux/userReducer/actions';
import axios from 'axios';
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './styles.js';
import back from '../../videos/back.mp4';

export default function Login({ changeModal, openModal, closeModal }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        setError(false);
    };

    const validateForm = () => {

        return form.email.length > 0 && form.password.length > 0;
    };

    const getData = (user) => {
        axios.get(`/api/user/${user}`)
            .then(res => {
                dispatch(getUserData(res.data));
            })
            .catch(err => console.log(err));
    };

    const handleClick = (e) => {
        e.preventDefault();

        setLoading(true);

        const data = {
            email: form.email,
            password: form.password,
        };

        axios.post('/api/login', data)
            .then((res) => {
                setLoading(false);

                closeModal();

                getData(res.data);

                dispatch(logIn());

                dispatch(getLoggedUser(res.data));
            })
            .catch(err => {
                setLoading(false);

                closeModal();

                Swal.fire({
                    icon: 'error',
                    text: err.response.data.errorMessage,
                })
                    .then(() => openModal())
                    .catch(err => console.log(err));
            });
    };

    return (
        <div className={classes.container}>
            <div className={classes.rightDiv}>
                <video className={classes.background} autoPlay loop muted>
                    <source src={back} type="video/mp4" />
                </video>
                <div className={classes.textWrapper}>
                    <h1 className={classes.title}>PLAY THE CLASSICS</h1>
                </div>
                <div className={classes.textWrapper}>
                    <h1 className={classes.title}>RULE THE ARCADE</h1>
                </div>
            </div>
            <div>
                <div className={classes.headerContainer}>
                    <h2 className={classes.header}>Log In to Arkaven</h2>
                    <p className={classes.subHeader}>
                        New to Arkaven?
                            <span className={classes.subLink} onClick={() => changeModal('join')}> Join</span>
                    </p>
                </div>
                <div className={classes.fieldsContainer}>
                    <TextField
                        label="Email"
                        name='email'
                        value={form.email}
                        className={classes.textField}
                        onChange={handleChange}
                    />
                    <div className={classes.textDiv}>
                        <TextField
                            label="Password"
                            name='password'
                            type='Password'
                            value={form.password}
                            className={classes.textField}
                            onChange={handleChange}
                        />
                        {error &&
                            <span className={classes.error}>Please complete all fields</span>
                        }
                    </div>
                    <span
                        className={classes.subLink}
                        onClick={() => changeModal('reset')}
                        style={{ fontSize: '0.75rem' }}
                    >
                        Forgot your password?
                    </span>
                    {loading ?
                        <CircularProgress className={classes.loading} />
                        :
                        <Button
                            variant="contained"
                            disabled={!validateForm()}
                            className={classes.login}
                            onClick={handleClick}
                        >
                            Log In
                    </Button>
                    }
                </div>
            </div>
        </div>
    );
};