import React from 'react';
import { useStyles } from './styles.js';

export default function Food({ dot }) {
    const classes = useStyles();
    const style = {
        left: `${dot[0]}%`,
        top: `${dot[1]}%`,
    };

    return (
        <div className={classes.snakeFood} style={style}>

        </div>
    )
};