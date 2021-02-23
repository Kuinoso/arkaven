import React from 'react';
import { useStyles } from './styles.js';

export default function MobileGames() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <h3>Welcome</h3>
            <p>We are currently working on the mobile version of the games, please enter from a computer to play.</p>
        </div>
    );
};