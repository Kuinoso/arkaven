import React from 'react';
import { TETROMINOS } from '../tetrominos';
import { useStyles } from './styles.js';

export default function Cell({ type }) {
    const classes = useStyles();

    const style = {
        background: `rgba(${TETROMINOS[type].color}, 0.8)`,
        border: type === 0 ? 0 : `4px solid rgba(${TETROMINOS[type].color}, 1)`,
        borderBottomColor: `rgba(${TETROMINOS[type].color}, 0.1)`,
        borderLeftColor: `rgba(${TETROMINOS[type].color}, 0.3)`,
    };

    return (
        <div className={classes.container} type={type} style={style}>
        </div>
    )
};