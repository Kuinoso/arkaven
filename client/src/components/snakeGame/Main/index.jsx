import React, { useState, useEffect, useRef } from 'react';
import { useInterval } from '../../../hooks/useInterval';
import Snake from '../Snake';
import Food from '../Food';
import Swal from 'sweetalert2';
import bite from '../../../sounds/bite.mp3';
import lose from '../../../sounds/loose.mp3';
import os from '../../../sounds/osSnake.mp3';
import { useStyles } from './styles.js';

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
    const myRef1 = useRef();
    const myRef2 = useRef();
    const myRef3 = useRef();
    const [started, setStarted] = useState(false);
    const [randomColor, setRandomColor] = useState('');
    const [snakeColor, setSnakeColor] = useState('');
    const [food, setFood] = useState(getRandomCoordinates());
    const [start, setStart] = useState(true);
    const [speed, setSpeed] = useState(150);
    const [direction, setDirection] = useState('RIGHT');
    const [snakeDots, setSnakeDots] = useState([
        [0, 0],
        [2, 0]
    ]);

    const getRandomColor = () => {
        let color = colors[Math.floor(Math.random() * colors.length)];
        if(color !== randomColor) {
            console.log(color, randomColor);
            setRandomColor(color);
            return;
        };
        getRandomColor();
    };

    const loadMedia = () => {
        myRef1.current.load();
        myRef2.current.load();
        myRef3.current.load();
    };

    useEffect(() => {
        document.onkeydown = onKeyDown;
        loadMedia();
        getRandomColor();
    }, []);

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
            myRef1.current.volume = 0.1;
            myRef1.current.play();
            setSnakeColor(randomColor);
            getRandomColor();
            setFood(getRandomCoordinates());
            enlargeSnake();
            if (speed > 60) {
                setSpeed(speed - 3);
            };
        };
    };

    const onGameOver = () => {
        myRef3.current.currentTime = 0;
        myRef3.current.pause();
        myRef2.current.volume = 0.1;
        myRef2.current.play();
        setSnakeColor('white');
        setStart(false)
        setSpeed(150);
        setDirection('RIGHT');
        setSnakeDots([
            [0, 0],
            [2, 0]
        ]);
        getRandomColor();
        Swal.fire(`Your score was ${snakeDots.length - 2}`)
            .then(() => {
                setStart(true);
                myRef3.current.volume = 0.05;
                myRef3.current.play();
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
        setStarted(true);
        myRef3.current.volume = 0.05;
        myRef3.current.play();
    };

    useEffect(() => {
        checkIfOutOfBorders();
        checkIfCollapsed();
        checkIfEat();
    }, [snakeDots]);

    return (
        <div>
            {started ?
                <div>
                    <h3 className={classes.score}>Score: {snakeDots.length - 2}</h3>
                    <div className={classes.container}>
                        <Snake snakeDots={snakeDots} color={snakeColor}/>
                        <Food dot={food} color={randomColor}/>
                    </div>
                </div>
                :
                <div>
                    <h1>Neon Snake Game</h1>
                    <h3>This snake is hungry! Are you ready for the challenge?</h3>
                    <button onClick={startGame}>
                        START
                </button>
                </div>
            }
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
    )
};