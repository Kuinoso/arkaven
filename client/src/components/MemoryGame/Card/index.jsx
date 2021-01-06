import React from 'react';
import { useStyles } from './styles.js';

export default function Card({ handleClick, id, flipped, back, front, height, width }) {
    const classes = useStyles();
    console.log(front, back);

    return (
        <div
            className={flipped ? classes.flipContainerFlipped : classes.flipContainer}
            style={{ width, height }}
            onClick={() => handleClick(id)}
        >
            <div className={classes.flipper}>
                <img
                    style={{ height, width }}
                    className={flipped ? classes.front : classes.back}
                    src={flipped ? front : back}
                    alt='card'
                />
            </div>
        </div>
    )
};