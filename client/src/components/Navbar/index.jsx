import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

import SignUp from '../SignUp';
import Login from '../Login';
import ResetPassword from '../ResetPassword';

import logo from '../../images/logo.png';

import { logOut, getLoggedUser } from '../../redux/userReducer/actions';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import { useStyles } from './styles.js';

export default function Navbar() {
    const classes = useStyles();
    const location = useLocation();
    const dispatch = useDispatch();

    const loggedIn = useSelector(
        (store) => store.UserReducer.loggedIn
    );

    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const logout = (e) => {
        e.preventDefault();

        axios.get('/api/logout')
            .then(() => {
                dispatch(logOut());
                dispatch(getLoggedUser(null));
            })
            .catch(err => console.log(err));
    };

    const userButtons = () => {
        if (!location.pathname.includes('reset')) {
            if (loggedIn) {
                return (
                    <div className={classes.userButtons}>
                        <Button
                            className={classes.navButton}
                            onClick={logout}
                        >
                            Log Out
                    </Button>
                    </div>
                );
            } else {
                return (
                    <div className={classes.userButtons}>
                        <Button
                            className={classes.navButton}
                            onClick={() => {
                                setModal('login');
                                handleOpen();
                            }}
                        >
                            Log In
                    </Button>
                        <Button
                            className={classes.navButton}
                            onClick={() => {
                                setModal('join');
                                handleOpen();
                            }}
                        >
                            Join
                    </Button>
                    </div>
                );
            };
        };
    };

    const gameButtons = () => {
        const params = ['tetrisGame', 'memoryGame', 'snakeGame', '2048Game'];

        for (let i = 0; i < params.length; i++) {
            if (location.pathname.includes(params[i])) {
                const filteredParams = params.filter(item => item !== params[i]);

                return (
                    <div className={classes.gameButtons}>
                        {filteredParams.map((item, i) =>
                            <Link to={item} key={i}>
                                <Button className={classes.navButton}>{item.split('G')[0]}</Button>
                            </Link>
                        )}
                    </div>
                );
            };
        };
    };

    const innerModal = (type) => {
        if (type === 'login') {
            return <Login
                changeModal={setModal}
                openModal={handleOpen}
                closeModal={handleClose}
            />
        };

        if (type === 'join') {
            return <SignUp
                changeModal={setModal}
                openModal={handleOpen}
                closeModal={handleClose}
            />
        };
        if (type === 'reset') {
            return <ResetPassword
                changeModal={setModal}
                openModal={handleOpen}
                closeModal={handleClose}
            />
        };
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Link to='/'><img src={logo} alt='Logo' className={classes.logo} /></Link>
                    {location.pathname === '/' ?
                        userButtons()
                        :
                        <div className={classes.rigthNav}>
                            {gameButtons()}
                            {userButtons()}
                        </div>
                    }
                </Toolbar>
            </AppBar>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {innerModal(modal)}
            </Modal>
        </div>
    );
};