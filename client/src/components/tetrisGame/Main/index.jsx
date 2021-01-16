import React, { useState } from 'react';

import Stage from '../Stage';
import Display from '../Display';

import { createStage, checkCollision } from '../gameHelpers';

import { useTetrisPlayer } from '../../../hooks/useTetrisPlayer';
import { useTetrisStage } from '../../../hooks/useTetrisStage';

import { useStyles } from './styles.js';

export default function Main() {
    const classes = useStyles();
    const [player, updatePlayerPos, resetPlayer, playerRotate] = useTetrisPlayer();
    const [stage, setStage] = useTetrisStage(player, resetPlayer);

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const movePlayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        };
    };

    const startGame = () => {
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
    };

    const drop = () => {
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            if (player.pos.y < 1) {
                console.log("GAME OVER!!!");
                setGameOver(true);
                setDropTime(null);
            };

            updatePlayerPos({ x: 0, y: 0, collided: true });
        };
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
            } else if (keyCode === 38) {
                playerRotate(stage, 1);
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