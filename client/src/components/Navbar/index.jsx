import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.png';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { useStyles } from './styles.js';

export default function Navbar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                <Link to='/'><img src={logo} alt='Logo' className={classes.logo} /></Link>
                    <div className={classes.rigthNav}>
                        <div className={classes.gameButtons}>
                            <Link to='/tetrisGame'><Button color="inherit" className={classes.navButton}>Tetris</Button></Link>
                            <Link to='memoryGame'><Button color="inherit" className={classes.navButton}>Memory</Button></Link>
                            <Link to='/snakeGame'><Button color="inherit" className={classes.navButton}>Snake</Button></Link>
                            <Link to='/2048Game'><Button color="inherit" className={classes.navButton}>2048</Button></Link>
                        </div>
                        <div className={classes.userButtons}>
                            <Button color="inherit" className={classes.navButton}>Login</Button>
                            <Button color="inherit" className={classes.navButton}>Sign Up</Button>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};