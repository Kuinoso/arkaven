import React, { useState } from 'react';

import Stage from '../Stage';
import Display from '../Display';

import { createStage, checkCollision } from '../gameHelpers';

import { useTetrisPlayer } from '../../../hooks/useTetrisPlayer';
import { useTetrisStage } from '../../../hooks/useTetrisStage';
import { useTetrisStatus } from '../../../hooks/useTetrisStatus';
import { useInterval } from '../../../hooks/useInterval';

import { useStyles } from './styles.js';

export default function Main() {
    const classes = useStyles();
    const [player, updatePlayerPos, resetPlayer, playerRotate] = useTetrisPlayer();
    const [stage, setStage, rowsCleared] = useTetrisStage(player, resetPlayer);
    const [score, setScore, rows, setRows, dropTime, setDropTime] = useTetrisStatus(rowsCleared);

    const [gameOver, setGameOver] = useState(false);
    const [started, setStarted] = useState(false);

    const movePlayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        };
    };

    const startGame = () => {
        setStarted(true);

        setStage(createStage());

        setDropTime(1000);

        resetPlayer();

        setGameOver(false);

        setScore(0);

        setRows(0);
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

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(1000 - (score / 4));
            };
        };
    };

    const dropPlayer = () => {
        setDropTime(null);

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

    useInterval(() => {
        drop();
    }, dropTime);

    return (
        <div
            className={classes.wrapper}
            role='button'
            tabIndex='0'
            onKeyDown={e => move(e)}
            onKeyUp={keyUp}
        >
            {started ?
                <div className={classes.container}>
                    <Stage stage={stage} />
                    <div className={classes.leftDiv}>
                        {gameOver ?
                            <div>
                                <Display gameOver={gameOver} text='Game Over' />
                                <button className={classes.button} onClick={startGame}>
                                    Play Again
                                </button>
                            </div>
                            :
                            <div>
                                <Display text={`Score: ${score}`} />
                                <Display text={`Rows: ${rows}`} />
                            </div>
                        }
                    </div>
                </div>
                :
                <div>
                    <h1>Tetris Game</h1>
                    <h3>The king of classic games! What are you waiting for?</h3>
                    <button className={classes.button} onClick={startGame}>
                        Start Game
                    </button>
                </div>
            }
        </div>
    );
};