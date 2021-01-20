import React from 'react';

import { useStyles } from './styles.js';

export default function Block({ num }) {
    const classes = useStyles();

    // const style = {
    //     backround: getColors(num),
    //     color: num === 2 || num === 4 
    // }

    return (
        <div className={classes.container}>{num}</div>
    );
};