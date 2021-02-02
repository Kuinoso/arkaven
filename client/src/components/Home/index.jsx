import React from 'react';
import { Link } from 'react-router-dom';

import pTetris from '../../images/tetrisP.png';
import pSnake from '../../images/snakeP.png';
import pMemory from '../../images/memoryP.png';
import p2048 from '../../images/2048P.png';

import { useStyles } from './styles.js';

export default function Home() {
    const classes = useStyles();

    const buttonData = [
        {
            link: '/tetrisGame',
            image: pTetris,
        },
        {
            link: '/2048Game',
            image: p2048,
        },
        {
            link: '/memoryGame',
            image: pMemory,
        },
        {
            link: '/snakeGame',
            image: pSnake,
        },
    ];

    return (
        <div>
            <div className={classes.textWrapper}>
                <h1 className={classes.title}>play classic games</h1>
                <br></br>
                <h1 className={classes.title}>compare with your friends</h1>
                <br></br>
                <h1 className={classes.title}>rule the arcade</h1>
            </div>
            <div className={classes.container}>
                {buttonData.map((item, i) =>
                    <Link key={i} to={item.link}>
                        <img src={item.image} alt={item.link.split('/')[1]} className={classes.image} />
                    </Link>
                )}
            </div>
        </div>
    );
};