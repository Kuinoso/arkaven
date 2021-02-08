import React from 'react';
import { Link } from 'react-router-dom';

import pTetris from '../../images/tetrisT.png';
import pSnake from '../../images/snakeT.png';
import pMemory from '../../images/memoryT.png';
import p2048 from '../../images/2048T.png';

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
            <div className={classes.container}>
                {buttonData.map((item, i) =>
                    <Link key={i} to={item.link}>
\                            <img src={item.image} alt={item.link.split('/')[1]} className={classes.image} />
\                    </Link>
                )}
            </div>
        </div>
    );
};