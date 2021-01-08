import React from 'react';
import { useStyles } from './styles.js';

export default function Snake({ snakeDots }) {
    const classes = useStyles();

    return (
        <div>
            {snakeDots.map((dot, i) => {
                const style = {
                    left: `${dot[0]}%`,
                    top: `${dot[1]}%`,
                };
                return <div className={classes.snakeDot} key={i} style={style}></div>
            })}
        </div>
    )
};