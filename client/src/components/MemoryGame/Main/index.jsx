import React, { useState, useEffect } from 'react';
import Board from '../Board';
import initializeDeck from '../deck';
import { useStyles } from './styles.js';

export default function Main() {
    const classes = useStyles();
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setCards(initializeDeck())
    }, []);

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
        if (flipped.length === 0) {
            setFlipped([id]);
            setDisabled(false);
        }else {
            if (sameCardClicked(id)) return;
            setFlipped([...flipped, id]);
            if (isMatched(id)) {
                setSolved([...solved, flipped[0], id]);
                resetCards();
            } else {
                setTimeout(resetCards, 2000)
            };
        };
    };

    return (
        <div>
            <h2>Can you remember all the cards?</h2>
            <Board
                cards={cards}
                flipped={flipped}
                handleClick={handleClick}
                disabled={disabled}
                solved={solved}
            />
        </div>
    )
};