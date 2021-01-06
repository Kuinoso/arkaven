import React from 'react';
import { useStyles } from './styles.js';

export default function Card({ handleClick, id, type, flipped, height, width }) {
    const classes = useStyles();

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
                    src={flipped ? require(`../../../images/${type}.png`).default : require('../../../images/got.png').default}
                    alt='card'
                />
            </div>
        </div>
    )
};