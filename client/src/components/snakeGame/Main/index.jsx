import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useInterval } from '../../../hooks/useInterval';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useStyles } from './styles.js';
import bite from '../../../sounds/bite.mp3';
import lose from '../../../sounds/loose.mp3';
import os from '../../../sounds/osSnake.mp3';
import tSnake from '../../../images/snakeT.png';
import gO from '../../../images/go.png';
import Snake from '../Snake';
import Food from '../Food';
import Display from '../../Display';
import Highscores from '../../Highscores';
import UserScores from '../../UserScores';
import MobileGames from '../../MobileGames';

const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;

    return [x, y];
};

const colors = ['#FF00FF', '#FF0099', '#33FF00', '#00FFFF', '#FF6600', '#0062FF', '#FFFF33'];

export default function Main() {
    const classes = useStyles();
    const theme = useTheme();
    const small = useMediaQuery(theme.breakpoints.down('md'));
    const myRef1 = useRef();
    const myRef2 = useRef();
    const myRef3 = useRef();

    const loggedIn = useSelector(
        (store) => store.UserReducer.loggedIn
    );
    const game = useSelector(
        (store) => store.GameReducer.allGames.filter(item => item.name === 'snake')[0]
    );
    const user = useSelector(
        (store) => store.UserReducer.loggedUser
    );
    const users = useSelector(
        (store) => store.UserReducer.allUsers
    );

    const [scores, setScores] = useState([]);
    const [userScores, setUserScores] = useState([]);
    const [started, setStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [randomColor, setRandomColor] = useState('');
    const [snakeColor, setSnakeColor] = useState('');
    const [food, setFood] = useState(getRandomCoordinates());
    const [start] = useState(true);
    const [speed, setSpeed] = useState(150);
    const [direction, setDirection] = useState('RIGHT');
    const [snakeDots, setSnakeDots] = useState([
        [0, 0],
        [2, 0]
    ]);

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

    const getRandomColor = () => {
        let color = colors[Math.floor(Math.random() * colors.length)];

        if (color !== randomColor) {
            setRandomColor(color);

            return;
        };

        getRandomColor();
    };

    useEffect(() => {
        document.onkeydown = onKeyDown;

        getRandomColor();
    }, []);

    useEffect(() => {
        getScores();

        if (user) {
            getUserScores();
        };
    }, [user]);

    const onKeyDown = (e) => {
        e = e || window.event;
        // eslint-disable-next-line default-case
        switch (e.keyCode) {
            case 38:
                setDirection('UP');
                break;
            case 40:
                setDirection('DOWN');
                break;
            case 37:
                setDirection('LEFT');
                break;
            case 39:
                setDirection('RIGHT');
                break;
        };
    };

    const moveSnake = () => {
        if (start === true && started === true) {
            let dots = [...snakeDots];
            let head = dots[dots.length - 1];

            // eslint-disable-next-line default-case
            switch (direction) {
                case 'RIGHT':
                    head = [head[0] + 2, head[1]];
                    break;
                case 'LEFT':
                    head = [head[0] - 2, head[1]];
                    break;
                case 'DOWN':
                    head = [head[0], head[1] + 2];
                    break;
                case 'UP':
                    head = [head[0], head[1] - 2];
                    break;
            };

            dots.push(head);

            dots.shift();

            setSnakeDots(dots);
        };
    };

    useInterval(moveSnake, speed);

    const enlargeSnake = () => {
        let newSnake = [...snakeDots];

        newSnake.unshift([]);

        setSnakeDots(newSnake);
    };

    const checkIfEat = () => {
        let head = snakeDots[snakeDots.length - 1];
        let foodItem = food;

        if (head[0] === foodItem[0] && head[1] === foodItem[1]) {
            myRef1.current.volume = 0.5;
            myRef1.current.play();

            setSnakeColor(randomColor);

            getRandomColor();

            setFood(getRandomCoordinates());

            enlargeSnake();

            if (speed > 30) {
                setSpeed(speed - 2);
            };
        };
    };

    const onGameOver = () => {
        setGameOver(true);

        setStarted(false);

        setSnakeColor('white');

        setSpeed(0);

        myRef3.current.currentTime = 0;
        myRef3.current.pause();
        myRef2.current.volume = 0.5;
        myRef2.current.play();

        if (loggedIn) {
            const data = {
                score: snakeDots.length - 2,
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

        Swal.fire({
            text: `Your score was ${snakeDots.length - 2}!`,
            imageUrl: gO,
            imageWidth: 400,
            imageAlt: 'GameOver',
        });
    };

    const checkIfOutOfBorders = () => {
        let head = snakeDots[snakeDots.length - 1];

        if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
            onGameOver();
        };
    };

    const checkIfCollapsed = () => {
        let snake = [...snakeDots];
        let head = snake[snake.length - 1];

        snake.pop();

        snake.forEach(dot => {
            if (head[0] === dot[0] && head[1] === dot[1]) {
                onGameOver();
            };
        });
    };

    const startGame = () => {
        myRef3.current.volume = 0.4;
        myRef3.current.play();

        setSpeed(150);

        setDirection('RIGHT');

        setSnakeDots([
            [0, 0],
            [2, 0]
        ]);

        getRandomColor();

        setGameOver(false);

        setStarted(true);
    };

    useEffect(() => {
        checkIfOutOfBorders();

        checkIfCollapsed();

        checkIfEat();
    }, [snakeDots]);

    return (
        <div>
            {small ?
                <MobileGames />
                :
                <div className={classes.wrapper}>
                    {scores && <Highscores scores={scores} />}
                    <div className={classes.container}>
                        <div className={classes.board}>
                            <Snake snakeDots={snakeDots} color={snakeColor} />
                            <Food dot={food} color={randomColor} />
                        </div>
                        <div className={classes.leftDiv}>
                            <div className={classes.infoDiv}>
                                <img src={tSnake} alt='snake' className={classes.title} />
                                <h3 className={classes.text}>
                                    Use the arrow keys to move the snake, when the snake eats food you earn points and the snake grows.
                                    Dont hit the walls or the body of the snake. The snake can not go backwards.
                    </h3>
                            </div>
                            <Display text={`Score: ${snakeDots.length - 2}`} />
                            {gameOver &&
                                <div>
                                    <Display gameOver={gameOver} text='Game Over' />
                                </div>
                            }
                            <button className={classes.button} onClick={startGame}>
                                {gameOver ? 'Play Again' : started ? 'Start Again' : 'Start Game'}
                            </button>
                        </div>
                        <audio
                            ref={myRef1}
                            src={bite}
                            loop={false}
                        />
                        <audio
                            ref={myRef2}
                            src={lose}
                            loop={false}
                        />
                        <audio
                            ref={myRef3}
                            src={os}
                            loop={true}
                        />
                    </div>
                    <UserScores scores={userScores} loggedIn={loggedIn} />
                </div>
            }
        </div>
    );
};