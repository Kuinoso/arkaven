import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import cloneDeep from "lodash.clonedeep";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useEvent } from "../gameHelpers";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useStyles } from './styles.js';
import t2048 from '../../../images/2048T.png';
import gO from '../../../images/go.png';
import Block from '../Block';
import Display from '../../Display';
import Highscores from '../../Highscores';
import UserScores from '../../UserScores';
import MobileGames from '../../MobileGames';

export default function Main() {
    const classes = useStyles();
    const theme = useTheme();
    const small = useMediaQuery(theme.breakpoints.down('md'));

    const loggedIn = useSelector(
        (store) => store.UserReducer.loggedIn
    );
    const game = useSelector(
        (store) => store.GameReducer.allGames.filter(item => item.name === '2048')[0]
    );
    const user = useSelector(
        (store) => store.UserReducer.loggedUser
    );
    const users = useSelector(
        (store) => store.UserReducer.allUsers
    );

    const UP_ARROW = 38;
    const DOWN_ARROW = 40;
    const LEFT_ARROW = 37;
    const RIGHT_ARROW = 39;

    const [data, setData] = useState([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
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
                    const usr = users.filter(us => us._id === highscores[i].user)[0];
                    if (usr && highscores[i]) {
                        list.push({
                            id: highscores[i].user,
                            score: highscores[i].score,
                            name: usr.name,
                            img: usr.img,
                        });
                    };
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

    const initialize = () => {
        let newGrid = cloneDeep(data);

        addNumber(newGrid);

        addNumber(newGrid);

        setData(newGrid);
    };

    const addNumber = (newGrid) => {
        let added = false;
        let gridFull = false;
        let attempts = 0;

        while (!added) {
            if (gridFull) {
                break;
            };

            let rand1 = Math.floor(Math.random() * 4);
            let rand2 = Math.floor(Math.random() * 4);

            attempts++;

            if (newGrid[rand1][rand2] === 0) {
                newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
                added = true;
            };

            if (attempts > 50) {
                gridFull = true;
                let gameOverr = checkIfGameOver();

                if (gameOverr) {
                    alert("game over");
                };
            };
        };
    };

    const swipeLeft = (dummy) => {
        let oldGrid = data;
        let newArray = cloneDeep(data);

        for (let i = 0; i < 4; i++) {
            let b = newArray[i];
            let slow = 0;
            let fast = 1;

            while (slow < 4) {
                if (fast === 4) {
                    fast = slow + 1;

                    slow++;

                    continue;
                };

                if (b[slow] === 0 && b[fast] === 0) {
                    fast++;
                } else if (b[slow] === 0 && b[fast] !== 0) {
                    b[slow] = b[fast];
                    b[fast] = 0;

                    fast++;
                } else if (b[slow] !== 0 && b[fast] === 0) {
                    fast++;
                } else if (b[slow] !== 0 && b[fast] !== 0) {
                    if (b[slow] === b[fast]) {
                        b[slow] = b[slow] + b[fast];
                        b[fast] = 0;
                        fast = slow + 1;

                        slow++;
                    } else {
                        slow++;
                        fast = slow + 1;
                    };
                };
            };
        };

        if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
            addNumber(newArray);
        };

        if (dummy) {
            return newArray;
        } else {
            setData(newArray);
        };
    };

    const swipeRight = (dummy) => {
        let oldData = data;
        let newArray = cloneDeep(data);

        for (let i = 3; i >= 0; i--) {
            let b = newArray[i];
            let slow = b.length - 1;
            let fast = slow - 1;

            while (slow > 0) {
                if (fast === -1) {
                    fast = slow - 1;

                    slow--;

                    continue;
                };

                if (b[slow] === 0 && b[fast] === 0) {
                    fast--;
                } else if (b[slow] === 0 && b[fast] !== 0) {
                    b[slow] = b[fast];
                    b[fast] = 0;

                    fast--;
                } else if (b[slow] !== 0 && b[fast] === 0) {
                    fast--;
                } else if (b[slow] !== 0 && b[fast] !== 0) {
                    if (b[slow] === b[fast]) {
                        b[slow] = b[slow] + b[fast];
                        b[fast] = 0;
                        fast = slow - 1;

                        slow--;
                    } else {
                        slow--;

                        fast = slow - 1;
                    };
                };
            };
        };

        if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
            addNumber(newArray);
        };

        if (dummy) {
            return newArray;
        } else {
            setData(newArray);
        };
    };

    const swipeDown = (dummy) => {
        let b = cloneDeep(data);
        let oldData = JSON.parse(JSON.stringify(data));

        for (let i = 3; i >= 0; i--) {
            let slow = b.length - 1;
            let fast = slow - 1;

            while (slow > 0) {
                if (fast === -1) {
                    fast = slow - 1;

                    slow--;

                    continue;
                };

                if (b[slow][i] === 0 && b[fast][i] === 0) {
                    fast--;
                } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
                    b[slow][i] = b[fast][i];
                    b[fast][i] = 0;

                    fast--;
                } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
                    fast--;
                } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
                    if (b[slow][i] === b[fast][i]) {
                        b[slow][i] = b[slow][i] + b[fast][i];
                        b[fast][i] = 0;
                        fast = slow - 1;

                        slow--;
                    } else {
                        slow--;

                        fast = slow - 1;
                    };
                };
            };
        };

        if (JSON.stringify(b) !== JSON.stringify(oldData)) {
            addNumber(b);
        };

        if (dummy) {
            return b;
        } else {
            setData(b);
        };
    };

    const swipeUp = (dummy) => {
        let b = cloneDeep(data);
        let oldData = JSON.parse(JSON.stringify(data));

        for (let i = 0; i < 4; i++) {
            let slow = 0;
            let fast = 1;

            while (slow < 4) {
                if (fast === 4) {
                    fast = slow + 1;

                    slow++;

                    continue;
                };

                if (b[slow][i] === 0 && b[fast][i] === 0) {
                    fast++;
                } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
                    b[slow][i] = b[fast][i];
                    b[fast][i] = 0;

                    fast++;
                } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
                    fast++;
                } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
                    if (b[slow][i] === b[fast][i]) {
                        b[slow][i] = b[slow][i] + b[fast][i];
                        b[fast][i] = 0;
                        fast = slow + 1;

                        slow++;
                    } else {
                        slow++;

                        fast = slow + 1;
                    };
                };
            };
        };

        if (JSON.stringify(oldData) !== JSON.stringify(b)) {
            addNumber(b);
        };

        if (dummy) {
            return b;
        } else {
            setData(b);
        };
    };

    const checkIfGameOver = () => {
        let checker = swipeLeft(true);

        if (JSON.stringify(data) !== JSON.stringify(checker)) {
            return false;
        };

        let checker2 = swipeDown(true);

        if (JSON.stringify(data) !== JSON.stringify(checker2)) {
            return false;
        };

        let checker3 = swipeRight(true);

        if (JSON.stringify(data) !== JSON.stringify(checker3)) {
            return false;
        };

        let checker4 = swipeUp(true);

        if (JSON.stringify(data) !== JSON.stringify(checker4)) {
            return false;
        };

        return true;
    };

    const resetGame = () => {
        setGameOver(false);

        const emptyGrid = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ];

        addNumber(emptyGrid);

        addNumber(emptyGrid);

        setData(emptyGrid);

        setScore(0);
    };

    const handleKeyDown = (event) => {
        if (gameOver) {
            return;
        };
        switch (event.keyCode) {
            case UP_ARROW:
                swipeUp();
                break;
            case DOWN_ARROW:
                swipeDown();
                break;
            case LEFT_ARROW:
                swipeLeft();
                break;
            case RIGHT_ARROW:
                swipeRight();
                break;
            default:
                break;
        };

        let gameOverr = checkIfGameOver();

        if (gameOverr) {
            Swal.fire({
                text: `Your score was ${score}!`,
                imageUrl: gO,
                imageWidth: 400,
                imageAlt: 'GameOver',
            });

            setGameOver(true);

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
        };
    };

    useEffect(() => {
        initialize();
    }, []);

    useEffect(() => {
        getScores();

        if (user) {
            getUserScores();
        };
    }, [user]);

    useEvent("keydown", handleKeyDown);

    return (
        <div>
            {small ?
                <MobileGames />
                :
                <div className={classes.wrapper}>
                    {scores && <Highscores scores={scores} />}
                    <div className={classes.container}>
                        <div className={classes.board}>
                            {data.map((row, oneIndex) => {
                                return (
                                    <div style={{ display: "flex" }} key={oneIndex}>
                                        {row.map((digit, index) => {
                                            if (digit > score) {
                                                setScore(digit);
                                            };

                                            return <Block num={digit} key={index} />
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                        <div className={classes.leftDiv}>
                            <div className={classes.infoDiv}>
                                <img src={t2048} alt='2048' className={classes.title} />
                                <h3 className={classes.text}>
                                    Use your arrow keys to move the tiles.
                                    Tiles with the same number merge into one when they touch.
                                    Add them up to reach 2048!
                    </h3>
                            </div>
                            <Display text={`Score: ${score}`} />
                            {gameOver &&
                                <div>
                                    <Display gameOver={gameOver} text='Game Over' />
                                </div>
                            }
                            <button className={classes.button} onClick={resetGame}>
                                {gameOver ? 'Play Again' : 'Start Again'}
                            </button>
                        </div>
                    </div>
                    <UserScores scores={userScores} loggedIn={loggedIn} />
                </div>
            }
        </div>
    );
};