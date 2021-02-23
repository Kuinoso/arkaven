import React from 'react';
import { Link, HashRouter } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import pTetris from '../../images/tetrisT.png';
import pSnake from '../../images/snakeT.png';
import pMemory from '../../images/memoryT.png';
import p2048 from '../../images/2048T.png';

import { useStyles } from './styles.js';
import MobileGames from '../MobileGames';

export default function Home() {
    const classes = useStyles();
    const theme = useTheme();
    const small = useMediaQuery(theme.breakpoints.down('md'));

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
            {small ?
                <MobileGames />
                :
                <div className={classes.container}>
                    {buttonData.map((item, i) =>
                        <Link key={i} to={item.link}>
                            <img src={item.image} alt={item.link.split('/')[1]} className={classes.image} />
                        </Link>
                    )}
                </div>
            }
        </div>
    );
};