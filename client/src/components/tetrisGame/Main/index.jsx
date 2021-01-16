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
    const [score, setScore, rows, setRows, level, setLevel] = useTetrisStatus(rowsCleared);

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const movePlayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        };
    };

    const startGame = () => {
        setStage(createStage());

        setDropTime(1000);

        resetPlayer();

        setGameOver(false);

        setScore(0);

        setRows(0);

        setLevel(0);
    };

    const drop = () => {
        if (rows > (level - 1) * 10) {
            setLevel(prev => prev + 1);

            setDropTime(1000 - (level * 70));
        };

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
                setDropTime(1000 - (level * 70));
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
            <div className={classes.container}>
                <Stage stage={stage} />
                <div className={classes.leftDiv}>
                    {gameOver ?
                        <Display gameOver={gameOver} text='Game Over' />
                        :
                        <div>
                            <Display text={`Score: ${score}`} />
                            <Display text={`Rows: ${rows}`} />
                            <Display text={`Level: ${level}`} />
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