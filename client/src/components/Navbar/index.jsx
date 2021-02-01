import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../images/logo.png';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { useStyles } from './styles.js';

export default function Navbar() {
    const classes = useStyles();
    const location = useLocation();

    const userButtons = () => {
        return (
            <div className={classes.userButtons}>
                <Button color="inherit" className={classes.navButton}>Login</Button>
                <Button color="inherit" className={classes.navButton}>Sign Up</Button>
            </div>
        );
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
        </div>
    );
};