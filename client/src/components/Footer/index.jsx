import React from 'react';

import logo from '../../images/logo.png';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import GitHubIcon from '@material-ui/icons/GitHub';
import Tooltip from '@material-ui/core/Tooltip';

import { useStyles } from './styles.js';

export default function Footer() {
    const classes = useStyles();

    const goHome = () => {
        window.location.href = `/`;
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.footerDiv}>
                        <img src={logo} alt='Logo' className={classes.logo} onClick={goHome}/>
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