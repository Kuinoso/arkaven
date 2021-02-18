import React from 'react';
import { getColors } from "../gameHelpers";
import { useStyles } from './styles.js';

export default function Block({ num }) {
    const classes = useStyles();

    return (
        <div
            className={classes.block}
            style={{
                background: getColors(num),
                color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
            }}
        >
            {num !== 0 ? num : ""}
        </div>
    );
};