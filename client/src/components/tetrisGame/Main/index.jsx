import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createStage, checkCollision } from '../gameHelpers';
import { useTetrisPlayer } from '../../../hooks/useTetrisPlayer';
import { useTetrisStage } from '../../../hooks/useTetrisStage';
import { useTetrisStatus } from '../../../hooks/useTetrisStatus';
import { useInterval } from '../../../hooks/useInterval';
import { useStyles } from './styles.js';
import axios from 'axios';
import Swal from 'sweetalert2';
import overSound from '../../../sounds/over.mp3';
import rotateSound from '../../../sounds/rotate.mp3';
import collisionSound from '../../../sounds/collision.mp3';
import clearedSound from '../../../sounds/cleared.mp3';
import os from '../../../sounds/tetrisOs.mp3';
import tTetris from '../../../images/tetrisT.png';
import Stage from '../Stage';
import Display from '../../Display';
import Highscores from '../../Highscores';
import UserScores from '../../UserScores';

export default function Main() {
    const classes = useStyles();

    const ref1 = useRef();
    const ref2 = useRef();
    const ref3 = useRef();
    const ref4 = useRef();

    const loggedIn = useSelector(
        (store) => store.UserReducer.loggedIn
    );
    const game = useSelector(
        (store) => store.GameReducer.allGames.filter(item => item.name === 'tetris')[0]
    );
    if(loggedIn) {}
    const user = useSelector(
        (store) => store.UserReducer.loggedUser
    );
    const users = useSelector(
        (store) => store.UserReducer.allUsers
    );

    const [player, updatePlayerPos, resetPlayer, playerRotate] = useTetrisPlayer();
    const [stage, setStage, rowsCleared] = useTetrisStage(player, resetPlayer);
    const [score, setScore, rows, setRows, dropTime, setDropTime, ref5] = useTetrisStatus(rowsCleared);

    const [gameOver, setGameOver] = useState(false);
    const [started, setStarted] = useState(false);
    const [scores, setScores] = useState([]);
    const [userScores, setUserScores] = useState([]);

    window.addEventListener("keydown", function (e) {
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    const getScores = () => {
        axios.get(`/api/highscores/${game._id}`)
            .then(res => {
                const highscores = res.data;
                const list = []

                for (let i = 0; i < highscores.length; i++) {
                    const user = users.filter(user => user._id === highscores[i].user)[0];

                    list.push({
                        id: highscores[i].user,
                        score: highscores[i].score,
                        name: user.name,
                        img: user.img,
                    });
                };
                setScores(list);
            })
            .catch(err => console.log(err));
    };

    const getUserScores = () => {
        axios.get(`/api/userScores/${user}`)
            .then(res => {
                const userScores = res.data.filter(item => item.game === game._id);

                userScores.sort(function (a, b) {
                    const keyA = a.score;
                    const keyB = b.score;
                    // Compare the 2 dates
                    if (keyA < keyB) return 1;
                    if (keyA > keyB) return -1;
                    return 0;
                });

                const topUserScores = userScores.slice(0, 10);

                setUserScores(topUserScores);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getScores();
    }, []);

    useEffect(() => {
        if (user) {
            getUserScores();
        };
    }, [user]);

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

                if (loggedIn) {
                    const data = {
                        score: score,
                        user: user,
                        game: game._id,
                    };
                    axios.post('/api/newScore', data)
                        .then(() => {
                            getScores();
                            getUserScores();
                        })
                        .catch(err => console.log(err));
                };

                Swal.fire('Game Over')
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
            {scores && <Highscores scores={scores} />}
            <div className={classes.container}>
                <Stage stage={stage} />
                <div className={classes.leftDiv}>
                    <div className={classes.infoDiv}>
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
            <UserScores scores={userScores} loggedIn={loggedIn} />
        </div>
    );
};