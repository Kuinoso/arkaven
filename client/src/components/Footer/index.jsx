import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.png';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import GitHubIcon from '@material-ui/icons/GitHub';
import Tooltip from '@material-ui/core/Tooltip';

import { useStyles } from './styles.js';

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.footerDiv}>
                        <Link to='/'><img src={logo} alt='Logo' className={classes.logo} /></Link>
                        <p className={classes.text}>was developed by Leonardo Kuinoso Cifuentes</p>
                    </div>
                    <div className={classes.footerDiv}>
                        <Tooltip title='Github Repository'>
                            <a
                                href='https://github.com/Kuinoso/arkaven'
                                target='blank'
                                className={classes.gitLogo}
                            >
                                <GitHubIcon title='Github Repository' />
                            </a>
                        </Tooltip>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};