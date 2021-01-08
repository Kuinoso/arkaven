import React, { useState , useEffect} from 'react';
import Snake from '../Snake';
import Food from '../Food';
import { useStyles } from './styles.js';

const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;

    return [x, y];
};

export default function Board() {
    const classes = useStyles();
    const [food, setFood] = useState(getRandomCoordinates());
    const [speed, setSpeed] = useState(200);
    const [direction, setDirection] = useState('RIGHT');
    const [snakeDots, setSnakeDots] = useState([
        [0, 0],
        [2, 0]
    ]);

    useEffect(() => {
        document.onkeydown = onKeyDown;
    }, []);

    const onKeyDown = (e) => {
        e = e || window.event;
        // eslint-disable-next-line default-case
        switch(e.keyCode) {
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
        let dots = [...snakeDots];
        let head = dots[dots.length - 1];

        // eslint-disable-next-line default-case
        switch(direction) {
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

    useEffect(() => {
        setInterval(moveSnake, 500);
    }, []);

    return (
        <div className={classes.container}>
            <Snake snakeDots={snakeDots} />
            <Food dot={food} />
        </div>
    )
};