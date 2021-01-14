import React from 'react';
import { useStyles } from './styles.js';

export default function StartButton({ callback }) {
    const classes = useStyles();

    return (
        <button className={classes.container} onClick={callback}>
            Start Game
        </button>
    );
};