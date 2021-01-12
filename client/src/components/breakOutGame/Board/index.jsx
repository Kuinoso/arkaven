import React, { useEffect, useRef } from 'react';
import data from '../data';
import { useStyles } from './styles.js';

export default function Board() {
    const classes = useStyles();
    const canvasRef = useRef(null);
    let { ballObj, paddleProps } = data;

    const ballMovement = (ctx, ballObj) => {
        class Ball {
            constructor(x, y, rad) {
                this.x = x;
                this.y = y;
                this.rad = rad;
            };
            draw(ctx) {
                ctx.beginPath();
                ctx.fillStyle = 'red';
                ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
                ctx.strokeStyle = 'black';
                ctx.strokeWidth = 4;
                ctx.fill();
                ctx.stroke();
            };
        };

        let data = new Ball(ballObj.x, ballObj.y, ballObj.rad);
        data.draw(ctx);
        ballObj.x += ballObj.dx;
        ballObj.y += ballObj.dy;
    };

    const wallCollision = (ballObj, canvas) => {
        if (ballObj.y - ballObj.rad <= 0 || ballObj.y + ballObj.rad >= canvas.height) {
            ballObj.dy *= -1;
        };

        if (ballObj.x + ballObj.rad >= canvas.width || ballObj.x - ballObj.rad <= 0) {
            ballObj.dx *= -1;
        };
    };

    const paddleMovement = (ctx, canvas, paddleProps) => {
        class Paddle {
            constructor(x) {
                this.x = x;
                this.y = canvas.height -30;
                this.height = 20;
                this.width = paddleProps.width;
                this.colors = ['red', 'orange'];
            };
            move() {
                ctx.beginPath();
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.fillStyle = this.broke ? 'white' : this.colors[1];
                ctx.strokeStyle = this.broke ? 'white' : this.colors[0];
                ctx.lineWidth = 1;
                ctx.fillStyle = this.broke ? 'white' : this.colors[1];
                ctx.shadowBlur = 0;
                ctx.shadowColor = 'blue';
                ctx.strokeRect(this.x, this.y, this.width, this.height);
                ctx.fill();
            };
        };

        let paddle = new Paddle(paddleProps.x);
        
        paddle.move();

        if (paddleProps.x <= 0) {
            paddleProps.x = 0;
        } else if (paddleProps.x + paddleProps.width >= canvas.width) {
            paddleProps.x = canvas.width - paddleProps.width;
        };
    };

    useEffect(() => {
        const render = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ballMovement(ctx, ballObj);

            wallCollision(ballObj, canvas);

            paddleMovement(ctx, canvas, paddleProps)

            requestAnimationFrame(render);
        };

        render();
    }, []);

    return (
        <canvas 
        className={classes.board} 
        height='500px' 
        width={window.innerWidth - 20} 
        ref={canvasRef} 
        onMouseMove={(e) => paddleProps.x = e.clientX - paddleProps.width / 2}
        />
    )
};