import React from 'react';
import { useStyles } from './styles.js';

export default function Snake({ snakeDots , color}) {
    const classes = useStyles();

    return (
        <div>
            {snakeDots.map((dot, i) => {
                const style = {
                    left: `${dot[0]}%`,
                    top: `${dot[1]}%`,
                    backgroundColor: color,
                };
                return <div className={classes.snakeDot} key={i} style={style}></div>
            })}
        </div>
    )
};