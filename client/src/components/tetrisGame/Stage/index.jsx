import React from 'react';

import Cell from '../Cell';

import { useStyles } from './styles.js';

export default function Stage({ stage }) {
    const classes = useStyles();

    const style = {
        gridTemplateRows: `repeat(${stage.length}, calc(25vw / ${stage[0].length}))`,
        gridTemplateColumns: `repeat(${stage[0].length}, 1fr)`
    };

    return (
        <div className={classes.container} style={style}>
            {stage.map(row => row.map((cell, i) => <Cell key={i} type={cell[0]}/>))}
        </div>
    );
};