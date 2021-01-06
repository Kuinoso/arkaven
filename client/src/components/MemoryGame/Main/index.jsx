import React, { useState, useEffect } from 'react';
import Board from '../Board';
import initializeDeck from '../deck';
import { useStyles } from './styles.js';

export default function Main() {
    const classes = useStyles();
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);

    useEffect(() => {
        setCards(initializeDeck())
    }, []);

    const handleClick = (id) => setFlipped([...flipped, id]);

    return (
        <div>
            <h2>Can you remember all the cards?</h2>
            <Board
                cards={cards}
                flipped={flipped}
                handleClick={handleClick}
            />
        </div>
    )
};