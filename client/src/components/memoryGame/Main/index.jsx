import React, { useState, useEffect, useRef } from 'react';

import Board from '../Board';
import Display from '../../Display';

import initializeDeck from '../deck';

import Swal from 'sweetalert2';

import { useStyles } from './styles.js';

import throne from '../../../images/throne.jpeg';
import matchSound from '../../../sounds/match.mp3';
import gotTheme from '../../../sounds/got.mp3';

export default function Main() {
    const classes = useStyles();

    const myRef1 = useRef();
    const myRef2 = useRef();

    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [gameOver, setFinished] = useState(false);
    const [clicks, setClicks] = useState(1);

    useEffect(() => {
        setCards(initializeDeck());

        preloadMedia();
    }, []);

    useEffect(() => {
        preloadDeckImages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cards.join(",")]);

    const preloadDeckImages = () => {
        // eslint-disable-next-line array-callback-return
        cards.map(card => {
            const src = require(`../../../images/${card.type}.png`).default;

            new Image().src = src;
        });
    };

    const preloadMedia = () => {
        const src = require('../../../images/throne.jpeg').default;

        new Image().src = src;
    };

    const sameCardClicked = (id) => flipped.includes(id);

    const isMatched = (id) => {
        const clickedCard = cards.find(card => card.id === id);
        const flippedCard = cards.find(card => flipped[0] === card.id);

        return clickedCard.type === flippedCard.type
    };

    const resetCards = () => {
        setFlipped([]);

        setDisabled(false);
    };

    const handleClick = (id) => {
        setDisabled(true);

        setClicks(clicks + 1);

        if (flipped.length === 0) {
            setFlipped([id]);

            setDisabled(false);
        } else {
            if (sameCardClicked(id)) return;

            setFlipped([...flipped, id]);

            if (isMatched(id)) {
                setSolved([...solved, flipped[0], id]);

                resetCards();

                if (solved.length === 10) {
                    myRef2.current.volume = 0.3;
                    myRef2.current.play();

                    Swal.fire({
                        title: `You won with ${Math.floor(clicks / 2)} attempts`,
                        text: 'Now YOU are the rightful heir to the iron throne!',
                        imageUrl: throne,
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'Throne image',
                    }).then(() => {
                        setFinished(true);

                        myRef2.current.pause();
                        myRef2.current.currentTime = 0;
                    });
                } else {
                    myRef1.current.volume = 0.3;
                    myRef1.current.pause();
                    myRef1.current.currentTime = 0;
                    myRef1.current.play();
                };

            } else {
                setTimeout(resetCards, 1200);
            };
        };
    };

    const playAgain = () => {
        setSolved([]);

        setCards(initializeDeck());

        setFinished(false);

        setClicks(1);
    };

    return (
        <div className={classes.container}>
            <Board
                cards={cards}
                flipped={flipped}
                handleClick={handleClick}
                disabled={disabled}
                solved={solved}
            />
            <div className={classes.leftDiv}>
                <div>
                    <h1>GOT Memory Game</h1>
                    <h3>Find all the house sigil pairs and become the ruler of Westeros!</h3>
                </div>
                <Display text={`Score: ${Math.floor(clicks / 2)}`} />
                {gameOver &&
                    <div>
                        <Display gameOver={gameOver} text='Game Over' />
                    </div>
                }
                <button className={classes.button} onClick={playAgain}>
                    {gameOver ? 'Play Again' : 'Start Again'}
                </button>
            </div>
            <audio
                ref={myRef1}
                src={matchSound}
                loop={false}
            />
            <audio
                ref={myRef2}
                src={gotTheme}
                loop={false}
            />
        </div>
    );
};