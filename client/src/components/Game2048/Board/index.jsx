import React, { useState } from 'react';

import Block from '../Block';

import { useStyles } from './styles.js';

export default function Board() {
    const classes = useStyles();

    const [data, setData] = useState([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]);

    return (
        <div className={classes.wrapper}>
            {data.map((row, index) =>
                <div key={index} className={classes.container}>
                    {row.map((digit, i) => <Block num={digit} key={i} />)}
                </div>
            )}
        </div>
    );
};