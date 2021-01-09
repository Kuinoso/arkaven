import React, { useState , useEffect, useRef } from 'react';
import Snake from '../Snake';
import Food from '../Food';
import Swal from 'sweetalert2';
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
    const [start, setStart] = useState(true);
    const [speed, setSpeed] = useState(150);
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
        if(start === true) {
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
    };


const useInterval = (callback, delay) => {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
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
      if(head[0] === foodItem[0] && head[1] === foodItem[1]) {
            setFood(getRandomCoordinates());
            enlargeSnake();
            if(speed > 50) {
                setSpeed(speed - 2);
            };
      };
  };

  const onGameOver = () => {
    setStart(false)
    setSpeed(150);
    setDirection('RIGHT');
    setSnakeDots([
        [0, 0],
        [2, 0]
      ]);
    Swal.fire(`Your score was ${snakeDots.length - 2}`)
      .then(() => {
          setStart(true);
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
          if(head[0] === dot[0] && head[1] === dot[1]) {
              onGameOver();
          };
      });
  };

  useEffect(() => {
    checkIfOutOfBorders();
    checkIfCollapsed();
    checkIfEat();
}, [snakeDots]);

    return (
        <div className={classes.container}>
            <Snake snakeDots={snakeDots} />
            <Food dot={food} />
        </div>
    )
};