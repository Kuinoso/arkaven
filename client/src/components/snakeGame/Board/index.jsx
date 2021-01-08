import React, { useState } from 'react';
import Snake from '../Snake';
import Food from '../Food';
import { useStyles } from './styles.js';

const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;

    return [x, y];
};

export default function Board() {
    const classes = useStyles();
    const [food, setFood] = useState(getRandomCoordinates());
    const [snakeDots, setSnakeDots] = useState([
        [0, 0],
        [2, 0]
    ]);

    return (
        <div className={classes.container}>
            <Snake snakeDots={snakeDots} />
            <Food dot={food} />
        </div>
    )
};