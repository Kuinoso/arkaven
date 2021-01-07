import React, { useState, useEffect } from 'react';
import Board from '../Board';
import initializeDeck from '../deck';
import { useStyles } from './styles.js';
import Button from '@material-ui/core/Button';

export default function Main() {
    const classes = useStyles();
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [finished, setFinished] = useState(false);
    const [clicks, setClicks] = useState(1);

    useEffect(() => {
        setCards(initializeDeck());
    }, []);

    useEffect(() => {
        preloadImages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cards.join(",")]);

    const preloadImages = () => {
        // eslint-disable-next-line array-callback-return
        cards.map(card => {
            const src = require(`../../../images/${card.type}.png`).default;
            new Image().src = src;
        });
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
                if (solved.length === 10) {
                    console.log(`your solved the game in ${Math.floor(clicks / 2)} attempts`, clicks);
                    setFinished(true);
                };
                setSolved([...solved, flipped[0], id]);
                resetCards();
            } else {
                setTimeout(resetCards, 1200)
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
        <div>
            <h2>Memory Game: Game Of Thrones Edition!</h2>
            <Board
                cards={cards}
                flipped={flipped}
                handleClick={handleClick}
                disabled={disabled}
                solved={solved}
            />
            {finished &&
                <Button variant="contained" color="primary" onClick={playAgain}>
                    Play Again
                </Button>
            }
        </div>
    )
};