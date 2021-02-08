import React, { useState, useRef } from 'react';

import Stage from '../Stage';
import Display from '../../Display';

import { createStage, checkCollision } from '../gameHelpers';

import { useTetrisPlayer } from '../../../hooks/useTetrisPlayer';
import { useTetrisStage } from '../../../hooks/useTetrisStage';
import { useTetrisStatus } from '../../../hooks/useTetrisStatus';
import { useInterval } from '../../../hooks/useInterval';

import overSound from '../../../sounds/over.mp3';
import rotateSound from '../../../sounds/rotate.mp3';
import collisionSound from '../../../sounds/collision.mp3';
import clearedSound from '../../../sounds/cleared.mp3';
import os from '../../../sounds/tetrisOs.mp3';

import tTetris from '../../../images/tetrisT.png';

import { useStyles } from './styles.js';

export default function Main() {
    const classes = useStyles();

    const ref1 = useRef();
    const ref2 = useRef();
    const ref3 = useRef();
    const ref4 = useRef();

    const [player, updatePlayerPos, resetPlayer, playerRotate] = useTetrisPlayer();
    const [stage, setStage, rowsCleared] = useTetrisStage(player, resetPlayer);
    const [score, setScore, rows, setRows, dropTime, setDropTime, ref5] = useTetrisStatus(rowsCleared);

    const [gameOver, setGameOver] = useState(false);
    const [started, setStarted] = useState(false);

    window.addEventListener("keydown", function (e) {
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    const movePlayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        };
    };

    const startGame = () => {
        ref2.current.volume = 0.05;
        ref2.current.play();

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
                ref2.current.currentTime = 0;
                ref2.current.pause();

                ref1.current.volume = 0.3;
                ref1.current.play();

                setGameOver(true);

                setDropTime(null);
            };

            ref4.current.volume = 0.3;
            ref4.current.play();

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
                ref3.current.volume = 0.3;
                ref3.current.currentTime = 0;
                ref3.current.play();

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
                    <div>
                        <img src={tTetris} alt='tetris' className={classes.title} />
                        <h3 className={classes.text}>
                            Make full horizontal lines with the different
                            tetrominos that fall into the game area.
                            Full lines will then disappear and provide points.
                            Use the left and right arrow keys to move the tetromino, use the
                            down arrow key for the tetrimino to fall faster and the up arrow key to rotate the tetromino.
                        </h3>
                    </div>
                    <div>
                        <Display text={`Score: ${score}`} />
                        <Display text={`Rows: ${rows}`} />
                    </div>
                    {gameOver &&
                        <div>
                            <Display gameOver={gameOver} text='Game Over' />
                        </div>
                    }
                    <button className={classes.button} onClick={startGame}>
                        {gameOver ? 'Play Again' : started ? 'Start Again' : 'Start Game'}
                    </button>
                </div>
            </div>
            <audio
                ref={ref1}
                src={overSound}
                loop={false}
            />
            <audio
                ref={ref2}
                src={os}
                loop={true}
            />
            <audio
                ref={ref3}
                src={rotateSound}
                loop={false}
            />
            <audio
                ref={ref4}
                src={collisionSound}
                loop={false}
            />
            <audio
                ref={ref5}
                src={clearedSound}
                loop={false}
            />
        </div>
    );
};