import React from 'react';

import { useStyles } from './styles.js';

export default function Display({ gameOver, text }) {
    const classes = useStyles(); 
    
    const style = {
        color: gameOver ? 'red' : '#31C70E',
    };

    return (
         <div className={classes.container} style={style}>
             <h1 className={classes.text}>{text}</h1>
         </div>
     );
};