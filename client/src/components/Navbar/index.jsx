import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

import SignUp from '../SignUp';
import Login from '../Login';

import logo from '../../images/logo.png';

import { logOut } from '../../redux/userReducer/actions';

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
            })
            .catch(err => console.log(err));
    };

    const userButtons = () => {
        if (loggedIn) {
            return (
                <div className={classes.userButtons}>
                    <Button
                        color="inherit"
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
                        color="inherit"
                        className={classes.navButton}
                        onClick={() => {
                            setModal('login');
                            handleOpen();
                        }}
                    >
                        Log In
                    </Button>
                    <Button
                        color="inherit"
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

    const gameButtons = () => {
        const params = ['tetrisGame', 'memoryGame', 'snakeGame', '2048Game'];

        for (let i = 0; i < params.length; i++) {
            if (location.pathname.includes(params[i])) {
                const filteredParams = params.filter(item => item !== params[i]);

                return (
                    <div className={classes.gameButtons}>
                        {filteredParams.map((item, i) =>
                            <Link to={item} key={i}>
                                <Button color="inherit" className={classes.navButton}>{item.split('G')[0]}</Button>
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
    };

    return (
        <div className={classes.root}>
            {console.log(loggedIn)}
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