import React, { useState } from 'react';

import Stage from '../Stage';
import Display from '../Display';

import { createStage } from '../gameHelpers';

import { useTetrisPlayer } from '../../../hooks/useTetrisPlayer';
import { useTetrisStage } from '../../../hooks/useTetrisStage';

import { useStyles } from './styles.js';

export default function Main() {
    const classes = useStyles();
    const [player, updatePlayerPos, resetPlayer] = useTetrisPlayer();
    const [stage, setStage] = useTetrisStage(player);

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const movePlayer = dir => {
        updatePlayerPos({ x: dir, y: 0 });
    };

    const startGame = () => {
        setStage(createStage());
        
        resetPlayer();
    };

    const drop = () => {
        updatePlayerPos({ x: 0, y: 1, collided: false });
    };

    const dropPlayer = () => {
        drop();
    };

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) {
                movePlayer(-1);
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) {
                dropPlayer();
            };
        };
    };

    return (
        <div className={classes.wrapper} role='button' tabIndex='0' onKeyDown={e => move(e)}>
            <div className={classes.container}>
                <Stage stage={stage} />
                <div className={classes.leftDiv}>
                    {gameOver ?
                        <Display gameOver={gameOver} text='Game Over' />
                        :
                        <div>
                            <Display text='Score' />
                            <Display text='Rows' />
                            <Display text='Level' />
                        </div>
                    }
                    <button className={classes.button} onClick={startGame}>
                        Start Game
                </button>
                </div>
            </div>
        </div>
    );
};