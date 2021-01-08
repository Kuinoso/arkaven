import React from 'react';
import { useStyles } from './styles.js';

export default function Card({ handleClick, id, type, flipped, height, width, disabled, solved }) {
    const classes = useStyles();

    return (
        <div
            className={classes.card}
            style={{ width, height }}
            onClick={() => disabled ? null : handleClick(id)}
        >
            <div className={classes.flipper}>
                <img
                    style={{ height, width }}
                    className={flipped ? classes.front : classes.back}
                    src={flipped || solved ? require(`../../../images/${type}.png`).default : require('../../../images/got.png').default}
                    alt='card'
                />
            </div>
        </div>
    )
};